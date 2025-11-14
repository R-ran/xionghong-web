# Vercel 部署配置指南

## 环境变量配置

在 Vercel 部署之前，**必须**在 Vercel 项目设置中配置以下环境变量：

### 必需的环境变量

1. **`NEXT_PUBLIC_WORDPRESS_API_URL`**
   - 描述：WordPress REST API 的基础 URL
   - 示例：`https://your-wordpress-site.com`
   - **重要**：必须以 `NEXT_PUBLIC_` 开头，这样客户端才能访问

### 配置步骤

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 进入 **Settings** → **Environment Variables**
4. 添加环境变量：
   - **Name**: `NEXT_PUBLIC_WORDPRESS_API_URL`
   - **Value**: 你的 WordPress 网站 URL（例如：`https://your-site.com`）
   - **Environment**: 选择所有环境（Production, Preview, Development）
5. 点击 **Save**
6. **重新部署**项目（重要！环境变量更改后需要重新部署）

### 验证配置

部署后，检查浏览器控制台：
- 如果看到 WordPress API 相关的错误，说明环境变量未正确配置
- 如果看到数据成功加载的日志，说明配置正确

### 常见问题

#### 1. 页面显示空白或加载状态
- **原因**：环境变量未配置或 WordPress API 无法访问
- **解决**：检查 Vercel 环境变量设置，确保 `NEXT_PUBLIC_WORDPRESS_API_URL` 已正确配置

#### 2. 数据不显示
- **原因**：WordPress API 返回错误或 CORS 问题
- **解决**：检查 WordPress 网站是否允许跨域请求，确保 API 端点可访问

#### 3. 本地正常但部署后异常
- **原因**：本地有 `.env.local` 文件，但 Vercel 没有配置环境变量
- **解决**：在 Vercel 中添加相同的环境变量

### 本地开发配置

在项目根目录创建 `.env.local` 文件：

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com
```

**注意**：`.env.local` 文件不会被提交到 Git（已在 `.gitignore` 中）

### 重新部署

修改环境变量后，必须重新部署项目才能生效：
1. 在 Vercel Dashboard 中点击 **Deployments**
2. 找到最新的部署
3. 点击 **...** → **Redeploy**

或者推送新的代码来触发自动部署。

