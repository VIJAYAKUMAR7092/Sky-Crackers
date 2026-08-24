import os

file_path = 'lib/services/email/email.service.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_send = """      const info = await transporter.sendMail({
        from: `"Sky Crackers" <${process.env.EMAIL_USER}>`,
        to: adminEmail,
        subject: `🧨 New Order Received | Sky Crackers | Order #${order.orderReference}`,
        html,
      });"""

new_send = """      const info = await transporter.sendMail({
        from: `"Sky Crackers" <orders@skycrackers.com>`, // Custom domain prevents Gmail from showing "me" if allowed by SMTP
        replyTo: process.env.EMAIL_USER,
        to: adminEmail,
        subject: `🧨 New Order Received | Sky Crackers | Order #${order.orderReference}`,
        html,
      });"""

if old_send in content:
    content = content.replace(old_send, new_send)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated email from address.")
else:
    print("Could not find exact sendMail block.")
