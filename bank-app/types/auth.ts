export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  // phone: string;
  password: string;
  pincode: string;
  confirmPassword: string;
  dateOfBirth:string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface FormErrors {
  [key: string]: string;
}
export type PasswordStrength = {
  strength: number;
  label: string;
  color: string;
}