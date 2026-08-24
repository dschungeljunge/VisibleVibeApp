"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type BoardTextContextValue = {
  texts: string[];
  setTexts: (texts: string[]) => void;
};

const BoardTextContext = createContext<BoardTextContextValue>({
  texts: [],
  setTexts: () => undefined,
});

export function BoardTextProvider({ children }: { children: ReactNode }) {
  const [texts, setTextsState] = useState<string[]>([]);

  const setTexts = useCallback((next: string[]) => {
    setTextsState((current) => {
      if (current.length === next.length && current.every((value, index) => value === next[index])) {
        return current;
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ texts, setTexts }), [texts, setTexts]);

  return <BoardTextContext.Provider value={value}>{children}</BoardTextContext.Provider>;
}

export function useBoardTexts() {
  return useContext(BoardTextContext);
}
