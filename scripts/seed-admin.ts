#!/usr/bin/env node

/**
 * Script to create the initial admin user
 * Usage: npx ts-node scripts/seed-admin.ts
 * Or with password: npx ts-node scripts/seed-admin.ts admin@avconexpo.com admin123 "Super Admin"
 */

import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'avconexpo_next_db',
};

async function seedAdmin() {
  const email = process.argv[2] || 'admin@avconexpo.com';
  const plainPassword = process.argv[3] || 'admin123';
  const name = process.argv[4] || 'Super Admin';
  const role = 'super_admin';

  console.log(`Creating admin user: ${email}`);

  try {
    // Create connection
    const connection = await mysql.createConnection(dbConfig);

    // Create database if not exists
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await connection.query(`USE ${dbConfig.database}`);

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role ENUM('admin', 'super_admin') DEFAULT 'admin',
        active BOOLEAN DEFAULT TRUE,
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Insert or update admin user
    const [result] = await connection.execute(
      `INSERT INTO users (email, password, name, role) 
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
       password = VALUES(password),
       name = VALUES(name),
       role = VALUES(role),
       updated_at = CURRENT_TIMESTAMP`,
      [email, hashedPassword, name, role]
    );

    console.log('✓ Admin user created/updated successfully!');
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${plainPassword}`);
    console.log(`  Name: ${name}`);
    console.log(`  Role: ${role}`);

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
