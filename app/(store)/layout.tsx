import React from "react";
import Navbar from "../../components/public/layout/Navbar";
import Footer from "../../components/public/layout/Footer";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased text-foreground selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 flex flex-col pt-[72px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
