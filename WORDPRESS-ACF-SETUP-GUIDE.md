# WordPress ACF 字段配置指南

## 问题分析

根据调试结果，您的WordPress网站已安装ACF插件和"ACF to REST API"插件，但是ACF字段数据没有在REST API中显示。当前API返回的ACF数据为空数组：`"acf": []`

## 解决方案

### 方案1：修复自定义文章类型设置（必需）

**重要发现**: `successful_project` 文章类型注册时未设置 `show_in_rest => true`，导致 ACF 无法识别。

1. **修改文章类型注册代码**
   在主题 `functions.php` 或插件中找到注册代码，添加：
   ```php
   register_post_type('successful_project', array(
       'label' => 'Successful Projects',
       'public' => true,
       'show_in_rest' => true,        // ← 关键设置
       'rest_base' => 'successful_project',
       // ... 其他参数
   ));
   ```

2. **重新保存固定链接**
   - 进入 "设置" → "固定链接"
   - 点击 "保存更改"

3. **验证修复**
   - 检查 ACF 字段组设置中是否能看到 "Successful Projects"

### 方案2：配置ACF字段在REST API中显示

1. **登录WordPress后台**
2. **进入ACF字段组设置**
   - 进入"字段组" (Field Groups)
   - 编辑项目相关的字段组（包含 `project_location` 和 `project_date` 字段的字段组）

3. **配置字段组位置**
   - 在字段组设置页面，找到"位置" (Location) 部分
   - 确保规则设置为：
     ```
     如果  Post Type  等于  Successful Projects
     ```
   - 如果看不到 "Successful Projects" 选项，说明方案1未完成

4. **启用REST API显示**
   - 在字段组设置页面，找到"设置" (Settings) 部分
   - 勾选 **"在REST API中显示"** (Show in REST API) 选项

5. **保存设置**

### 方案2：检查字段名称

确保您的字段名称与代码中使用的名称完全一致：
- `project_location` (项目地点)
- `project_date` (项目日期)

### 方案3：重新保存项目

在完成上述配置后：
1. 进入"成功项目"列表
2. 编辑每个项目
3. 不做任何修改，直接点击"更新"
4. 这会触发重新保存ACF字段数据

### 方案4：检查插件设置

1. **ACF to REST API插件设置**
   - 进入"设置" → "ACF to REST API"
   - 确保插件已正确激活
   - 检查是否有相关的配置选项

2. **REST API权限**
   - 确保REST API允许匿名访问
   - 进入"设置" → "阅读"
   - 检查REST API相关设置

## 验证步骤

完成配置后，您可以通过以下方式验证：

1. **访问API端点**
   ```
   https://test2.wxlanyun.com/wp-json/wp/v2/successful_project
   ```

2. **检查ACF数据**
   - 查看返回的JSON数据中是否包含实际的ACF字段值
   - 应该看到类似这样的数据：
   ```json
   {
     "acf": {
       "project_location": "您的项目地点",
       "project_date": "您的项目日期"
     }
   }
   ```

## 如果问题仍然存在

如果按照上述步骤操作后问题仍然存在，可能需要：

1. **检查主题兼容性**
   - 某些主题可能会影响ACF字段的REST API显示
   - 尝试切换到默认主题测试

2. **插件冲突**
   - 暂时禁用其他插件，检查是否有插件冲突

3. **重新安装插件**
   - 删除并重新安装ACF和"ACF to REST API"插件

4. **联系开发者**
   - 如果所有方法都无效，可能需要联系WordPress开发者进行进一步排查

## 当前代码的备用方案

我们已经在代码中实现了多种备用方案来获取字段数据，即使ACF配置不正确，也会尝试其他方法获取位置和日期信息。