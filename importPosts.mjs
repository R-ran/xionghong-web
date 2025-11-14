import fetch from 'node-fetch';

// 你的WordPress网站信息
const WP_URL = 'https://test2.wxlanyun.com'; // 替换为你的站点
const USERNAME = 'admin@wxlanyun.com'; // WordPress用户名
const APP_PASSWORD = 'oqbo iWBb vRMO yTg0 SCt3 hw68'; // 生成的应用密码

// 要导入的页面内容数组
const pagesToImport = [
  {
    title: 'Home',
    content: '/app/page.tsx'
  },
  {
    title: 'Products',
    content: '/app/products/page.tsx'
  },
  {
    title: 'Successful Projects',
    content: '/app/successful-projects/page.tsx'
  },
  {
    title: 'About Us',
    content: '/app/about/page.tsx'
  },
  {
    title: 'News & Blogs',
    content: '/app/news-blogs/page.tsx'
  },
  {
    title: 'Contact Us',
    content: '/app/contact/page.tsx'
  },
  // 可以继续添加
];

// 批量导入函数
async function batchImport() {
  for (const page of pagesToImport) {
    try {
      const response = await fetch(`${WP_URL}/wp-json/wp/v2/posts`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: page.title,
          content: page.content,
          status: 'publish' // 发布，或者draft
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log(`成功导入：${page.title}（ID：${data.id}）`);
      } else {
        console.error(`导入失败：${page.title}，错误：`, data);
      }
    } catch (err) {
      console.error(`请求异常：${page.title}，错误：`, err);
    }
  }
}

batchImport();