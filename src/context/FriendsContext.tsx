import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface FriendList {
  id: string;
  name: string;
  friendIds: string[];
  isDefault?: boolean;
}

interface FriendsContextValue {
  lists: FriendList[];
  addList: (name: string, friendIds: string[]) => FriendList;
  removeList: (id: string) => void;
}

const FriendsContext = createContext<FriendsContextValue | null>(null);

const DEFAULT_LISTS: FriendList[] = [
  {
    id: 'list-default-bff',
    name: 'Najbliżsi znajomi',
    friendIds: ['1', '2', '3'],
    isDefault: true,
  },
];

export const FriendsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<FriendList[]>(DEFAULT_LISTS);

  const addList = useCallback((name: string, friendIds: string[]): FriendList => {
    const newList: FriendList = {
      id: `list-${Date.now()}`,
      name: name.trim() || 'Nowa lista',
      friendIds,
    };
    setLists((prev) => [newList, ...prev]);
    return newList;
  }, []);

  const removeList = useCallback((id: string) => {
    setLists((prev) => prev.filter((l) => l.id !== id || l.isDefault));
  }, []);

  const value = useMemo(() => ({ lists, addList, removeList }), [lists, addList, removeList]);

  return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
};

export const useFriendLists = (): FriendsContextValue => {
  const ctx = useContext(FriendsContext);
  if (!ctx) {
    throw new Error('useFriendLists must be used within a FriendsProvider');
  }
  return ctx;
};
