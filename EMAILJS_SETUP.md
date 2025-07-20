# EmailJS 配置指南

## 📧 EmailJS 真实邮件发送设置

### 第一步：注册 EmailJS
1. 访问 [EmailJS官网](https://www.emailjs.com)
2. 创建免费账户（每月200封邮件免费）
3. 登录到控制台

### 第二步：创建邮件服务
1. 在 EmailJS 控制台点击 "Email Services"
2. 点击 "Add New Service"
3. 选择您的邮件提供商（推荐 Gmail）
4. 按照指示连接您的邮箱
5. 记录下 **Service ID**

### 第三步：创建邮件模板
1. 在控制台点击 "Email Templates"
2. 点击 "Create New Template"
3. 使用以下模板内容：

```
主题: 网站咨询: {{subject}}

您好！

您收到一条来自 Jiale Trading GmbH 官网的新咨询：

发送人：{{from_name}}
邮箱：{{from_email}}
主题：{{subject}}
时间：{{timestamp}}

咨询内容：
{{message}}

---
请及时回复客户！
自动发送于：{{timestamp}}
```

4. 记录下 **Template ID**

### 第四步：获取公钥
1. 在控制台点击 "Account" > "General"
2. 找到 "Public Key" 
3. 记录下您的 **Public Key**

### 第五步：配置环境变量
编辑 `.env.local` 文件：

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
NEXT_PUBLIC_CONTACT_EMAIL=your-email@gmail.com
```

### 第六步：测试
1. 重启开发服务器：`npm run dev`
2. 访问联系页面
3. 填写测试表单
4. 检查您的邮箱是否收到邮件

## 🔧 故障排除

### 常见问题：
1. **邮件未收到**：检查垃圾邮件文件夹
2. **403错误**：确认 Public Key 正确
3. **模板错误**：确认模板变量名称匹配
4. **服务连接失败**：重新验证邮箱服务

### 测试模式：
如果 EmailJS 配置不正确，系统会降级到 mailto 链接模式，用户可以手动发送邮件。

## 📊 EmailJS 免费额度
- 每月 200 封邮件免费
- 超出后 $15/月 1000封
- 适合中小企业使用

配置完成后，您的网站就可以自动发送真实邮件了！
