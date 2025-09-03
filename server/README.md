# Web Chat Backend Server

这是一个经过优化的Web聊天应用后端服务器，采用现代化的架构设计和最佳实践。

## 🏗️ 架构特点

### 分层架构

- **路由层 (Routes)**: 处理HTTP请求和响应
- **服务层 (Services)**: 封装业务逻辑
- **数据访问层 (Database)**: 使用Prisma ORM进行数据库操作
- **工具层 (Utils)**: 提供通用功能如错误处理、日志记录

### 核心优化

- ✅ 统一的错误处理机制
- ✅ 结构化日志系统
- ✅ 类型安全的TypeScript接口
- ✅ 服务层抽象，提高代码复用性
- ✅ 配置管理集中化
- ✅ 速率限制保护
- ✅ 优雅关闭处理

## 📁 目录结构

```
server/
├── src/
│   ├── config/          # 配置管理
│   ├── middleware/      # 中间件
│   ├── routes/          # 路由定义
│   ├── services/        # 业务服务层
│   ├── types/           # TypeScript类型定义
│   ├── utils/           # 工具函数
│   ├── io.ts            # Socket.IO配置
│   └── server.ts        # 主服务器文件
├── prisma/              # 数据库schema和迁移
├── util/                # 工具函数
├── db.ts                # 数据库连接
├── oss-client.ts        # OSS客户端
└── package.json
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 环境变量配置

创建 `.env` 文件：

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="your_database_url"

# Clerk Authentication
CLERK_SECRET_KEY="your_clerk_secret_key"
CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"

# OSS Storage
OSS_ACCESS_KEY_ID="your_oss_access_key_id"
OSS_ACCESS_KEY_SECRET="your_oss_access_key_secret"
OSS_BUCKET="your_oss_bucket"
OSS_REGION="your_oss_region"

# AI Service
DEEPSEEK_API_KEY="your_deepseek_api_key"

# Logging
LOG_LEVEL=info
```

### 数据库迁移

```bash
npm run migrate
```

### 启动开发服务器

```bash
npm run dev
```

### 生产构建

```bash
npm run build
npm start
```

## 🔧 主要功能

### 消息系统

- 群组消息
- 私聊消息
- 消息分页
- 实时推送

### 用户管理

- 用户认证 (Clerk)
- 用户资料
- 好友系统
- 在线状态

### 群组功能

- 群组创建和管理
- 成员权限管理
- 视频通话支持

### 文件存储

- OSS文件上传
- 签名生成

### AI聊天

- DeepSeek集成
- 流式响应

## 📡 API接口

所有API接口保持不变，确保前端兼容性：

- `GET /api/groupMessages` - 获取群组消息
- `POST /api/groupMessages` - 发送群组消息
- `POST /api/privateMessage` - 发送私聊消息
- `GET /api/privateMessages` - 获取私聊消息
- `GET /api/friends` - 获取好友列表
- `GET /api/groups` - 获取群组列表
- `POST /api/group` - 创建群组
- `GET /api/oss-signature` - 获取OSS上传签名
- `POST /api/chat` - AI聊天接口

## 🛡️ 安全特性

- 身份验证中间件
- 速率限制保护
- 输入验证
- 错误信息脱敏

## 📊 监控和日志

- 结构化日志记录
- 错误追踪
- Socket.IO管理界面
- 性能监控

## 🔄 迁移指南

从旧版本迁移到新版本：

1. 备份现有代码
2. 安装新依赖：`npm install`
3. 更新环境变量
4. 运行数据库迁移：`npm run migrate`
5. 启动新服务器：`npm run dev`

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 📄 许可证

ISC License
