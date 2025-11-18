# 快速部署脚本 - 自动尝试多种方法
# 使用方法: .\quick-deploy.ps1

param(
    [switch]$UseSSH,
    [string]$ProxyUrl = ""
)

Write-Host "`n=== 快速部署到 GitHub ===" -ForegroundColor Cyan

# 检查是否有未提交的更改
$status = git status --porcelain
if ($status -and ($status | Where-Object { $_ -notmatch '^\?\?' })) {
    Write-Host "`n检测到未提交的更改，正在添加..." -ForegroundColor Yellow
    git add .
    git commit -m "自动提交: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
}

# 配置 Git 超时设置
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 1000
git config --global http.lowSpeedTime 300

# 方法1: 如果指定了代理
if ($ProxyUrl) {
    Write-Host "`n使用代理: $ProxyUrl" -ForegroundColor Cyan
    git config --global http.proxy $ProxyUrl
    git config --global https.proxy $ProxyUrl
    git push origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ 使用代理推送成功！" -ForegroundColor Green
        exit 0
    }
}

# 方法2: 如果指定使用 SSH
if ($UseSSH) {
    Write-Host "`n切换到 SSH 方式..." -ForegroundColor Cyan
    git remote set-url origin git@github.com:R-ran/xionghong-web.git
    git push origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ SSH 推送成功！" -ForegroundColor Green
        exit 0
    }
}

# 方法3: 尝试 HTTPS（默认）
Write-Host "`n尝试 HTTPS 推送..." -ForegroundColor Cyan
$env:GIT_HTTP_LOW_SPEED_LIMIT = "1000"
$env:GIT_HTTP_LOW_SPEED_TIME = "300"
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ HTTPS 推送成功！" -ForegroundColor Green
} else {
    Write-Host "`n❌ 推送失败" -ForegroundColor Red
    Write-Host "`n请尝试以下方法:" -ForegroundColor Yellow
    Write-Host "1. 使用 SSH: .\quick-deploy.ps1 -UseSSH" -ForegroundColor White
    Write-Host "2. 使用代理: .\quick-deploy.ps1 -ProxyUrl 'http://127.0.0.1:7890'" -ForegroundColor White
    Write-Host "3. 查看详细说明: 阅读 README_DEPLOY.md" -ForegroundColor White
    exit 1
}

