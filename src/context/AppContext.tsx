import React, { createContext, useContext, useState } from 'react';
import { COMPANIES } from '../data/mock';

type Ctx = { company: string; setCompany: (c: string) => void };
const AppContext = createContext<Ctx>({ company: COMPANIES[0], setCompany: () => {} });

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [company, setCompany] = useState(COMPANIES[0]);
  return <AppContext.Provider value={{ company, setCompany }}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
