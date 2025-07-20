import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // 验证必填字段
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '所有字段都是必填的' },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      );
    }

    // 构建邮件内容
    const emailContent = `
新的网站咨询消息：

姓名: ${name}
邮箱: ${email}
主题: ${subject}

消息内容:
${message}

---
此消息来自 Jiale Trading GmbH 网站联系表单
发送时间: ${new Date().toLocaleString('de-DE', { 
  timeZone: 'Europe/Berlin',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
})}
    `.trim();

    // 这里我们发送邮件到您的邮箱
    // 在实际部署时，您需要配置真正的邮件服务
    // 目前我们模拟发送成功
    
    // 您可以配置以下任一邮件服务：
    // 1. EmailJS (客户端发送，免费)
    // 2. Nodemailer + SMTP (服务器端发送)
    // 3. SendGrid, AWS SES 等第三方服务
    
    console.log('收到新的咨询:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // 这里可以添加发送到您邮箱的逻辑
    // 例如使用 fetch 调用外部邮件服务API
    
    try {
      // 模拟邮件发送 - 您需要替换为真实的邮件服务
      const mailtoLink = `mailto:shengshun@jiale.de?subject=网站咨询: ${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `姓名: ${name}\n邮箱: ${email}\n\n消息:\n${message}`
      )}`;
      
      return NextResponse.json({ 
        success: true, 
        message: '消息已收到！我们会尽快通过邮件回复您。',
        // 在开发环境中返回邮件内容用于测试
        ...(process.env.NODE_ENV === 'development' && {
          debug: {
            emailContent,
            mailtoLink
          }
        })
      });
      
    } catch (mailError) {
      console.error('邮件发送失败:', mailError);
      return NextResponse.json({ 
        success: true, 
        message: '消息已收到！我们会尽快通过邮件回复您。'
      });
    }

  } catch (error) {
    console.error('处理联系表单时出错:', error);
    return NextResponse.json(
      { error: '发送消息时出现错误，请稍后再试或直接发邮件到 shengshun@jiale.de' },
      { status: 500 }
    );
  }
}
