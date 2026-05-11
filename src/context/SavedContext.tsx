import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { LiveInventoryItem } from './InventoryContext';

const STORAGE_KEY = 'red-dirt:saved';

type SavedContextValue = {
    /** Set of item ids that the user has saved */
    ids: Set<string>;
    items: (allInventory: LiveInventoryItem[]) => LiveInventoryItem[];
    isSaved: (id: string | number) => boolean;
    toggle: (item: LiveInventoryItem) => void;
    remove: (id: string | number) => void;
    clear: () => void;
    count: number;
};

const SavedContext = createContext<SavedContextValue>({
    ids: new Set(),
    items: () => [],
    isSaved: () => false,
    toggle: () => {},
    remove: () => {},
    clear: () => {},
    count: 0,
});

const stableId = (item: LiveInventoryItem) => String(item.id);

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ids, setIds] = useState<Set<string>>(() => {
        if (typeof window === 'undefined') return new Set();
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return new Set();
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                return new Set(parsed.map(String));
            }
            return new Set();
        } catch {
            return new Set();
        }
    });

    const persist = useCallback((next: Set<string>) => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
        } catch {
            // ignore quota / privacy mode failures
        }
    }, []);

    const toggle = useCallback(
        (item: LiveInventoryItem) => {
            setIds((prev) => {
                const next = new Set(prev);
                const id = stableId(item);
                if (next.has(id)) next.delete(id);
                else next.add(id);
                persist(next);
                return next;
            });
        },
        [persist],
    );

    const remove = useCallback(
        (id: string | number) => {
            setIds((prev) => {
                const next = new Set(prev);
                next.delete(String(id));
                persist(next);
                return next;
            });
        },
        [persist],
    );

    const clear = useCallback(() => {
        setIds(() => {
            const next = new Set<string>();
            persist(next);
            return next;
        });
    }, [persist]);

    const isSaved = useCallback(
        (id: string | number) => ids.has(String(id)),
        [ids],
    );

    const items = useCallback(
        (allInventory: LiveInventoryItem[]) =>
            allInventory.filter((it) => ids.has(stableId(it))),
        [ids],
    );

    const value = useMemo<SavedContextValue>(
        () => ({
            ids,
            items,
            isSaved,
            toggle,
            remove,
            clear,
            count: ids.size,
        }),
        [ids, items, isSaved, toggle, remove, clear],
    );

    return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
};

export const useSaved = () => useContext(SavedContext);
