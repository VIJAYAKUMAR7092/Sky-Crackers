require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const url = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: url, max: 2 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const pages = [
  {
    slug: 'about-us',
    title: 'About Sky Crackers',
    content: `
      <h2>Welcome to Sky Crackers</h2>
      <p>Sky Crackers is a leading wholesale and retail fireworks supplier based in Sivakasi, the fireworks capital of India. With years of experience in the industry, we take pride in delivering the highest quality crackers to make your celebrations brighter and safer.</p>
      
      <h3>Our Mission</h3>
      <p>To spread joy and happiness by providing safe, premium-quality, and reasonably priced fireworks directly to customers across the country.</p>
      
      <h3>Why Choose Us?</h3>
      <ul>
        <li><strong>Premium Quality:</strong> All our products undergo strict quality checks to ensure bright colors and loud sounds without compromising safety.</li>
        <li><strong>Wholesale Pricing:</strong> Buy directly from the manufacturers in Sivakasi with massive discounts up to 90% OFF on MRP!</li>
        <li><strong>Fast & Safe Delivery:</strong> We ensure that your orders are packed securely in corrugated boxes and delivered via trusted transport partners.</li>
      </ul>
      <p>Thank you for choosing Sky Crackers. Wishing you safe and joyous celebrations!</p>
    `
  },
  {
    slug: 'contact',
    title: 'Contact Us',
    content: `
      <p>We are always here to assist you with your orders and inquiries. Feel free to reach out to us!</p>
      
      <div style="background-color: #f8fafc; padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
        <h3 style="margin-top: 0;">Our Address</h3>
        <p><strong>Sky Crackers</strong><br/>
        2/174D, Sattur Road,<br/>
        Meenampatti, Sivakasi,<br/>
        Tamil Nadu - 626189</p>
        
        <h3>Contact Details</h3>
        <p><strong>Phone / WhatsApp:</strong> +91 9042849344<br/>
        <strong>Email:</strong> info@skycrackers.com</p>
        
        <h3>Working Hours</h3>
        <p>You can purchase on all days from 8:00 AM to 10:00 PM.</p>
      </div>
    `
  },
  {
    slug: 'delivery-information',
    title: 'Delivery Information',
    content: `
      <h2>Shipping & Delivery Policy</h2>
      <p>At Sky Crackers, we ensure that your orders are packed securely and delivered to your preferred transport office safely.</p>
      
      <h3>Delivery Method</h3>
      <p>Due to the explosive nature of fireworks, crackers cannot be sent through standard courier services. We send all parcels through registered, authorized transport services.</p>
      
      <h3>Delivery Process</h3>
      <ol>
        <li>Once you place an order and complete payment, your order will be packed in sturdy corrugated carton boxes to prevent damage.</li>
        <li>We will dispatch your order through a trusted transport service.</li>
        <li>You will receive the Lorry Receipt (LR) copy / Tracking number via WhatsApp or Email.</li>
        <li>You must collect the parcel from the respective transport office in your city/town.</li>
      </ol>
      
      <h3>Delivery Timeline & Charges</h3>
      <ul>
        <li><strong>Dispatch:</strong> Orders are typically dispatched within 24 to 48 hours of payment confirmation.</li>
        <li><strong>Transit Time:</strong> It takes 3 to 5 working days depending on your location.</li>
        <li><strong>Delivery Charges:</strong> Transport charges are extra and must be paid by the customer directly at the transport office during delivery ("To Pay" basis).</li>
      </ul>
    `
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    content: `
      <h2>Privacy Policy</h2>
      <p>Your privacy is very important to us at Sky Crackers. We are committed to protecting the personal information you share with us.</p>
      
      <h3>Information We Collect</h3>
      <p>We collect information such as your name, contact number, delivery address, and email address when you place an order or register on our website. This information is strictly used for order processing, billing, and shipping.</p>
      
      <h3>How We Use Your Information</h3>
      <ul>
        <li>To process and fulfill your orders quickly.</li>
        <li>To send you updates regarding your order status.</li>
        <li>To notify you about special offers, massive discounts, and combo packs during festive seasons.</li>
      </ul>
      
      <h3>Data Security</h3>
      <p>We do not sell, trade, or otherwise transfer your personal information to outside parties. Your data is kept secure and confidential.</p>
    `
  },
  {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    content: `
      <h2>Terms & Conditions</h2>
      <p>By accessing and using the Sky Crackers website, you agree to comply with the following terms and conditions:</p>
      
      <h3>General Conditions</h3>
      <ul>
        <li>You must be at least 18 years of age to purchase fireworks from our website.</li>
        <li>All products must be used under adult supervision and according to the safety guidelines provided.</li>
        <li>Prices are subject to change without prior notice, although confirmed orders will be processed at the agreed price.</li>
      </ul>
      
      <h3>Payments</h3>
      <p>We require 100% advance payment to process and dispatch orders. <strong>Cash on Delivery (COD) is not available</strong> for firecrackers.</p>
      
      <h3>Cancellations & Refunds</h3>
      <p>Once an order is confirmed and payment is made, cancellations are generally not accepted since dispatch processes start immediately. Refunds will only be considered under exceptional circumstances (e.g., out-of-stock items).</p>
      
      <h3>Safety Disclaimer</h3>
      <p>Sky Crackers is not responsible for any accidents, damages, or injuries caused by the improper use, storage, or handling of fireworks. Please follow all standard safety precautions when bursting crackers.</p>
    `
  }
];

async function seedPages() {
  for (const page of pages) {
    await prisma.staticPage.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        content: page.content,
        active: true
      },
      create: {
        slug: page.slug,
        title: page.title,
        content: page.content,
        active: true
      }
    });
    console.log('Upserted page:', page.slug);
  }
}

seedPages()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
