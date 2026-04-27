import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { query, User } from './db';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'avconexpo-secret-key-change-in-production'
);

const COOKIE_NAME = 'avconexpo_session';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createToken(user: { id: number; email: string; role: string }): Promise<string> {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);

  return token;
}

export async function verifyToken(token: string): Promise<{ id: number; email: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      id: payload.id as number,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch (error) {
    return null;
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function getCurrentUser(): Promise<{ id: number; email: string; role: string; name: string } | null> {
  const token = await getAuthToken();
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  // Fetch fresh user data from database
  const users = await query<User[]>(
    'SELECT id, email, name, role FROM users WHERE id = ? AND active = 1',
    [payload.id]
  );

  if (users.length === 0) return null;
  
  const user = users[0] as unknown as User;
  
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
}

export async function authenticateUser(email: string, password: string): Promise<{ id: number; email: string; role: string; name: string } | null> {
  const users = await query<User[]>(
    'SELECT * FROM users WHERE email = ? AND active = 1',
    [email]
  );

  if (users.length === 0) return null;

  const user = users[0] as unknown as User;
  const isValid = await verifyPassword(password, user.password);

  if (!isValid) return null;

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
}
