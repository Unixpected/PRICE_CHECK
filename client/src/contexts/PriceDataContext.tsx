import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface PriceItem {
  cupc: string;
  citem: string;
  mprice: string;
  sku: string;
  cuom: string;
  istdpk: string;
  pos18: string;
}

interface PriceDataContextType {
  items: PriceItem[];
  loading: boolean;
  error: string | null;
  csvUrl: string;
  setCsvUrl: (url: string) => void;
  loadCsvData: (url: string) => Promise<void>;
  searchBySku: (sku: string) => PriceItem | undefined;
  searchByBarcode: (barcode: string) => PriceItem | undefined;
}

const PriceDataContext = createContext<PriceDataContextType | undefined>(undefined);

export function PriceDataProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csvUrl, setCsvUrl] = useState(() => {
    return localStorage.getItem('csvUrl') || '';
  });

  const loadCsvData = async (url: string) => {
    if (!url) {
      setError('Please provide a CSV URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch CSV from GitHub raw content
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.statusText}`);
      }

      const csvText = await response.text();
      const lines = csvText.trim().split('\n');

      if (lines.length < 2) {
        throw new Error('CSV file is empty or invalid');
      }

      // Parse CSV (assuming tab-separated or comma-separated)
      const headers = lines[0].split('\t').map(h => h.trim().toLowerCase());
      const data: PriceItem[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split('\t').map(v => v.trim());
        if (values.length >= headers.length) {
          const item: PriceItem = {
            cupc: values[headers.indexOf('cupc')] || '',
            citem: values[headers.indexOf('citem')] || '',
            mprice: values[headers.indexOf('mprice')] || '',
            sku: values[headers.indexOf('sku')] || '',
            cuom: values[headers.indexOf('cuom')] || '',
            istdpk: values[headers.indexOf('istdpk')] || '',
            pos18: values[headers.indexOf('pos18')] || '',
          };
          data.push(item);
        }
      }

      setItems(data);
      localStorage.setItem('csvUrl', url);
      setCsvUrl(url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-load CSV on mount if URL exists
  useEffect(() => {
    if (csvUrl) {
      loadCsvData(csvUrl);
    }
  }, []);

  const searchBySku = (sku: string): PriceItem | undefined => {
    return items.find(item => item.sku === sku || item.sku.includes(sku));
  };

  const searchByBarcode = (barcode: string): PriceItem | undefined => {
    // Search by SKU (barcode often matches SKU)
    return items.find(item => 
      item.sku === barcode || 
      item.sku.includes(barcode) ||
      item.cupc === barcode
    );
  };

  return (
    <PriceDataContext.Provider
      value={{
        items,
        loading,
        error,
        csvUrl,
        setCsvUrl,
        loadCsvData,
        searchBySku,
        searchByBarcode,
      }}
    >
      {children}
    </PriceDataContext.Provider>
  );
}

export function usePriceData() {
  const context = useContext(PriceDataContext);
  if (!context) {
    throw new Error('usePriceData must be used within PriceDataProvider');
  }
  return context;
}
