import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { LeaveRequest, LeaveType, LeaveStatus } from '@/types';

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Michael Chen',
    leaveType: 'paid',
    startDate: '2026-01-10',
    endDate: '2026-01-12',
    reason: 'Family vacation',
    status: 'approved',
    createdAt: '2025-12-28',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Michael Chen',
    leaveType: 'sick',
    startDate: '2025-12-20',
    endDate: '2025-12-20',
    reason: 'Not feeling well',
    status: 'approved',
    createdAt: '2025-12-19',
  },
  {
    id: '3',
    userId: '2',
    userName: 'Michael Chen',
    leaveType: 'paid',
    startDate: '2026-01-20',
    endDate: '2026-01-22',
    reason: 'Personal work',
    status: 'pending',
    createdAt: '2026-01-02',
  },
];

const statusIcons: Record<LeaveStatus, typeof CheckCircle> = {
  pending: AlertCircle,
  approved: CheckCircle,
  rejected: XCircle,
};

const statusColors: Record<LeaveStatus, string> = {
  pending: 'text-warning bg-warning/10',
  approved: 'text-success bg-success/10',
  rejected: 'text-destructive bg-destructive/10',
};

const leaveTypeLabels: Record<LeaveType, string> = {
  paid: 'Paid Leave',
  sick: 'Sick Leave',
  unpaid: 'Unpaid Leave',
};

export const Leave = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state
  const [leaveType, setLeaveType] = useState<LeaveType>('paid');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest: LeaveRequest = {
      id: Date.now().toString(),
      userId: user?.id || '',
      userName: `${user?.firstName} ${user?.lastName}`,
      leaveType,
      startDate,
      endDate,
      reason,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setRequests([newRequest, ...requests]);
    setIsDialogOpen(false);
    setLeaveType('paid');
    setStartDate('');
    setEndDate('');
    setReason('');

    toast({
      title: 'Leave request submitted',
      description: 'Your request has been sent for approval.',
    });
  };

  // Leave balance
  const leaveBalance = {
    paid: 12,
    sick: 8,
    unpaid: 'Unlimited',
  };

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
            <h1 className="text-3xl font-bold text-foreground">Leave Requests</h1>
            <p className="text-muted-foreground mt-1">Manage your time-off requests</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <CalendarPlus className="h-4 w-4 mr-2" />
                Request Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>New Leave Request</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                <div className="space-y-2">
                  <Label>Leave Type</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['paid', 'sick', 'unpaid'] as LeaveType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setLeaveType(type)}
                        className={cn(
                          'p-3 rounded-lg border-2 text-sm font-medium transition-all',
                          leaveType === type
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border text-muted-foreground hover:border-accent/50'
                        )}
                      >
                        {leaveTypeLabels[type]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="Brief description of your leave request..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" variant="hero" className="flex-1">
                    Submit Request
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Leave Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid Leave</p>
                <p className="text-3xl font-bold text-foreground mt-1">{leaveBalance.paid}</p>
                <p className="text-xs text-muted-foreground mt-1">days remaining</p>
              </div>
              <div className="p-3 rounded-lg bg-success/10">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sick Leave</p>
                <p className="text-3xl font-bold text-foreground mt-1">{leaveBalance.sick}</p>
                <p className="text-xs text-muted-foreground mt-1">days remaining</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unpaid Leave</p>
                <p className="text-3xl font-bold text-foreground mt-1">{leaveBalance.unpaid}</p>
                <p className="text-xs text-muted-foreground mt-1">as per policy</p>
              </div>
              <div className="p-3 rounded-lg bg-info/10">
                <AlertCircle className="h-6 w-6 text-info" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Leave Requests List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Request History</h3>
          </div>

          <div className="divide-y divide-border">
            {requests.length === 0 ? (
              <div className="p-12 text-center">
                <CalendarPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No leave requests yet</p>
              </div>
            ) : (
              requests.map((request, index) => {
                const StatusIcon = statusIcons[request.status];
                return (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="p-6 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={cn('p-2 rounded-lg', statusColors[request.status])}>
                          <StatusIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">
                              {leaveTypeLabels[request.leaveType]}
                            </span>
                            <span className={cn(
                              'px-2 py-0.5 rounded text-xs font-medium capitalize',
                              statusColors[request.status]
                            )}>
                              {request.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            {request.startDate !== request.endDate && (
                              <> - {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">{request.reason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          Applied on {new Date(request.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Leave;
