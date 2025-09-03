# Redis 设置指南

## 概述
本项目已从 JavaScript Map 重构为 Redis，提供更好的持久化、分布式支持和性能。

## 安装 Redis

### macOS (使用 Homebrew)
```bash
brew install redis
brew services start redis
```

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

### Windows
1. 下载 Redis for Windows: https://github.com/microsoftarchive/redis/releases
2. 安装并启动 Redis 服务

### Docker
```bash
docker run -d --name redis -p 6379:6379 redis:alpine
```

## 环境变量配置

在 `.env` 文件中添加以下配置：

```env
# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

## 验证 Redis 连接

```bash
# 连接到 Redis CLI
redis-cli

# 测试连接
ping
# 应该返回 PONG

# 查看所有键
keys *

# 退出
exit
```

## 项目中的 Redis 使用

### 1. 在线用户管理
- 键格式: `online:{userId}`
- 过期时间: 1小时
- 用途: 跟踪用户在线状态

### 2. 群组用户数量
- 键格式: `group:{groupId}:count`
- 用途: 跟踪群组中的用户数量

### 3. 视频房间用户数量
- 键格式: `video:{roomId}:count`
- 用途: 跟踪视频通话中的用户数量

## 性能优化

### 1. 连接池配置
Redis 客户端已配置连接池和重试机制：
- 最大重试次数: 3
- 故障转移延迟: 100ms
- 懒连接: 启用

### 2. 键过期策略
- 在线用户状态: 1小时自动过期
- 群组和视频房间计数: 永久存储（手动清理）

## 监控和调试

### 1. Redis 命令
```bash
# 查看内存使用
info memory

# 查看连接数
info clients

# 查看键数量
dbsize

# 查看慢查询
slowlog get 10
```

### 2. 应用日志
应用会记录以下 Redis 事件：
- 连接成功/失败
- 连接关闭
- 清理操作

## 故障排除

### 1. 连接失败
- 检查 Redis 服务是否运行
- 验证主机和端口配置
- 检查防火墙设置

### 2. 性能问题
- 监控内存使用
- 检查键的数量和大小
- 优化键的过期策略

### 3. 数据丢失
- 检查 Redis 持久化配置
- 验证备份策略
- 监控磁盘空间

## 扩展性

### 1. 集群模式
Redis 支持集群模式，可以水平扩展：
```bash
# 启动集群节点
redis-server --cluster-enabled yes --cluster-config-file nodes.conf --cluster-node-timeout 5000
```

### 2. 哨兵模式
Redis 哨兵提供高可用性：
```bash
# 启动哨兵
redis-sentinel sentinel.conf
```

## 安全建议

1. 设置强密码
2. 限制网络访问
3. 启用 TLS 加密
4. 定期更新 Redis 版本
5. 监控异常访问

## 迁移指南

从 Map 到 Redis 的迁移已完成，主要变化：

1. **io.ts**: 使用 Redis 替代 Map
2. **api.ts**: 所有 API 端点使用 Redis
3. **server.ts**: Peer 服务器使用 Redis
4. **新增**: Redis 配置和工具函数

## 测试

启动应用后，Redis 应该自动连接并显示：
```
✅ Redis connected successfully
```

如果看到错误信息，请检查 Redis 配置和连接。
