#!/bin/bash

echo "🛑 停止所有服务..."

# 停止 Redis
echo "📦 停止 Redis..."
brew services stop redis

# 停止 Node.js 进程
echo "⚙️  停止后端和前端..."
pkill -f "npm run dev"
pkill -f "ts-node"

echo "✅ 所有服务已停止"
