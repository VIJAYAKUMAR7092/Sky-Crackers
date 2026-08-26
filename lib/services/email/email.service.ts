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

      const adminEmail = 'skycrackersorder@gmail.com';

      const customerName = order.customerSnapshot?.fullName || 'Customer';
      const phone = order.customerSnapshot?.phone || '';
      const address = order.deliverySnapshot || {};
      const orderDate = new Date(order.createdAt || Date.now());
      const formattedDate = orderDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
      const formattedTime = orderDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      const orderStatus = order.orderStatus || 'PENDING';
      
      const itemsHtml = (order.items || []).map((item: any) => `
        <tr>
          <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #333; font-weight: 500;">${item.productName}</td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #555; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #555; text-align: right;">₹${Number(item.unitPrice).toFixed(2)}</td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #333; text-align: right; font-weight: bold;">₹${Number(item.totalPrice || (item.quantity * item.unitPrice)).toFixed(2)}</td>
        </tr>
      `).join('');

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Order Received</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            
            <!-- Header -->
            <div style="background-color: #e11d48; border-radius: 12px 12px 0 0; padding: 30px 20px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase;">SKY CRACKERS</h1>
              <p style="color: #ffe4e6; margin: 5px 0 0 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Order Management System</p>
            </div>

            <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);">
              <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 24px; font-weight: 800; text-align: center;">NEW ORDER RECEIVED 🚀</h2>
              
              <!-- Order Info Card -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 5px 0; color: #64748b; font-size: 13px; text-transform: uppercase; font-weight: 600; width: 40%;">Order ID:</td>
                    <td style="padding: 5px 0; color: #0f172a; font-size: 14px; font-weight: 700; text-align: right;">${order.orderReference}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #64748b; font-size: 13px; text-transform: uppercase; font-weight: 600;">Order Date:</td>
                    <td style="padding: 5px 0; color: #0f172a; font-size: 14px; font-weight: 700; text-align: right;">${formattedDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #64748b; font-size: 13px; text-transform: uppercase; font-weight: 600;">Order Time:</td>
                    <td style="padding: 5px 0; color: #0f172a; font-size: 14px; font-weight: 700; text-align: right;">${formattedTime}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #64748b; font-size: 13px; text-transform: uppercase; font-weight: 600;">Order Status:</td>
                    <td style="padding: 5px 0; text-align: right;">
                      <span style="background-color: #fef3c7; color: #d97706; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; display: inline-block;">${orderStatus}</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Customer Details -->
              <h3 style="color: #334155; font-size: 16px; margin: 0 0 15px 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Customer Details</h3>
              <div style="margin-bottom: 25px; color: #475569; font-size: 14px; line-height: 1.6;">
                <p style="margin: 0 0 5px 0;"><strong>Name:</strong> <span style="color: #0f172a;">${customerName}</span></p>
                <p style="margin: 0 0 5px 0;"><strong>Mobile:</strong> <span style="color: #0f172a;">${phone}</span></p>
                <p style="margin: 0;"><strong>Address:</strong> <br>
                  ${address.addressLine1 || ''} ${address.addressLine2 ? ', ' + address.addressLine2 : ''}<br>
                  ${address.city || ''} - ${address.pincode || ''}<br>
                  ${address.state || ''}
                </p>
              </div>

              <!-- Product Table -->
              <h3 style="color: #334155; font-size: 16px; margin: 0 0 15px 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Order Items</h3>
              <div style="overflow-x: auto; margin-bottom: 25px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <thead>
                    <tr style="background-color: #f8fafc;">
                      <th style="padding: 12px 15px; text-align: left; color: #475569; font-weight: 700; border-bottom: 2px solid #e2e8f0; border-radius: 8px 0 0 0;">Product</th>
                      <th style="padding: 12px 15px; text-align: center; color: #475569; font-weight: 700; border-bottom: 2px solid #e2e8f0;">Qty</th>
                      <th style="padding: 12px 15px; text-align: right; color: #475569; font-weight: 700; border-bottom: 2px solid #e2e8f0;">Price</th>
                      <th style="padding: 12px 15px; text-align: right; color: #475569; font-weight: 700; border-bottom: 2px solid #e2e8f0; border-radius: 0 8px 0 0;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" style="padding: 12px 15px; text-align: right; color: #64748b; font-weight: 600; border-top: 2px solid #e2e8f0;">Subtotal</td>
                      <td style="padding: 12px 15px; text-align: right; color: #0f172a; font-weight: 700; border-top: 2px solid #e2e8f0;">₹${Number(order.subtotal).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" style="padding: 12px 15px; text-align: right; color: #64748b; font-weight: 600;">Shipping</td>
                      <td style="padding: 12px 15px; text-align: right; color: #0f172a; font-weight: 700;">₹${Number(order.deliveryCharge || 0).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" style="padding: 15px; text-align: right; color: #0f172a; font-weight: 900; font-size: 16px; border-top: 1px dashed #cbd5e1;">GRAND TOTAL</td>
                      <td style="padding: 15px; text-align: right; color: #e11d48; font-weight: 900; font-size: 18px; border-top: 1px dashed #cbd5e1;">₹${Number(order.finalTotal).toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <!-- Admin Action Box -->
              <div style="background-color: #fff1f2; border-left: 4px solid #e11d48; padding: 15px 20px; border-radius: 0 8px 8px 0; margin-bottom: 10px;">
                <h4 style="color: #be123c; margin: 0 0 5px 0; font-size: 15px; font-weight: 800; display: flex; align-items: center;">⚡ Action Required</h4>
                <p style="color: #881337; margin: 0; font-size: 14px; line-height: 1.5;">Please login to the Admin Panel to verify and process this order.</p>
              </div>

            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 25px 20px; color: #94a3b8; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0 0 5px 0; font-weight: 700; color: #64748b; font-size: 14px;">Sky Crackers</p>
              <p style="margin: 0 0 10px 0;">Order Management System</p>
              <p style="margin: 0;">This is an automated email.<br>Please do not reply to this address.</p>
            </div>
            
          </div>
        </body>
        </html>
      `;

      const info = await transporter.sendMail({
        from: `"Sky Crackers Orders" <${process.env.EMAIL_USER}>`,
        replyTo: process.env.EMAIL_USER,
        to: adminEmail,
        subject: `🧨 New Order Received | Sky Crackers | Order #${order.orderReference}`,
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
