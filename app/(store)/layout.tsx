import React from "react";
import Navbar from "../../components/public/layout/Navbar";
import Footer from "../../components/public/layout/Footer";
import FloatingStoreWidgets from "../../components/public/layout/FloatingStoreWidgets";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans antialiased text-gray-900 selection:bg-primary/20 relative">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
      <FloatingStoreWidgets />
    </div>
  );
}
