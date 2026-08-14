import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ACCOUNTS, type Account, type Role } from '../data/mockData';

type Session = Omit<Account, 'password'>;

type AuthContextValue = {
  session: Session | null;
  login: (role: Role, email: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  const login = useCallback<AuthContextValue['login']>((role, email, password) => {
    const normalized = email.trim().toLowerCase();
    if (!normalized || !password) {
      return { ok: false, error: 'Enter both your work email and password.' };
    }
    const match = ACCOUNTS.find(
      (account) =>
        account.role === role &&
        account.email.toLowerCase() === normalized &&
        account.password === password
    );
    if (!match) {
      return { ok: false, error: 'Those credentials do not match a registered account for this portal.' };
    }
    const { password: _password, ...rest } = match;
    setSession(rest);
    return { ok: true };
  }, []);

  const logout = useCallback(() => setSession(null), []);

  const value = useMemo(() => ({ session, login, logout }), [session, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
