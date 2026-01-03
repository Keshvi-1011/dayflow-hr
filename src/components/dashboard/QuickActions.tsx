import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, CalendarPlus, FileText, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const employeeActions = [
  {
    icon: Clock,
    title: 'Check In',
    description: 'Mark your attendance',
    path: '/attendance',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: CalendarPlus,
    title: 'Request Leave',
    description: 'Apply for time off',
    path: '/leave',
    color: 'bg-info/10 text-info',
  },
  {
    icon: FileText,
    title: 'View Payslip',
    description: 'Check salary details',
    path: '/payroll',
    color: 'bg-success/10 text-success',
  },
];

const adminActions = [
  {
    icon: Users,
    title: 'Manage Employees',
    description: 'View & edit profiles',
    path: '/employees',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: CalendarPlus,
    title: 'Leave Approvals',
    description: 'Review pending requests',
    path: '/leave-approvals',
    color: 'bg-warning/10 text-warning',
  },
  {
    icon: FileText,
    title: 'Reports',
    description: 'Analytics & reports',
    path: '/reports',
    color: 'bg-accent/10 text-accent',
  },
];

export const QuickActions = () => {
  const { user } = useAuth();
  const actions = user?.role === 'admin' ? adminActions : employeeActions;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <motion.div
          key={action.path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Link
            to={action.path}
            className="block p-5 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${action.color}`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
