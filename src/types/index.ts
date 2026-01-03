export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  email: string;
  employeeId: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  phone: string;
  address: string;
  joinDate: string;
  profilePicture?: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'half-day' | 'leave';

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  hoursWorked?: number;
}

export type LeaveType = 'paid' | 'sick' | 'unpaid';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  adminComment?: string;
  createdAt: string;
}

export interface SalaryStructure {
  basic: number;
  allowances: number;
  deductions: number;
  netSalary: number;
}

export interface PayrollRecord {
  id: string;
  userId: string;
  month: string;
  year: number;
  salary: SalaryStructure;
  paymentDate?: string;
  status: 'pending' | 'paid';
}
