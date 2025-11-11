'use client';
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      const result = await authService.getProfile(token);

      if (result.success) {
        setUser(result.data);
        setIsAuthenticated(true);
      } else {
        clearAuth();
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, rememberMe = false) => {
    const result = await authService.login(email, password);

    if (result.success) {
      const { token, user } = result.data;

      // Guardar token
      if (rememberMe) {
        localStorage.setItem('auth-token', token);
      } else {
        sessionStorage.setItem('auth-token', token);
      }

      setUser(user);
      setIsAuthenticated(true);

      // Redirigir según rol
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/shop');
      }

      return { success: true };
    }

    return result;
  };

  const register = async (userData) => {
    return await authService.register(userData);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
      
      // Opcional: llamar endpoint de logout en backend
      if (token) {
        await authService.logout(token);
      }
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      clearAuth();
      router.push('/auth/login');
    }
  };

  const clearAuth = () => {
    localStorage.removeItem('auth-token');
    sessionStorage.removeItem('auth-token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (updatedData) => {
    try {
      const token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
      
      if (!token) return { success: false, error: 'No autenticado' };

      const result = await authService.updateProfile(token, updatedData);

      if (result.success) {
        setUser(prev => ({ ...prev, ...result.data }));
      }

      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};