import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, LogIn, LogOut, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AttendanceStatus } from '@/types';

interface DayAttendance {
  date: number;
  status: AttendanceStatus | null;
  checkIn?: string;
  checkOut?: string;
}

// Generate mock attendance data for the current month
const generateMonthData = (): DayAttendance[] => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  
  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = i + 1;
    const dayOfWeek = new Date(today.getFullYear(), today.getMonth(), date).getDay();
    
    // Weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return { date, status: null };
    }
    
    // Future days
    if (date > today.getDate()) {
      return { date, status: null };
    }
    
    // Random status for past days
    const statuses: AttendanceStatus[] = ['present', 'present', 'present', 'present', 'half-day', 'leave'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      date,
      status: randomStatus,
      checkIn: randomStatus !== 'leave' ? '09:00 AM' : undefined,
      checkOut: randomStatus === 'present' ? '06:00 PM' : randomStatus === 'half-day' ? '01:00 PM' : undefined,
    };
  });
};

const statusColors: Record<AttendanceStatus, { bg: string; text: string }> = {
  present: { bg: 'bg-success/10', text: 'text-success' },
  absent: { bg: 'bg-destructive/10', text: 'text-destructive' },
  'half-day': { bg: 'bg-warning/10', text: 'text-warning' },
  leave: { bg: 'bg-info/10', text: 'text-info' },
};

export const Attendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [monthData] = useState<DayAttendance[]>(generateMonthData());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const today = new Date();
  const monthName = today.toLocaleString('default', { month: 'long', year: 'numeric' });

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setIsCheckedIn(true);
    setCheckInTime(now);
    toast({
      title: 'Checked in successfully!',
      description: `You checked in at ${now}`,
    });
  };

  const handleCheckOut = () => {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setIsCheckedIn(false);
    toast({
      title: 'Checked out successfully!',
      description: `You checked out at ${now}`,
    });
  };

  // Calculate stats
  const presentDays = monthData.filter(d => d.status === 'present').length;
  const halfDays = monthData.filter(d => d.status === 'half-day').length;
  const leaveDays = monthData.filter(d => d.status === 'leave').length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground mt-1">Track your daily attendance and work hours</p>
        </motion.div>

        {/* Check In/Out Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Clock className="h-8 w-8 text-accent" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </h2>
                  <p className="text-muted-foreground">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              {checkInTime && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Checked in at <span className="text-accent font-medium">{checkInTime}</span>
                </p>
              )}
            </div>

            <div className="flex gap-4">
              {!isCheckedIn ? (
                <Button onClick={handleCheckIn} variant="hero" size="lg">
                  <LogIn className="h-5 w-5 mr-2" />
                  Check In
                </Button>
              ) : (
                <Button onClick={handleCheckOut} variant="destructive" size="lg">
                  <LogOut className="h-5 w-5 mr-2" />
                  Check Out
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border p-5"
          >
            <p className="text-sm text-muted-foreground">Present Days</p>
            <p className="text-2xl font-bold text-success mt-1">{presentDays}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-card rounded-xl border border-border p-5"
          >
            <p className="text-sm text-muted-foreground">Half Days</p>
            <p className="text-2xl font-bold text-warning mt-1">{halfDays}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl border border-border p-5"
          >
            <p className="text-sm text-muted-foreground">Leaves Taken</p>
            <p className="text-2xl font-bold text-info mt-1">{leaveDays}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-card rounded-xl border border-border p-5"
          >
            <p className="text-sm text-muted-foreground">Working Days</p>
            <p className="text-2xl font-bold text-foreground mt-1">{today.getDate()}</p>
          </motion.div>
        </div>

        {/* Calendar View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              {monthName}
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before the 1st */}
            {Array.from({ length: new Date(today.getFullYear(), today.getMonth(), 1).getDay() }, (_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {/* Days of the month */}
            {monthData.map((day) => (
              <div
                key={day.date}
                className={cn(
                  'aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all',
                  day.date === today.getDate()
                    ? 'ring-2 ring-accent'
                    : '',
                  day.status ? statusColors[day.status].bg : 'bg-muted/30'
                )}
              >
                <span className={cn(
                  'font-medium',
                  day.status ? statusColors[day.status].text : 'text-muted-foreground'
                )}>
                  {day.date}
                </span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-success/30" />
              <span className="text-xs text-muted-foreground">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-warning/30" />
              <span className="text-xs text-muted-foreground">Half Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-info/30" />
              <span className="text-xs text-muted-foreground">Leave</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-destructive/30" />
              <span className="text-xs text-muted-foreground">Absent</span>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
