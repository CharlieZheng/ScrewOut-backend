# Use the official MySQL 8.0 image
# 声明接收来自 Compose 的参数
ARG DB_ROOT_PASSWORD
ARG DB_NAME
FROM mysql:8.0

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${DB_NAME}

# Copy the init.sql script to the docker-entrypoint-initdb.d directory
# Scripts in this directory are automatically executed during container startup
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306