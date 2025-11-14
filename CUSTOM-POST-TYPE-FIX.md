# 自定义文章类型 ACF 集成修复指南

## 问题诊断

通过检查发现：
- ✅ `successful_project` 文章类型已正确注册
- ✅ REST API 端点工作正常
- ❌ **关键问题**: 文章类型注册时未设置 `show_in_rest => true`
- ❌ 这导致 ACF 无法在后台识别该文章类型

## 解决方案

### 方案1: 修改文章类型注册代码（推荐）

在您的主题 `functions.php` 或自定义插件中，找到注册 `successful_project` 文章类型的代码，添加以下参数：

```php
register_post_type('successful_project', array(
    'label' => 'Successful Projects',
    'public' => true,
    'has_archive' => true,
    'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
    'menu_icon' => 'dashicons-portfolio',
    'show_in_rest' => true,        // ← 添加这行
    'rest_base' => 'successful_project',
    'rest_controller_class' => 'WP_REST_Posts_Controller',
    'taxonomies' => array('project_category'),
));
```

### 方案2: 如果找不到代码位置

如果您找不到注册文章类型的代码，可以在主题的 `functions.php` 文件中添加以下代码：

```php
// 修改 successful_project 文章类型设置
function modify_successful_project_post_type() {
    global $wp_post_types;

    if (post_type_exists('successful_project')) {
        $wp_post_types['successful_project']->show_in_rest = true;
        $wp_post_types['successful_project']->rest_base = 'successful_project';
        $wp_post_types['successful_project']->rest_controller_class = 'WP_REST_Posts_Controller';
    }
}
add_action('init', 'modify_successful_project_post_type', 99);
```

### 方案3: 使用插件（临时解决方案）

如果您无法编辑代码，可以安装以下插件来修复：

1. **Custom Post Type UI** 插件
   - 安装并激活插件
   - 进入 "CPT UI" → "Edit Post Types"
   - 找到 `successful_project`
   - 勾选 "Show in REST API" 选项
   - 保存设置

## 验证步骤

完成修改后：

1. **重新保存固定链接**
   - 进入 "设置" → "固定链接"
   - 点击 "保存更改"（不需要修改任何设置）

2. **检查文章类型是否在 ACF 中可见**
   - 进入 ACF 字段组设置
   - 在"位置"规则中应该能看到 "Successful Projects"

3. **验证 REST API**
   - 访问: `https://test2.wxlanyun.com/wp-json/wp/v2/types`
   - 确认 `successful_project` 的 `show_in_rest` 为 `true`

## ACF 字段组配置

修复文章类型后，配置 ACF 字段组：

1. **编辑字段组**
   - 进入 "字段组"
   - 编辑包含 `project_location` 和 `project_date` 的字段组

2. **设置位置规则**
   - 位置 → 如果 Post Type 等于 Successful Projects

3. **启用 REST API**
   - 设置 → 勾选 "在 REST API 中显示"

4. **保存设置**

5. **重新保存项目**
   - 进入 "成功项目"
   - 编辑每个项目并点击"更新"