export interface User {
  id: number;
  name: string;
  email: string;
  // "admin" | "staff" | "student" | "faculty"
  role: string;
  //  "active" | "inactive"
  status: string;
  avatar?: string;
  department: string;
  joinDate: string;
  balance: number;
  password: string;
}
export interface CreateUserInput {
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
  department: string;
  joinDate: string;
  balance: number;
  password: string;
}
