#!/bin/bash

echo "🚀 启动开发环境..."

# 启动 Redis
echo "📦 启动 Redis..."
brew services start redis
sleep 2

# 启动后端
echo "⚙️  启动后端..."
cd server
npm run dev &
BACKEND_PID=$!
cd ..

# 启动前端
echo "🌐 启动前端..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ 所有服务启动完成！"
echo "├── Redis:  http://localhost:6379"
echo "├── 后端:   http://localhost:3001"
echo "└── 前端:   http://localhost:3000"
echo ""
echo "按 Ctrl+C 停止所有服务"

# 等待用户中断
trap "echo '🛑 停止所有服务...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; brew services stop redis; echo '✅ 所有服务已停止'; exit" INT
wait
