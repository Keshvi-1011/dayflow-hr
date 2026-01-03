import { motion } from 'framer-motion';
import { Clock, CalendarCheck, DollarSign, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    type: 'attendance',
    icon: Clock,
    title: 'Checked in at 9:00 AM',
    time: 'Today',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    id: 2,
    type: 'leave',
    icon: CalendarCheck,
    title: 'Leave request approved',
    time: 'Yesterday',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    id: 3,
    type: 'payroll',
    icon: DollarSign,
    title: 'December salary credited',
    time: '2 days ago',
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
  {
    id: 4,
    type: 'profile',
    icon: UserCheck,
    title: 'Profile updated',
    time: '1 week ago',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
];

export const RecentActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className={cn('p-2 rounded-lg', activity.bgColor)}>
              <activity.icon className={cn('h-4 w-4', activity.color)} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
