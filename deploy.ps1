# GitHub 部署脚本 - 解决连接问题
# 使用方法: .\deploy.ps1

Write-Host "=== GitHub 部署脚本 ===" -ForegroundColor Cyan
Write-Host ""

# 检查是否有未提交的更改
$status = git status --porcelain
if ($status) {
    Write-Host "检测到未提交的更改，正在添加..." -ForegroundColor Yellow
    git add .
    
    $commitMessage = Read-Host "请输入提交信息 (直接回车使用默认: '更新代码')"
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "更新代码"
    }
    
    git commit -m $commitMessage
    Write-Host "✅ 代码已提交" -ForegroundColor Green
} else {
    Write-Host "✅ 没有未提交的更改" -ForegroundColor Green
}

Write-Host ""
Write-Host "尝试推送到 GitHub..." -ForegroundColor Yellow

# 方法1: 增加超时时间并重试
Write-Host "方法1: 使用增加的超时时间..." -ForegroundColor Cyan
$env:GIT_HTTP_LOW_SPEED_LIMIT = "1000"
$env:GIT_HTTP_LOW_SPEED_TIME = "300"
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 1000
git config --global http.lowSpeedTime 300

$result = git push origin main 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 推送成功！" -ForegroundColor Green
    exit 0
} else {
    Write-Host "❌ 方法1失败" -ForegroundColor Red
    Write-Host $result
}

Write-Host ""
Write-Host "方法2: 尝试使用 SSH 方式..." -ForegroundColor Cyan
Write-Host "提示: 如果 SSH 未配置，请先配置 SSH key" -ForegroundColor Yellow
Write-Host "配置 SSH: https://docs.github.com/en/authentication/connecting-to-github-with-ssh" -ForegroundColor Yellow

# 检查是否想切换到 SSH
$useSSH = Read-Host "是否切换到 SSH 方式? (y/n)"
if ($useSSH -eq "y" -or $useSSH -eq "Y") {
    git remote set-url origin git@github.com:R-ran/xionghong-web.git
    $result = git push origin main 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ SSH 推送成功！" -ForegroundColor Green
        exit 0
    } else {
        Write-Host "❌ SSH 推送失败，请配置 SSH key" -ForegroundColor Red
        Write-Host $result
    }
}

Write-Host ""
Write-Host "方法3: 配置代理 (如果有代理服务器)..." -ForegroundColor Cyan
$useProxy = Read-Host "是否配置代理? (y/n)"
if ($useProxy -eq "y" -or $useProxy -eq "Y") {
    $proxyUrl = Read-Host "请输入代理地址 (例如: http://127.0.0.1:7890)"
    if ($proxyUrl) {
        git config --global http.proxy $proxyUrl
        git config --global https.proxy $proxyUrl
        Write-Host "✅ 代理已配置" -ForegroundColor Green
        
        $result = git push origin main 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ 使用代理推送成功！" -ForegroundColor Green
            exit 0
        } else {
            Write-Host "❌ 使用代理推送失败" -ForegroundColor Red
            Write-Host $result
        }
    }
}

Write-Host ""
Write-Host "=== 所有自动方法都失败了 ===" -ForegroundColor Red
Write-Host ""
Write-Host "请尝试以下手动方法:" -ForegroundColor Yellow
Write-Host "1. 检查网络连接" -ForegroundColor White
Write-Host "2. 使用 VPN 或代理服务" -ForegroundColor White
Write-Host "3. 配置 SSH key 并使用 SSH 方式" -ForegroundColor White
Write-Host "4. 使用 GitHub Desktop 客户端" -ForegroundColor White
Write-Host "5. 在 GitHub 网页上手动上传文件" -ForegroundColor White
Write-Host ""
Write-Host "当前代码已保存在本地，可以稍后网络恢复时再推送" -ForegroundColor Green

