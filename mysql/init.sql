-- Create database if not exists
CREATE DATABASE IF NOT EXISTS screw_out;
USE screw_out;

-- Create a sample table
-- CREATE TABLE IF NOT EXISTS users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Insert a dummy record
-- INSERT INTO users (username, email) VALUES ('admin', 'admin@example.com');
CREATE TABLE IF NOT EXISTS  user (
                      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                      nickname VARCHAR(50),
                      avatar VARCHAR(255),
                      gender TINYINT DEFAULT 0 COMMENT '0未知 1男 2女'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wx_account (
                            id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                            user_id BIGINT UNSIGNED NOT NULL,
                            openid VARCHAR(64) NOT NULL,
                            session_key VARCHAR(128) NOT NULL
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS  level_record (
                              id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                              user_id BIGINT UNSIGNED NOT NULL,
                              level_index INT NOT NULL,
                              game_start_time DATETIME NOT NULL,
                              game_end_time DATETIME NOT NULL,
                              duration_seconds INT GENERATED ALWAYS AS
                                  (TIMESTAMPDIFF(SECOND, game_start_time, game_end_time)) STORED,


                              CONSTRAINT fk_level_user FOREIGN KEY (user_id)
                                  REFERENCES user (id)
                                  ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS user_game_progress (
                                user_id BIGINT UNSIGNED PRIMARY KEY,
                                current_level_index INT NOT NULL DEFAULT 1,
                                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                                    ON UPDATE CURRENT_TIMESTAMP,

                                CONSTRAINT fk_progress_user FOREIGN KEY (user_id)
                                    REFERENCES user (id)
                                    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS login (
                                    user_id BIGINT UNSIGNED PRIMARY KEY,
                                    token VARCHAR(128) NOT NULL,

                                    CONSTRAINT fk_progress_user FOREIGN KEY (user_id)
                                        REFERENCES user (id)
                                        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
