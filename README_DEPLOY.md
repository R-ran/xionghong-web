# 部署指南 - 解决 GitHub 连接问题

## 问题
Git push 时出现连接超时错误：
```
fatal: unable to access 'https://github.com/R-ran/xionghong-web.git/': Failed to connect
```

## 解决方案

### 方案1: 使用部署脚本（推荐）
运行提供的 PowerShell 脚本：
```powershell
.\deploy.ps1
```

### 方案2: 配置 SSH（最稳定）
1. 生成 SSH key（如果还没有）：
   ```powershell
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. 将公钥添加到 GitHub：
   - 复制 `~/.ssh/id_ed25519.pub` 的内容
   - 在 GitHub 上：Settings → SSH and GPG keys → New SSH key

3. 切换到 SSH 方式：
   ```powershell
   git remote set-url origin git@github.com:R-ran/xionghong-web.git
   git push origin main
   ```

### 方案3: 使用代理
如果有代理服务器，配置 Git 使用代理：
```powershell
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

取消代理：
```powershell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 方案4: 使用 GitHub Desktop
1. 下载安装 [GitHub Desktop](https://desktop.github.com/)
2. 登录 GitHub 账号
3. 打开本地仓库
4. 点击 "Push origin" 按钮

### 方案5: 手动上传（临时方案）
如果所有方法都失败，可以：
1. 在 GitHub 网页上创建新文件
2. 或者使用 GitHub 网页编辑器
3. 或者等待网络恢复后再推送

## 当前状态
✅ 代码已保存在本地
✅ 所有更改已提交
⏳ 等待推送到远程仓库

## 快速命令
```powershell
# 检查远程仓库
git remote -v

# 查看提交历史
git log --oneline -5

# 查看未推送的提交
git log origin/main..HEAD

# 强制推送（谨慎使用）
git push origin main --force
```

