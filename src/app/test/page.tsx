'use client';

import { useState } from 'react';
import { testConnection, addTestData } from '@/lib/supabase';

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTestConnection = async () => {
    setLoading(true);
    const response = await testConnection();
    setResult(response);
    setLoading(false);
  };

  const handleAddTestData = async () => {
    setLoading(true);
    const response = await addTestData();
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Supabase Bağlantı Testi (Test Tablosu)
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div className="flex gap-4">
              <button
                onClick={handleTestConnection}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Test Ediliyor...' : 'Bağlantıyı Test Et'}
              </button>
              
              <button
                onClick={handleAddTestData}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Ekleniyor...' : 'Test Verisi Ekle'}
              </button>
            </div>

            {result && (
              <div className={`p-4 rounded-lg ${
                result.success 
                  ? 'bg-green-100 border border-green-300 text-green-800' 
                  : 'bg-red-100 border border-red-300 text-red-800'
              }`}>
                <h3 className="font-semibold mb-2">
                  {result.success ? '✅ Başarılı!' : '❌ Hata!'}
                </h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 