import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, User, Calendar, MessageSquare } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { LeaveRequest, LeaveType, LeaveStatus } from '@/types';

const mockPendingRequests: LeaveRequest[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Michael Chen',
    leaveType: 'paid',
    startDate: '2026-01-20',
    endDate: '2026-01-22',
    reason: 'Family vacation - annual trip to visit parents',
    status: 'pending',
    createdAt: '2026-01-02',
  },
  {
    id: '2',
    userId: '3',
    userName: 'Emily Davis',
    leaveType: 'sick',
    startDate: '2026-01-06',
    endDate: '2026-01-06',
    reason: 'Doctor appointment for routine checkup',
    status: 'pending',
    createdAt: '2026-01-03',
  },
  {
    id: '3',
    userId: '4',
    userName: 'James Wilson',
    leaveType: 'unpaid',
    startDate: '2026-01-15',
    endDate: '2026-01-18',
    reason: 'Personal emergency - need to handle some family matters',
    status: 'pending',
    createdAt: '2026-01-02',
  },
];

const mockProcessedRequests: LeaveRequest[] = [
  {
    id: '4',
    userId: '5',
    userName: 'Lisa Anderson',
    leaveType: 'paid',
    startDate: '2026-01-10',
    endDate: '2026-01-12',
    reason: 'Wedding anniversary celebration',
    status: 'approved',
    adminComment: 'Enjoy your celebration!',
    createdAt: '2025-12-28',
  },
  {
    id: '5',
    userId: '6',
    userName: 'David Brown',
    leaveType: 'sick',
    startDate: '2025-12-27',
    endDate: '2025-12-27',
    reason: 'Flu symptoms',
    status: 'approved',
    createdAt: '2025-12-26',
  },
];

const leaveTypeLabels: Record<LeaveType, string> = {
  paid: 'Paid Leave',
  sick: 'Sick Leave',
  unpaid: 'Unpaid Leave',
};

const leaveTypeColors: Record<LeaveType, string> = {
  paid: 'bg-success/10 text-success',
  sick: 'bg-warning/10 text-warning',
  unpaid: 'bg-info/10 text-info',
};

export const LeaveApprovals = () => {
  const { toast } = useToast();
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);
  const [processedRequests, setProcessedRequests] = useState(mockProcessedRequests);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [comment, setComment] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');

  const openActionDialog = (request: LeaveRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setActionType(action);
    setComment('');
    setIsDialogOpen(true);
  };

  const handleAction = () => {
    if (!selectedRequest) return;

    const updatedRequest: LeaveRequest = {
      ...selectedRequest,
      status: actionType === 'approve' ? 'approved' : 'rejected',
      adminComment: comment || undefined,
    };

    setPendingRequests(prev => prev.filter(r => r.id !== selectedRequest.id));
    setProcessedRequests(prev => [updatedRequest, ...prev]);
    setIsDialogOpen(false);

    toast({
      title: `Leave request ${actionType}d`,
      description: `${selectedRequest.userName}'s request has been ${actionType}d.`,
    });
  };

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">Leave Approvals</h1>
          <p className="text-muted-foreground mt-1">Review and manage employee leave requests</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-3xl font-bold text-warning mt-1">{pendingRequests.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved (This Month)</p>
                <p className="text-3xl font-bold text-success mt-1">
                  {processedRequests.filter(r => r.status === 'approved').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-success/10">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected (This Month)</p>
                <p className="text-3xl font-bold text-destructive mt-1">
                  {processedRequests.filter(r => r.status === 'rejected').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-destructive/10">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pending Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              Pending Requests ({pendingRequests.length})
            </h3>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <p className="text-muted-foreground">All caught up! No pending requests.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {pendingRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="p-6 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {request.userName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-foreground">{request.userName}</h4>
                          <span className={cn(
                            'px-2 py-0.5 rounded text-xs font-medium',
                            leaveTypeColors[request.leaveType]
                          )}>
                            {leaveTypeLabels[request.leaveType]}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            {request.startDate !== request.endDate && (
                              <> - {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</>
                            )}
                          </span>
                          <span className="text-accent font-medium">
                            {calculateDays(request.startDate, request.endDate)} day(s)
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 flex items-start gap-1">
                          <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          {request.reason}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 ml-16 lg:ml-0">
                      <Button
                        variant="outline"
                        onClick={() => openActionDialog(request, 'reject')}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button
                        variant="accent"
                        onClick={() => openActionDialog(request, 'approve')}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Processed Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Recent Decisions</h3>
          </div>

          <div className="divide-y divide-border">
            {processedRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * index }}
                className="p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'p-2 rounded-lg',
                      request.status === 'approved' ? 'bg-success/10' : 'bg-destructive/10'
                    )}>
                      {request.status === 'approved' ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{request.userName}</span>
                        <span className={cn(
                          'px-2 py-0.5 rounded text-xs font-medium capitalize',
                          request.status === 'approved' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                        )}>
                          {request.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {leaveTypeLabels[request.leaveType]} • {calculateDays(request.startDate, request.endDate)} day(s)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Applied {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {actionType === 'approve' ? 'Approve' : 'Reject'} Leave Request
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {selectedRequest && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-medium text-foreground">{selectedRequest.userName}</p>
                  <p className="text-sm text-muted-foreground">
                    {leaveTypeLabels[selectedRequest.leaveType]} • {calculateDays(selectedRequest.startDate, selectedRequest.endDate)} day(s)
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-foreground">
                  Add a comment (optional)
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter a message for the employee..."
                  className="mt-2"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleAction}
                  className="flex-1"
                  variant={actionType === 'approve' ? 'accent' : 'destructive'}
                >
                  {actionType === 'approve' ? 'Approve' : 'Reject'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default LeaveApprovals;
