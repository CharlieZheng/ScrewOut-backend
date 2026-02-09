# --build: 强制 Docker 重新检查所有文件的变化（受缓存机制保护）
# 当你的源码改变了，需要加上 --build 参数否则不会重新打镜像且报警告 "No services to build"
docker compose up -d --build