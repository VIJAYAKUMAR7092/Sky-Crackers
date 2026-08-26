"use client";

import React, { useState, useEffect } from "react";
import { Upload, FileText, Loader2, Save, Trash2, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/admin/layout/PageHeader";

export default function PriceListPage() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [priceListUrl, setPriceListUrl] = useState<string | null>(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/cms/website-settings');
      const data = await res.json();
      if (data.success && data.data) {
        setPriceListUrl(data.data.priceListUrl || null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage({ text: "Please upload a PDF file.", type: "error" });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      setMessage({ text: "File size should be less than 10MB.", type: "error" });
      return;
    }

    setUploading(true);
    setMessage({ text: "", type: "" });
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setPriceListUrl(data.data.url);
        setMessage({ text: "PDF uploaded successfully! Click save to update.", type: "success" });
      } else {
        const errMsg = typeof data.error === 'object' ? data.error.message : data.error;
        setMessage({ text: errMsg || "Failed to upload file", type: "error" });
      }
    } catch (err: any) {
      const errMsg = typeof err === 'object' ? err.message : err;
      setMessage({ text: errMsg || "An error occurred", type: "error" });
    } finally {
      setUploading(false);
      if (e.target) e.target.value = ''; // reset input
    }
  };

  const handleSave = async () => {
    setUploading(true);
    try {
      const res = await fetch('/api/admin/cms/website-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceListUrl })
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Price List saved successfully and is now visible on the website.", type: "success" });
      } else {
        const errMsg = typeof data.error === 'object' ? data.error.message : data.error;
        setMessage({ text: errMsg || "Failed to save settings", type: "error" });
      }
    } catch (err: any) {
      const errMsg = typeof err === 'object' ? err.message : err;
      setMessage({ text: errMsg || "An error occurred", type: "error" });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    setPriceListUrl(null);
    setMessage({ text: "Price List removed. Click save to apply changes.", type: "success" });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Price List Management" 
        description="Upload your latest Price List PDF to allow customers to download it from the home page."
      />

      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 max-w-3xl">
        
        {message.text && (
          <div className={`p-4 rounded-lg mb-6 flex items-start gap-3 ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>
            <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        <div className="space-y-6">
          
          <div>
            <h3 className="text-base font-semibold text-slate-800 mb-2">Current Price List</h3>
            {loading ? (
              <div className="h-20 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl">
                <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
              </div>
            ) : priceListUrl ? (
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-lg text-red-600">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">Price_List.pdf</p>
                    <a href={priceListUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                      View Document
                    </a>
                  </div>
                </div>
                <button 
                  onClick={handleRemove}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove Price List"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 text-sm text-slate-500 text-center">
                No Price List uploaded yet.
              </div>
            )}
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-800 mb-2">Upload New PDF</h3>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors relative">
              <input 
                type="file" 
                accept="application/pdf" 
                onChange={handleFileUpload}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="p-4 bg-slate-100 rounded-full text-slate-500">
                  {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Click or drag PDF to upload</p>
                  <p className="text-xs text-slate-500 mt-1">Maximum file size 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSave}
              disabled={uploading || loading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
