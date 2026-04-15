export type Role = "admin" | "staff" | "student" | "faculty";
export type Status = "active" | "inactive";
export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
  avatar?: string;
  department: string;
  joinDate: string;
  balance: number;
  password: string;
}
export interface CreateUserInput {
  name: string;
  email: string;
  role: Role;
  status: Status;
  avatar: string;
  department: string;
  joinDate: string;
  balance: number;
  password: string;
}
