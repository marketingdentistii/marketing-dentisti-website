"use client";
import React, { useState } from 'react';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    nomeStudio: '',
    privacy: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Errore di invio, riprova.");
      }
      window.location.href = "/grazie";
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore di invio, riprova.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-slate-700 mb-1">Nome *</label>
        <input type="text" id="nome" name="nome" required value={formData.nome} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
      </div>
      <div>
        <label htmlFor="nomeStudio" className="block text-sm font-medium text-slate-700 mb-1">Nome studio (facoltativo)</label>
        <input type="text" id="nomeStudio" name="nomeStudio" value={formData.nomeStudio} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
      </div>
      <div className="flex items-start">
        <input type="checkbox" id="privacy" name="privacy" required checked={formData.privacy} onChange={handleChange} className="mt-1 h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500" />
        <label htmlFor="privacy" className="ml-2 block text-sm text-slate-600">Accetto la Privacy Policy *</label>
      </div>
      <button type="submit" disabled={loading} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200">
        {loading ? "Invio in corso..." : "Inviami il Kit Gratis"}
      </button>
      {error && <p className="text-sm text-rose-600 mt-2">{error}</p>}
    </form>
  );
}
