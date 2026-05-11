import React, { createContext, useContext, useState, useEffect } from 'react';
import { FALLBACK_INVENTORY, type TractorItem } from '../data/inventory';

// We extend the base item to support dynamic properties from Google Sheets
export interface LiveInventoryItem extends TractorItem {
    [key: string]: any; 
}

interface InventoryContextType {
    inventory: LiveInventoryItem[];
    loading: boolean;
    error: string | null;
    isFallbackInventory: boolean;
}

const InventoryContext = createContext<InventoryContextType>({
    inventory: FALLBACK_INVENTORY as LiveInventoryItem[],
    loading: true,
    error: null,
    isFallbackInventory: true,
});

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [inventory, setInventory] = useState<LiveInventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFallbackInventory, setIsFallbackInventory] = useState(false);

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
                    setIsFallbackInventory(false);
                } else {
                    throw new Error('Google Sheet returned empty data format');
                }
                
                setLoading(false);
            } catch (err: any) {
                console.error("Failed to fetch live Google Sheets data.", err);
                setError(err.message);
                setInventory(FALLBACK_INVENTORY as LiveInventoryItem[]);
                setIsFallbackInventory(true);
                setLoading(false);
            }
        };

        fetchLiveInventory();
    }, []);

    return (
        <InventoryContext.Provider value={{ inventory, loading, error, isFallbackInventory }}>
            {children}
        </InventoryContext.Provider>
    );
};

export const useInventory = () => useContext(InventoryContext);
