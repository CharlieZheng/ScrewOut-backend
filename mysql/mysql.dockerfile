# Use the official MySQL 8.0 image
FROM mysql:8.0

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=password123
ENV MYSQL_DATABASE=hello_world_db

# Copy the init.sql script to the docker-entrypoint-initdb.d directory
# Scripts in this directory are automatically executed during container startup
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306