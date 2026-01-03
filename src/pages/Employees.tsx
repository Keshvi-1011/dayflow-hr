import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Mail, Phone, Building, MoreVertical } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const mockEmployees = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@dayflow.com',
    phone: '+1 555-0101',
    department: 'Human Resources',
    position: 'HR Manager',
    status: 'active',
    avatar: 'SJ',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@dayflow.com',
    phone: '+1 555-0102',
    department: 'Engineering',
    position: 'Software Developer',
    status: 'active',
    avatar: 'MC',
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily@dayflow.com',
    phone: '+1 555-0103',
    department: 'Design',
    position: 'UI/UX Designer',
    status: 'active',
    avatar: 'ED',
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james@dayflow.com',
    phone: '+1 555-0104',
    department: 'Marketing',
    position: 'Marketing Lead',
    status: 'on-leave',
    avatar: 'JW',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa@dayflow.com',
    phone: '+1 555-0105',
    department: 'Engineering',
    position: 'Senior Developer',
    status: 'active',
    avatar: 'LA',
  },
  {
    id: '6',
    name: 'David Brown',
    email: 'david@dayflow.com',
    phone: '+1 555-0106',
    department: 'Operations',
    position: 'Operations Manager',
    status: 'active',
    avatar: 'DB',
  },
];

const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Human Resources', 'Operations'];

export const Employees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredEmployees = mockEmployees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Employees</h1>
            <p className="text-muted-foreground mt-1">Manage your team members</p>
          </div>
          <Button variant="hero">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  selectedDepartment === dept
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                )}
              >
                {dept}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-card rounded-xl border border-border p-5"
          >
            <p className="text-sm text-muted-foreground">Total Employees</p>
            <p className="text-2xl font-bold text-foreground mt-1">{mockEmployees.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border p-5"
          >
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-success mt-1">
              {mockEmployees.filter(e => e.status === 'active').length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-card rounded-xl border border-border p-5"
          >
            <p className="text-sm text-muted-foreground">On Leave</p>
            <p className="text-2xl font-bold text-warning mt-1">
              {mockEmployees.filter(e => e.status === 'on-leave').length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl border border-border p-5"
          >
            <p className="text-sm text-muted-foreground">Departments</p>
            <p className="text-2xl font-bold text-foreground mt-1">{departments.length - 1}</p>
          </motion.div>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-md hover:border-accent/30 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center text-accent-foreground font-semibold">
                    {employee.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem>View Attendance</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {employee.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building className="h-4 w-4" />
                  {employee.department}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className={cn(
                  'px-2 py-1 rounded text-xs font-medium capitalize',
                  employee.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                )}>
                  {employee.status}
                </span>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No employees found matching your criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Employees;
