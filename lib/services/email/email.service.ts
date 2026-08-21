import nodemailer from 'nodemailer';

// Helper to get transporter safely at runtime
const getTransporter = () => {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT || '587', 10);
  const secure = port === 465;
  const user = process.env.EMAIL_USER || '';
  const pass = process.env.EMAIL_PASS || '';

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      // Bypass local antivirus/VPN SSL interception for development
      rejectUnauthorized: false,
    }
  });

  return transporter;
};

export const emailService = {
  async sendNewOrderNotification(order: any) {
    try {
      const transporter = getTransporter();

      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Email Notification Failed: SMTP credentials are not configured in the environment.');
        return false;
      }

      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
      if (!adminEmail) {
        console.error('Email Notification Failed: ADMIN_NOTIFICATION_EMAIL is not configured.');
        return false;
      }

      const customerName = order.customerSnapshot?.fullName || 'Customer';
      const phone = order.customerSnapshot?.phone || '';
      const address = order.deliverySnapshot || {};
      
      const itemsHtml = (order.items || []).map((item: any) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.productName}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">?${Number(item.unitPrice).toFixed(2)}</td>
        </tr>
      `).join('');

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 2xl mx-auto p-4; color: #333;">
          <h2 style="color: #2c3e50;">?? New Order Received - Sky Crackers</h2>
          <p>A new order has been placed successfully.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; border-bottom: 1px solid #dee2e6; padding-bottom: 10px;">Order Details</h3>
            <p><strong>Order ID:</strong> ${order.orderReference}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt || Date.now()).toLocaleString()}</p>
            <p><strong>Customer Name:</strong> ${customerName}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Delivery Address:</strong> ${address.addressLine1 || ''}, ${address.addressLine2 || ''} ${address.city || ''} ${address.pincode || ''}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f1f1f1;">
                <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Product Name</th>
                <th style="padding: 8px; text-align: center; border-bottom: 2px solid #ddd;">Quantity</th>
                <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 8px; text-align: right; font-weight: bold;">Subtotal:</td>
                <td style="padding: 8px; text-align: right;">?${Number(order.subtotal).toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 8px; text-align: right; font-weight: bold;">Grand Total:</td>
                <td style="padding: 8px; text-align: right; font-weight: bold; color: #e74c3c;">?${Number(order.finalTotal).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          
          <p style="font-size: 12px; color: #777;">This is an automated message from Sky Crackers Order Management System.</p>
        </div>
      `;

      const info = await transporter.sendMail({
        from: `"Sky Crackers" <${process.env.EMAIL_USER}>`,
        to: adminEmail,
        subject: `?? New Order Received - ${order.orderReference}`,
        html,
      });

      console.log('Successfully delivered email notification to Admin', info.messageId);
      return true;
    } catch (error: any) {
      console.error('Email Notification Failed:', error.message || error);
      return false; // Swallow the error to prevent failing the checkout
    }
  }
};