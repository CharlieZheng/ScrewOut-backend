# --- Stage 1: Base & Dependency Installation ---
FROM docker.m.daocloud.io/library/node:20-alpine AS deps

WORKDIR /app

# 首先只拷贝 package.json 和 lock 文件
# 这是利用缓存的关键：只要这两个文件没变，这一层就会被缓存
COPY package*.json ./

# 安装依赖。使用 npm ci 确保版本一致，且比 install 更快
RUN npm ci

# --- Stage 2: Source Code & Build ---
FROM docker.m.daocloud.io/library/node:20-alpine AS builder
WORKDIR /app

# 从上一步拷贝 node_modules
COPY --from=deps /app/node_modules ./node_modules
# 拷贝其余所有源码（此时才会拷贝频繁变动的 src 目录）
# 在子目录方案下，这里的 . 指的是 nestjs-app/ 目录下的所有内容
COPY . .

# 执行打包命令
RUN npm run build

# --- Stage 3: Clean Production Dependencies ---
FROM docker.m.daocloud.io/library/node:20-alpine AS prod-deps
WORKDIR /app

COPY package*.json ./
# 只安装生产环境依赖
RUN npm ci --omit=dev

# --- Stage 4: Final Runtime ---
FROM docker.m.daocloud.io/library/node:20-alpine
WORKDIR /app

# 生产环境标识
ENV NODE_ENV=production

# 仅从前面的阶段拷贝必要产物
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/package.json ./package.json
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# 启动
CMD ["node", "dist/main"]