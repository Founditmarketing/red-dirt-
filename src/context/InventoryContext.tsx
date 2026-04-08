import React, { createContext, useContext, useState, useEffect } from 'react';
import { inventoryData as fallbackData, type TractorItem } from '../data/inventory';

// We extend the base item to support dynamic properties from Google Sheets
export interface LiveInventoryItem extends TractorItem {
    [key: string]: any; 
}

interface InventoryContextType {
    inventory: LiveInventoryItem[];
    loading: boolean;
    error: string | null;
}

const InventoryContext = createContext<InventoryContextType>({
    inventory: fallbackData as LiveInventoryItem[], // Initial state uses fallback temporarily
    loading: true,
    error: null,
});

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [inventory, setInventory] = useState<LiveInventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLiveInventory = async () => {
            try {
                const res = await fetch('/api/inventory');
                
                // If API is unreachable (e.g. running locally without Vercel backend proxy), use fallback
                if (!res.ok) {
                    throw new Error(`Server returned ${res.status}: ${res.statusText}`);
                }
                
                const data = await res.json();
                
                if (data.error) {
                    throw new Error(data.error);
                }

                if (Array.isArray(data) && data.length > 0) {
                    setInventory(data as LiveInventoryItem[]);
                } else {
                    throw new Error('Google Sheet returned empty data format');
                }
                
                setLoading(false);
            } catch (err: any) {
                console.warn("Failed to fetch live Google Sheets data. Falling back to static data.", err);
                setError(err.message);
                setInventory(fallbackData as LiveInventoryItem[]);
                setLoading(false);
            }
        };

        fetchLiveInventory();
    }, []);

    return (
        <InventoryContext.Provider value={{ inventory, loading, error }}>
            {children}
        </InventoryContext.Provider>
    );
};

export const useInventory = () => useContext(InventoryContext);
