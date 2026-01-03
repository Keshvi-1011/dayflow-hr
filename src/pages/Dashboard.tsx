import { motion } from 'framer-motion';
import { Users, Clock, CalendarDays, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { useAuth } from '@/contexts/AuthContext';

const employeeStats = [
  {
    title: 'Days Worked',
    value: '22',
    subtitle: 'This month',
    icon: Clock,
    variant: 'accent' as const,
  },
  {
    title: 'Leave Balance',
    value: '12',
    subtitle: 'Days remaining',
    icon: CalendarDays,
    variant: 'success' as const,
  },
  {
    title: 'Pending Requests',
    value: '1',
    subtitle: 'Awaiting approval',
    icon: AlertCircle,
    variant: 'warning' as const,
  },
];

const adminStats = [
  {
    title: 'Total Employees',
    value: '156',
    icon: Users,
    trend: { value: 12, isPositive: true },
    variant: 'default' as const,
  },
  {
    title: 'Present Today',
    value: '142',
    subtitle: '91% attendance',
    icon: Clock,
    variant: 'accent' as const,
  },
  {
    title: 'Pending Leaves',
    value: '8',
    subtitle: 'Requires action',
    icon: CalendarDays,
    variant: 'warning' as const,
  },
  {
    title: 'Payroll This Month',
    value: '$245K',
    icon: DollarSign,
    trend: { value: 5, isPositive: false },
    variant: 'default' as const,
  },
];

export const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const stats = isAdmin ? adminStats : employeeStats;

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground">
            {greeting}, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAdmin 
              ? "Here's what's happening in your organization today."
              : "Here's your work summary for today."}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className={`grid gap-6 ${isAdmin ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <QuickActions />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />

          {/* Announcements or Team Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {isAdmin ? 'Team Overview' : 'Announcements'}
              </h3>
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            
            {isAdmin ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">Engineering</span>
                  <span className="text-sm font-medium text-accent">45 members</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">Design</span>
                  <span className="text-sm font-medium text-accent">18 members</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">Marketing</span>
                  <span className="text-sm font-medium text-accent">23 members</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">Operations</span>
                  <span className="text-sm font-medium text-accent">70 members</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <p className="text-sm font-medium text-foreground">🎉 Company Holiday</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    New Year holiday on January 1st. Office will be closed.
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium text-foreground">📢 Team Meeting</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Weekly standup at 10:00 AM every Monday.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
