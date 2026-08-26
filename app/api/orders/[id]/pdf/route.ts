import { NextRequest, NextResponse } from 'next/server';
import { getOrderById } from '@/lib/services/orders/order.service';
import PDFDocument from 'pdfkit';
import { format } from 'date-fns';
import path from 'path';
import fs from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    let order;
    try {
      order = await getOrderById(id);
    } catch (e) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const customer = order.customer || (order.customerSnapshot as any) || {};
    const delivery = (order.deliverySnapshot as any) || {};

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    
    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });

    // ==========================================
    // 1. TOP HEADER (Logo Left, Address Right)
    // ==========================================
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 40, { fit: [150, 80] });
    } else {
      doc.fontSize(24).font('Helvetica-Bold').fillColor('#e11d48').text('SKY CRACKERS', 50, 50);
    }

    doc.fontSize(10).font('Helvetica-Bold').fillColor('#333333').text('SKY CRACKERS', 300, 50, { align: 'right', width: 245 });
    doc.font('Helvetica').fillColor('#666666')
      .text('2/174D, Sattur Road, Meenampatti,', 300, 65, { align: 'right', width: 245 })
      .text('Sivakasi, Tamil Nadu - 626189', 300, 80, { align: 'right', width: 245 })
      .text('Email: skycrackers@gmail.com', 300, 95, { align: 'right', width: 245 })
      .text('Phone: +91 90428 49344, +91 63838 28284, +91 93447 45092', 300, 110, { align: 'right', width: 245 });

    // Header Divider line
    doc.moveTo(50, 140).lineTo(545, 140).lineWidth(1).strokeColor('#e5e7eb').stroke();

    // ==========================================
    // 2. BILLING & ORDER INFO
    // ==========================================
    const infoY = 160;

    // Left: Customer Details
    doc.fontSize(12).font('Helvetica-Bold').fillColor('#e11d48').text('CUSTOMER DETAILS', 50, infoY);
    
    const custName = customer.fullName || delivery.fullName || 'Guest';
    const custPhone = customer.phone || delivery.phone || 'N/A';
    
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#111827').text(custName, 50, infoY + 20);
    doc.font('Helvetica').fillColor('#4b5563').text(`Phone: +91 ${custPhone}`, 50, infoY + 35);
    
    let addressY = infoY + 55;
    if (delivery.addressLine1) {
      doc.text(delivery.addressLine1, 50, addressY);
      addressY += 15;
    }
    if (delivery.addressLine2) {
      doc.text(delivery.addressLine2, 50, addressY);
      addressY += 15;
    }
    if (delivery.city) {
      doc.text(`${delivery.city}, ${delivery.state || ''} - ${delivery.pincode || ''}`, 50, addressY);
    }

    // Right: Order Details
    doc.fontSize(12).font('Helvetica-Bold').fillColor('#e11d48').text('ORDER DETAILS', 300, infoY, { align: 'right', width: 245 });
    
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#4b5563').text('Order ID:', 320, infoY + 20, { width: 90, align: 'right' });
    doc.font('Helvetica').fillColor('#111827').text(order.orderReference, 420, infoY + 20, { align: 'right', width: 125 });

    doc.font('Helvetica-Bold').fillColor('#4b5563').text('Order Date:', 320, infoY + 40, { width: 90, align: 'right' });
    doc.font('Helvetica').fillColor('#111827').text(format(new Date(order.createdAt), 'dd MMM yyyy, hh:mm a'), 420, infoY + 40, { align: 'right', width: 125 });

    doc.font('Helvetica-Bold').fillColor('#4b5563').text('Payment:', 320, infoY + 60, { width: 90, align: 'right' });
    doc.font('Helvetica').fillColor('#111827').text(order.paymentStatus || 'PENDING', 420, infoY + 60, { align: 'right', width: 125 });

    doc.font('Helvetica-Bold').fillColor('#4b5563').text('Status:', 320, infoY + 80, { width: 90, align: 'right' });
    doc.font('Helvetica').fillColor('#111827').text(order.status || 'PENDING', 420, infoY + 80, { align: 'right', width: 125 });

    // ==========================================
    // 3. TABLE HEADER
    // ==========================================
    let tableY = Math.max(addressY + 40, infoY + 120);

    // Table Header Background
    doc.rect(50, tableY, 495, 25).fill('#e11d48');
    
    doc.fillColor('#ffffff').fontSize(10).font('Helvetica-Bold');
    doc.text('Product Name', 60, tableY + 8, { width: 220, align: 'left' });
    doc.text('Qty', 290, tableY + 8, { width: 50, align: 'center' });
    doc.text('Unit Price', 350, tableY + 8, { width: 80, align: 'right' });
    doc.text('Line Total', 450, tableY + 8, { width: 85, align: 'right' });

    // ==========================================
    // 4. TABLE ROWS
    // ==========================================
    let rowY = tableY + 25;
    doc.fillColor('#111827').font('Helvetica');
    
    order.items.forEach((item: any, i: number) => {
      if (rowY > 700) {
        doc.addPage();
        rowY = 50;
      }
      
      const pName = item.productName || 'Product';
      
      // Calculate row height based on text wrapping
      const nameHeight = doc.heightOfString(pName, { width: 220 });
      const currentHeight = Math.max(nameHeight, 15) + 15;
      
      // Zebra striping (optional for neatness)
      if (i % 2 === 0) {
        doc.rect(50, rowY, 495, currentHeight).fill('#f9fafb');
      }
      doc.fillColor('#111827');
      
      doc.text(pName, 60, rowY + 8, { width: 220, align: 'left' });
      doc.text(item.quantity.toString(), 290, rowY + 8, { width: 50, align: 'center' });
      doc.text(`Rs ${Number(item.unitPrice).toFixed(2)}`, 350, rowY + 8, { width: 80, align: 'right' });
      doc.text(`Rs ${Number(item.totalAmount).toFixed(2)}`, 450, rowY + 8, { width: 85, align: 'right' });
        
      rowY += currentHeight;
    });

    // Table Bottom Border
    doc.moveTo(50, rowY).lineTo(545, rowY).lineWidth(1).strokeColor('#e5e7eb').stroke();
    rowY += 20;

    // ==========================================
    // 5. TOTALS SECTION
    // ==========================================
    // Keep totals together. Break page if not enough space
    if (rowY > 650) {
      doc.addPage();
      rowY = 50;
    }

    const labelsX = 350;
    const labelsWidth = 90; // Creates boundary for right-aligning labels
    
    const valuesX = 450;
    const valuesWidth = 85; // Creates boundary for right-aligning values

    doc.fontSize(10).font('Helvetica-Bold').fillColor('#4b5563');
    doc.text('Subtotal:', labelsX, rowY, { width: labelsWidth, align: 'right' });
    doc.fillColor('#111827').text(`Rs ${Number(order.subtotal).toFixed(2)}`, valuesX, rowY, { width: valuesWidth, align: 'right' });
    rowY += 20;
    
    if (Number(order.discountAmount) > 0) {
      doc.fillColor('#4b5563').text('Discount:', labelsX, rowY, { width: labelsWidth, align: 'right' });
      doc.fillColor('#16a34a').text(`-Rs ${Number(order.discountAmount).toFixed(2)}`, valuesX, rowY, { width: valuesWidth, align: 'right' });
      rowY += 20;
    }
    
    if (Number(order.deliveryCharge) > 0) {
      doc.fillColor('#4b5563').text('Shipping:', labelsX, rowY, { width: labelsWidth, align: 'right' });
      doc.fillColor('#111827').text(`Rs ${Number(order.deliveryCharge).toFixed(2)}`, valuesX, rowY, { width: valuesWidth, align: 'right' });
      rowY += 20;
    }

    rowY += 10;
    // Grand Total Box
    doc.rect(labelsX - 10, rowY, 215, 30).fill('#e11d48');
    doc.fillColor('#ffffff').fontSize(12).font('Helvetica-Bold');
    doc.text('GRAND TOTAL', labelsX, rowY + 9, { width: labelsWidth, align: 'left' });
    doc.text(`Rs ${Number(order.finalTotal).toFixed(2)}`, valuesX, rowY + 9, { width: valuesWidth - 5, align: 'right' });

    // ==========================================
    // 6. FOOTER
    // ==========================================
    doc.fontSize(10).font('Helvetica-Oblique').fillColor('#888888');
    doc.text('Thank you for shopping with Sky Crackers!', 50, 750, { align: 'center', width: 495 });
    doc.fontSize(8).text('This is a computer generated invoice.', 50, 765, { align: 'center', width: 495 });

    doc.end();

    const pdfBuffer = await pdfPromise;

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="SKYCRACKERS-ORDER-${order.orderReference}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
