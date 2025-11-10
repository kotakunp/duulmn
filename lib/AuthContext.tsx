import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { login as loginAPI, signup as signupAPI, fetchProfile, logout as logoutAPI } from '../utils/api';

interface User {
  _id: string;
  email: string;
  username: string;
  profileImage?: string;
  role: 'user' | 'admin' | 'artist';
  isPremium: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

interface LoginAction {
  type: 'LOGIN_START' | 'LOGIN_SUCCESS' | 'LOGIN_FAILURE';
  payload?: { user: User; token: string } | string;
}

interface SignupAction {
  type: 'SIGNUP_START' | 'SIGNUP_SUCCESS' | 'SIGNUP_FAILURE';
  payload?: { user: User; token: string } | string;
}

interface LogoutAction {
  type: 'LOGOUT';
}

interface SetErrorAction {
  type: 'SET_ERROR';
  payload: string;
}

interface ClearErrorAction {
  type: 'CLEAR_ERROR';
}

interface SetLoadingAction {
  type: 'SET_LOADING';
  payload: boolean;
}

type AuthAction = 
  | LoginAction 
  | SignupAction 
  | LogoutAction 
  | SetErrorAction 
  | ClearErrorAction
  | SetLoadingAction;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'SIGNUP_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
      
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      if (action.payload && typeof action.payload === 'object') {
        const { user, token } = action.payload;
        // Store token in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
        }
        return {
          ...state,
          user,
          token,
          loading: false,
          error: null,
        };
      }
      return state;
      
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload as string || 'Operation failed',
      };
      
    case 'LOGOUT':
      // Remove token from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      };
      
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
      
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
      
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
      
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  loading: false,
  error: null,
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token and user on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        try {
          dispatch({ type: 'SET_LOADING', payload: true });
          const response = await fetchProfile();
          dispatch({ 
            type: 'LOGIN_SUCCESS', 
            payload: { user: response.data, token } 
          });
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
          }
          dispatch({ type: 'LOGOUT' });
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const response = await loginAPI({ email, password });
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { 
          user: response.data, 
          token: response.token 
        } 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: errorMessage 
      });
      throw error;
    }
  };

  const signup = async (email: string, username: string, password: string) => {
    try {
      dispatch({ type: 'SIGNUP_START' });
      const response = await signupAPI({ email, username, password });
      
      dispatch({ 
        type: 'SIGNUP_SUCCESS', 
        payload: { 
          user: response.data, 
          token: response.token 
        } 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      dispatch({ 
        type: 'SIGNUP_FAILURE', 
        payload: errorMessage 
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Even if API call fails, we should still clear local state
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      dispatch({ type: 'LOGOUT' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    state,
    login,
    signup,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};