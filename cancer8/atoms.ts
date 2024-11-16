import { atom } from 'recoil';

// Define the type for the auth state
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

// Define the type for user details
interface UserDetails {
  id: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  userType: string;
  gender: string,
}

// Auth state atom
export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isAuthenticated: false,
    token: null,
  },
});

// User details state atom
export const userDetailsState = atom<UserDetails>({
  key: 'userDetailsState',
  default: {
    id: '',
    username: '',
    email: '',
    address: '',
    phone: '',
    userType: 'n/p',
    gender:'',
  },
});
