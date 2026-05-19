-- Create database if not exists
CREATE DATABASE IF NOT EXISTS avconexpo_next_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE avconexpo_next_db;

-- Users table for admin authentication
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(active);

-- Website contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(60) NOT NULL,
  service VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('Unread', 'Replied') DEFAULT 'Unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_contact_submissions_status (status),
  INDEX idx_contact_submissions_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Homepage carousel banners
CREATE TABLE IF NOT EXISTS banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(500) NOT NULL,
  alt_text VARCHAR(500) NOT NULL,
  headline_lines TEXT NOT NULL,
  status ENUM('Active', 'Inactive') DEFAULT 'Active',
  sort_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_banners_status (status),
  INDEX idx_banners_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Public projects page
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  tag VARCHAR(120) NOT NULL,
  client VARCHAR(255) NOT NULL DEFAULT '',
  sector VARCHAR(120) NOT NULL DEFAULT '',
  status ENUM('Active', 'Inactive') DEFAULT 'Active',
  lifecycle_status ENUM('Active', 'Completed') DEFAULT 'Active',
  completion_pct INT NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_projects_status (status),
  INDEX idx_projects_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blog posts
CREATE TABLE IF NOT EXISTS blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  image VARCHAR(500) NOT NULL,
  author VARCHAR(255) NOT NULL DEFAULT '',
  category VARCHAR(120) NOT NULL DEFAULT '',
  slug VARCHAR(255) NOT NULL,
  excerpt TEXT NULL,
  content LONGTEXT NULL,
  tags VARCHAR(500) NOT NULL DEFAULT '',
  link_url VARCHAR(500) NOT NULL DEFAULT '#',
  status ENUM('Published', 'Draft') DEFAULT 'Draft',
  publish_date DATE NOT NULL,
  sort_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_blogs_slug (slug),
  INDEX idx_blogs_status (status),
  INDEX idx_blogs_sort_order (sort_order),
  INDEX idx_blogs_publish_date (publish_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Client testimonials (homepage feedback carousel)
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quote TEXT NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  image VARCHAR(500) NOT NULL,
  company VARCHAR(255) NOT NULL DEFAULT '',
  designation VARCHAR(255) NOT NULL DEFAULT '',
  rating TINYINT NOT NULL DEFAULT 5,
  status ENUM('Active', 'Inactive') DEFAULT 'Active',
  sort_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_testimonials_status (status),
  INDEX idx_testimonials_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Career job openings (public career page)
CREATE TABLE IF NOT EXISTS career_jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(120) NOT NULL DEFAULT '',
  location VARCHAR(255) NOT NULL DEFAULT '',
  job_type VARCHAR(80) NOT NULL DEFAULT 'Full-time',
  experience VARCHAR(120) NOT NULL DEFAULT '',
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  publish_date DATE NOT NULL,
  status ENUM('Active', 'Inactive', 'Closed') DEFAULT 'Active',
  sort_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_career_jobs_status (status),
  INDEX idx_career_jobs_sort_order (sort_order),
  INDEX idx_career_jobs_publish_date (publish_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Career application submissions
CREATE TABLE IF NOT EXISTS career_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(60) NOT NULL,
  position VARCHAR(255) NOT NULL,
  resume_url VARCHAR(500) NULL,
  resume_name VARCHAR(255) NULL,
  resume_mime_type VARCHAR(120) NULL,
  resume_data LONGBLOB NULL,
  status ENUM('New', 'Reviewed', 'Shortlisted', 'Rejected') DEFAULT 'New',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_career_applications_status (status),
  INDEX idx_career_applications_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Prevents duplicate default seed data when multiple requests run at once
CREATE TABLE IF NOT EXISTS app_seed_locks (
  seed_key VARCHAR(64) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin activity log (optional, for tracking)
CREATE TABLE IF NOT EXISTS admin_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  action VARCHAR(255) NOT NULL,
  details TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin@9015 - change in production!)
-- The password hash is for 'admin@9015' - generated with bcrypt (10 rounds)
INSERT INTO users (email, password, name, role) VALUES (
  'admin@avconexpo.com',
  '$2b$10$bIwC0L4mnrZtHPUblEIDxOvbsReWoU.pVp1MENBv1VgLT3lSM4Ki.',
  'Super Admin',
  'super_admin'
) ON DUPLICATE KEY UPDATE
  password = VALUES(password),
  name = VALUES(name),
  role = VALUES(role),
  updated_at = CURRENT_TIMESTAMP;
