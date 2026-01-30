-- Create database if not exists
CREATE DATABASE IF NOT EXISTS hello_world_db;
USE hello_world_db;

-- Create a sample table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a dummy record
INSERT INTO users (username, email) VALUES ('admin', 'admin@example.com');