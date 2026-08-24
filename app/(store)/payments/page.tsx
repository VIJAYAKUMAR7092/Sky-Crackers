"use client";

import React, { useState } from "react";
import { Copy, CheckCircle2, CreditCard, Building2, Smartphone } from "lucide-react";

interface PaymentDetails {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
  phonePe: string;
  gPay: string;
}

const paymentAccounts: PaymentDetails[] = [
  {
    id: "pandiyarajan",
    name: "Pandiyarajan A",
    accountNumber: "37822451311",
    bankName: "State Bank of India",
    ifsc: "SBIN0015801",
    phonePe: "9344745092",
    gPay: "9344745092",
  },
  {
    id: "shanthini",
    name: "Shanthini A",
    accountNumber: "41995320976",
    bankName: "State Bank of India",
    ifsc: "SBIN0015801",
    phonePe: "9042015119",
    gPay: "9042015119",
  },
];

export default function PaymentsPage() {
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: "" });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, type: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setToast({ show: true, message: `${type} Copied Successfully` });
      
      setTimeout(() => setCopiedId(null), 2000);
      setTimeout(() => {
        setToast((prev) => (prev.message.includes(type) ? { show: false, message: "" } : prev));
      }, 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Toast Notification */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
          toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium text-sm">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          {toast.message}
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4 animate-[fadeIn_0.8s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900">
            Payment <span className="text-primary">Details</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Please use the following official account details or UPI IDs to make your payments securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {paymentAccounts.map((account, idx) => (
            <div 
              key={account.id} 
              className="bg-[#FFFFFA] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden hover:shadow-[0_20px_40px_rgb(223,38,12,0.08)] transition-all duration-500 hover:-translate-y-1.5 border border-gray-100"
              style={{ animation: `slideUpFade 0.6s ease-out ${idx * 0.2}s both` }}
            >
              {/* Header */}
              <div className="bg-primary px-6 py-5">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">{account.name}</h3>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-8">
                
                {/* Bank Details */}
                <div className="space-y-6">
                  {/* Account Number */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Account Number</p>
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-wider">
                          {account.accountNumber}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleCopy(account.accountNumber, "Account Number", `${account.id}-acc`)}
                        className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-primary hover:bg-red-50 transition-colors relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/20"
                        title="Copy Account Number"
                      >
                        {copiedId === `${account.id}-acc` ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 animate-[scaleIn_0.2s_ease-out]" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Name (repeated in body as per screenshot) */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Name</p>
                    <p className="text-base md:text-lg font-medium text-gray-800">{account.name}</p>
                  </div>

                  {/* Bank Name */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bank Name</p>
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <p className="text-base md:text-lg font-medium text-gray-800">{account.bankName}</p>
                    </div>
                  </div>

                  {/* IFSC */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">IFSC</p>
                    <p className="text-base md:text-lg font-medium text-gray-800 tracking-widest">{account.ifsc}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 w-full"></div>

                {/* UPI Details */}
                <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    UPI Payments
                  </p>
                  
                  <div className="space-y-4">
                    {/* PhonePe */}
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <span className="text-sm md:text-base font-bold text-gray-700 w-20">PhonePe:</span>
                        <span className="text-lg md:text-xl font-bold text-primary tracking-wide">{account.phonePe}</span>
                      </div>
                      <button 
                        onClick={() => handleCopy(account.phonePe, "Phone Number", `${account.id}-phonepe`)}
                        className="p-2 rounded-lg bg-white shadow-sm text-gray-400 hover:text-primary hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                        title="Copy PhonePe Number"
                      >
                        {copiedId === `${account.id}-phonepe` ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 animate-[scaleIn_0.2s_ease-out]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* G-Pay */}
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <span className="text-sm md:text-base font-bold text-gray-700 w-20">G-Pay:</span>
                        <span className="text-lg md:text-xl font-bold text-primary tracking-wide">{account.gPay}</span>
                      </div>
                      <button 
                        onClick={() => handleCopy(account.gPay, "Phone Number", `${account.id}-gpay`)}
                        className="p-2 rounded-lg bg-white shadow-sm text-gray-400 hover:text-primary hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                        title="Copy G-Pay Number"
                      >
                        {copiedId === `${account.id}-gpay` ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 animate-[scaleIn_0.2s_ease-out]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes scaleIn {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}} />
    </main>
  );
}
