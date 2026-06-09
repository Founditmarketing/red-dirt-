import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { LiveInventoryItem } from './InventoryContext';

const MAX_COMPARE = 3;
const STORAGE_KEY = 'red-dirt:compare';

type CompareContextValue = {
    items: LiveInventoryItem[];
    ids: Set<string>;
    canAdd: boolean;
    toggle: (item: LiveInventoryItem) => void;
    remove: (id: string | number) => void;
    clear: () => void;
};

const CompareContext = createContext<CompareContextValue>({
    items: [],
    ids: new Set(),
    canAdd: true,
    toggle: () => {},
    remove: () => {},
    clear: () => {},
});

const stableId = (item: LiveInventoryItem) => String(item.id);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<LiveInventoryItem[]>(() => {
        if (typeof window === 'undefined') return [];
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed.slice(0, MAX_COMPARE) : [];
        } catch {
            return [];
        }
    });

    const persist = useCallback((next: LiveInventoryItem[]) => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
            // ignore
        }
    }, []);

    const toggle = useCallback(
        (item: LiveInventoryItem) => {
            setItems((prev) => {
                const id = stableId(item);
                const exists = prev.some((p) => stableId(p) === id);
                let next: LiveInventoryItem[];
                if (exists) {
                    next = prev.filter((p) => stableId(p) !== id);
                } else if (prev.length < MAX_COMPARE) {
                    next = [...prev, item];
                } else {
                    next = prev;
                }
                persist(next);
                return next;
            });
        },
        [persist],
    );

    const remove = useCallback(
        (id: string | number) => {
            setItems((prev) => {
                const next = prev.filter((p) => stableId(p) !== String(id));
                persist(next);
                return next;
            });
        },
        [persist],
    );

    const clear = useCallback(() => {
        setItems([]);
        persist([]);
    }, [persist]);

    const value = useMemo<CompareContextValue>(() => {
        const ids = new Set(items.map(stableId));
        return {
            items,
            ids,
            canAdd: items.length < MAX_COMPARE,
            toggle,
            remove,
            clear,
        };
    }, [items, toggle, remove, clear]);

    return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
};

export const useCompare = () => useContext(CompareContext);
