import { create } from 'zustand';

type UserRole = 'senior' | 'company' | null;

interface User {
  email: string;
  role: UserRole;
}

interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: () => boolean;
}

// 데모 계정 정보
const DEMO_ACCOUNTS = {
  'senior@demo.com': { password: 'password123', role: 'senior' as const },
  'company@demo.com': { password: 'password123', role: 'company' as const },
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  
  login: (email: string, password: string) => {
    const account = DEMO_ACCOUNTS[email as keyof typeof DEMO_ACCOUNTS];
    
    if (account && account.password === password) {
      set({ user: { email, role: account.role } });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ user: null });
  },
  
  isAuthenticated: () => {
    return get().user !== null;
  },
}));
