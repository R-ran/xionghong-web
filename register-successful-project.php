<?php
/**
 * 注册 successful_project 自定义文章类型
 *
 * 使用方法：
 * 1. 将此代码添加到主题的 functions.php 文件中，或者
 * 2. 创建自定义插件并在插件文件中使用此代码
 */

function register_successful_project_post_type() {

    // 定义文章类型参数
    $args = array(
        'label'                 => '成功项目',                    // 显示名称
        'labels'                => array(
            'name'               => '成功项目',
            'singular_name'      => '成功项目',
            'menu_name'          => '成功项目',
            'name_admin_bar'     => '成功项目',
            'add_new'            => '添加新项目',
            'add_new_item'       => '添加新项目',
            'new_item'           => '新项目',
            'edit_item'          => '编辑项目',
            'view_item'          => '查看项目',
            'all_items'          => '所有项目',
            'search_items'       => '搜索项目',
            'parent_item_colon'  => '父项目:',
            'not_found'          => '未找到项目',
            'not_found_in_trash' => '回收站中未找到项目',
            'featured_image'     => '项目图片',
            'set_featured_image' => '设置项目图片',
            'remove_featured_image' => '移除项目图片',
            'use_featured_image' => '使用项目图片',
            'archives'           => '项目存档',
            'insert_into_item'   => '插入到项目',
            'uploaded_to_this_item' => '上传到此项目',
            'filter_items_list'  => '筛选项目列表',
            'items_list_navigation' => '项目列表导航',
            'items_list'         => '项目列表',
        ),
        'description'           => '成功项目案例展示',              // 描述
        'public'                => true,                            // 公开可见
        'publicly_queryable'    => true,                            // 可公开查询
        'show_ui'               => true,                            // 在后台显示
        'show_in_menu'          => true,                            // 在菜单中显示
        'query_var'             => true,                            // 查询变量
        'rewrite'               => array(
            'slug'               => 'successful-projects',          // URL 重写
            'with_front'         => true,
            'pages'              => true,
            'feeds'              => true,
        ),
        'capability_type'       => 'post',                          // 权限类型
        'has_archive'           => true,                            // 是否有存档页
        'hierarchical'          => false,                           // 是否支持层级结构
        'menu_position'         => 25,                              // 菜单位置
        'menu_icon'             => 'dashicons-portfolio',           // 菜单图标
        'supports'              => array(                           // 支持的功能
            'title',              // 标题
            'editor',             // 编辑器
            'excerpt',            // 摘要
            'thumbnail',          // 特色图片
            'custom-fields',      // 自定义字段
            'revisions',          // 修订版本
            'author',             // 作者
            'page-attributes',    // 页面属性
        ),
        'taxonomies'            => array(                           // 关联的分类法
            'project_category',  // 项目分类
        ),

        // 🔥 关键设置：REST API 支持
        'show_in_rest'           => true,                           // 在 REST API 中显示
        'rest_base'             => 'successful_project',           // REST API 基础端点
        'rest_namespace'        => 'wp/v2',                        // REST API 命名空间
        'rest_controller_class' => 'WP_REST_Posts_Controller',     // REST API 控制器类

        // 其他重要设置
        'can_export'            => true,                            // 可导出
        'delete_with_user'      => false,                           // 删除用户时不删除文章类型
        'show_in_nav_menus'     => true,                            // 在导航菜单中显示
        'show_in_admin_bar'     => true,                            // 在管理栏中显示
    );

    // 注册文章类型
    register_post_type('successful_project', $args);

    // 刷新重写规则（仅在激活时执行）
    flush_rewrite_rules();
}

// 将注册函数挂载到 init 钩子
add_action('init', 'register_successful_project_post_type', 0);

/**
 * 注册项目分类法
 * 如果还没有注册 project_category 分类法，使用此代码
 */
function register_project_category_taxonomy() {

    $labels = array(
        'name'              => '项目分类',
        'singular_name'     => '项目分类',
        'search_items'      => '搜索分类',
        'all_items'         => '所有分类',
        'parent_item'       => '父分类',
        'parent_item_colon' => '父分类:',
        'edit_item'         => '编辑分类',
        'update_item'       => '更新分类',
        'add_new_item'      => '添加新分类',
        'new_item_name'     => '新分类名称',
        'menu_name'         => '项目分类',
    );

    $args = array(
        'hierarchical'      => true,                              // 分层结构（像分类）
        'labels'            => $labels,
        'show_ui'           => true,                              // 在后台显示
        'show_admin_column' => true,                              // 在管理列表中显示
        'query_var'         => true,                              // 查询变量
        'rewrite'           => array(
            'slug'          => 'project-category',                // URL 重写
            'with_front'    => true,
        ),
        'show_in_rest'      => true,                              // 在 REST API 中显示
        'rest_base'         => 'project_category',                // REST API 基础端点
        'rest_namespace'    => 'wp/v2',                           // REST API 命名空间
    );

    // 注册分类法
    register_taxonomy('project_category', array('successful_project'), $args);
}

// 将分类法注册函数挂载到 init 钩子
add_action('init', 'register_project_category_taxonomy', 0);

/**
 * 激活时的处理
 * 仅当这是首次激活时执行
 */
function successful_project_activation() {
    // 首先注册文章类型和分类法
    register_successful_project_post_type();
    register_project_category_taxonomy();

    // 然后刷新重写规则
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'successful_project_activation');

/**
 * 停用时的处理
 */
function successful_project_deactivation() {
    // 清理重写规则
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'successful_project_deactivation');

/**
 * 确保 REST API 正确显示项目数据
 * 这个函数确保 ACF 字段能在 REST API 中正确显示
 */
function ensure_successful_project_rest_support($args, $post_type) {
    if ('successful_project' === $post_type) {
        $args['show_in_rest'] = true;
    }
    return $args;
}
add_filter('register_post_type_args', 'ensure_successful_project_rest_support', 10, 2);

?>