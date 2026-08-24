import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ShoppingCart, ClipboardCheck, CheckCircle2, Package, Truck, Home } from 'lucide-react';

export default function OrderFlowchart() {
  const steps = [
    {
      id: 1,
      title: "Order Received",
      desc: "New customer order created",
      icon: <ShoppingCart className="w-5 h-5 text-blue-500" />,
      color: "border-blue-200 bg-blue-50",
      iconBg: "bg-blue-100",
      textColor: "text-blue-700"
    },
    {
      id: 2,
      title: "Verification",
      desc: "Payment & details checked",
      icon: <ClipboardCheck className="w-5 h-5 text-amber-500" />,
      color: "border-amber-200 bg-amber-50",
      iconBg: "bg-amber-100",
      textColor: "text-amber-700"
    },
    {
      id: 3,
      title: "Confirmed",
      desc: "Order ready for processing",
      icon: <CheckCircle2 className="w-5 h-5 text-indigo-500" />,
      color: "border-indigo-200 bg-indigo-50",
      iconBg: "bg-indigo-100",
      textColor: "text-indigo-700"
    },
    {
      id: 4,
      title: "Packed",
      desc: "Products prepared for shipment",
      icon: <Package className="w-5 h-5 text-orange-500" />,
      color: "border-orange-200 bg-orange-50",
      iconBg: "bg-orange-100",
      textColor: "text-orange-700"
    },
    {
      id: 5,
      title: "Shipped",
      desc: "Courier assigned & dispatched",
      icon: <Truck className="w-5 h-5 text-purple-500" />,
      color: "border-purple-200 bg-purple-50",
      iconBg: "bg-purple-100",
      textColor: "text-purple-700"
    },
    {
      id: 6,
      title: "Delivered",
      desc: "Successfully delivered",
      icon: <Home className="w-5 h-5 text-green-600" />,
      color: "border-green-200 bg-green-50",
      iconBg: "bg-green-100",
      textColor: "text-green-700"
    }
  ];

  return (
    // Business process visualization flow
    // Represents customer order lifecycle
    <Card className="border-border/60 shadow-md bg-background mb-6 overflow-hidden relative group">
      <CardHeader className="pb-4 border-b border-gray-50 bg-muted/50">
        <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
          <span className="bg-primary/10 text-primary p-1.5 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
          </span>
          Order & Business Flow Overview
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 sm:p-8 relative">
        {/* Desktop Horizontal View */}
        <div className="hidden lg:flex items-start justify-between relative">
          {/* Animated Connecting Line */}
          <div className="absolute top-6 left-10 right-10 h-0.5 bg-gray-100 z-0">
            <div className="h-full bg-primary/30 w-full animate-[flowLine_3s_ease-in-out_infinite]" style={{ transformOrigin: 'left' }} />
          </div>

          {steps.map((step, idx) => (
            <div 
              key={step.id} 
              className="relative z-10 flex flex-col items-center text-center w-40 group/card animate-[fadeIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${idx * 150}ms`, opacity: 0 }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-sm border ${step.color} transition-all duration-300 group-hover/card:-translate-y-1.5 group-hover/card:shadow-md bg-background`}>
                <div className={`p-2 rounded-lg ${step.iconBg}`}>
                  {step.icon}
                </div>
              </div>
              <h4 className={`text-sm font-bold mb-1 ${step.textColor}`}>{step.title}</h4>
              <p className="text-[11px] text-muted-foreground leading-tight px-2">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile Vertical View */}
        <div className="flex lg:hidden flex-col gap-6 relative px-4">
          {/* Animated Vertical Connecting Line */}
          <div className="absolute top-4 bottom-4 left-9 w-0.5 bg-gray-100 z-0">
            <div className="w-full bg-primary/30 h-full animate-[flowLineVertical_3s_ease-in-out_infinite]" style={{ transformOrigin: 'top' }} />
          </div>

          {steps.map((step, idx) => (
            <div 
              key={step.id} 
              className="relative z-10 flex items-center gap-4 group/card animate-[fadeInUp_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${idx * 150}ms`, opacity: 0 }}
            >
              <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center shadow-sm border ${step.color} transition-all duration-300 group-hover/card:-translate-y-1 group-hover/card:shadow-md bg-background z-10`}>
                <div className={`p-1.5 rounded-lg ${step.iconBg}`}>
                  {step.icon}
                </div>
              </div>
              <div className="bg-background border border-gray-50 shadow-sm rounded-xl p-3 flex-1 transition-all duration-300 group-hover/card:shadow-md group-hover/card:border-gray-100">
                <h4 className={`text-sm font-bold mb-0.5 ${step.textColor}`}>{step.title}</h4>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </CardContent>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flowLine {
          0% { transform: scaleX(0); opacity: 0; }
          50% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes flowLineVertical {
          0% { transform: scaleY(0); opacity: 0; }
          50% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(1); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </Card>
  );
}
