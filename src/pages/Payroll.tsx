import { motion } from 'framer-motion';
import { DollarSign, Download, TrendingUp, Calendar } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const payrollHistory = [
  { month: 'December 2025', basic: 5000, allowances: 800, deductions: 500, net: 5300, status: 'paid' },
  { month: 'November 2025', basic: 5000, allowances: 800, deductions: 500, net: 5300, status: 'paid' },
  { month: 'October 2025', basic: 5000, allowances: 750, deductions: 500, net: 5250, status: 'paid' },
  { month: 'September 2025', basic: 5000, allowances: 750, deductions: 500, net: 5250, status: 'paid' },
  { month: 'August 2025', basic: 4800, allowances: 700, deductions: 480, net: 5020, status: 'paid' },
  { month: 'July 2025', basic: 4800, allowances: 700, deductions: 480, net: 5020, status: 'paid' },
];

export const Payroll = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Current month salary
  const currentSalary = {
    basic: 5000,
    allowances: 800,
    deductions: 500,
    net: 5300,
  };

  // YTD stats
  const ytdStats = {
    totalEarnings: 63400,
    totalDeductions: 6000,
    netPaid: 57400,
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">Payroll</h1>
          <p className="text-muted-foreground mt-1">
            {isAdmin ? 'Manage employee payroll and salary structures' : 'View your salary details and payment history'}
          </p>
        </motion.div>

        {/* Current Month Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="gradient-hero p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/70 text-sm">Current Month Salary</p>
                <p className="text-4xl font-bold text-primary-foreground mt-2">
                  ${currentSalary.net.toLocaleString()}
                </p>
                <p className="text-primary-foreground/60 text-sm mt-1">Net Pay for January 2026</p>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center shadow-lg">
                  <DollarSign className="h-10 w-10 text-accent-foreground" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Basic Salary</p>
              <p className="text-xl font-semibold text-foreground">${currentSalary.basic.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Allowances</p>
              <p className="text-xl font-semibold text-success">+${currentSalary.allowances.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Deductions</p>
              <p className="text-xl font-semibold text-destructive">-${currentSalary.deductions.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net Salary</p>
              <p className="text-xl font-semibold text-accent">${currentSalary.net.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        {/* YTD Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">YTD Earnings</p>
                <p className="text-2xl font-bold text-foreground mt-1">${ytdStats.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-success/10">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">YTD Deductions</p>
                <p className="text-2xl font-bold text-foreground mt-1">${ytdStats.totalDeductions.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-destructive/10">
                <DollarSign className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">YTD Net Paid</p>
                <p className="text-2xl font-bold text-accent mt-1">${ytdStats.netPaid.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Payment History</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Month</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Basic</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Allowances</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Deductions</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Net Pay</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {payrollHistory.map((record, index) => (
                  <motion.tr
                    key={record.month}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * index }}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm font-medium text-foreground">{record.month}</td>
                    <td className="py-4 px-6 text-sm text-foreground text-right">${record.basic.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-success text-right">+${record.allowances.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-destructive text-right">-${record.deductions.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-foreground text-right">${record.net.toLocaleString()}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={cn(
                        'px-2 py-1 rounded text-xs font-medium capitalize',
                        record.status === 'paid' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      )}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Slip
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Payroll;
