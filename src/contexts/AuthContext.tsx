import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
}

interface SignupData {
  email: string;
  password: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@dayflow.com',
    employeeId: 'EMP001',
    role: 'admin',
    firstName: 'Sarah',
    lastName: 'Johnson',
    department: 'Human Resources',
    position: 'HR Manager',
    phone: '+1 555-0101',
    address: '123 Corporate Ave, Suite 100',
    joinDate: '2022-01-15',
    profilePicture: undefined,
  },
  {
    id: '2',
    email: 'employee@dayflow.com',
    employeeId: 'EMP002',
    role: 'employee',
    firstName: 'Michael',
    lastName: 'Chen',
    department: 'Engineering',
    position: 'Software Developer',
    phone: '+1 555-0102',
    address: '456 Tech Park, Building B',
    joinDate: '2023-03-20',
    profilePicture: undefined,
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password.length >= 6) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      employeeId: data.employeeId,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      department: 'Not Assigned',
      position: 'New Employee',
      phone: '',
      address: '',
      joinDate: new Date().toISOString().split('T')[0],
    };
    
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
