import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit2, Save, X } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');

  const handleSave = () => {
    toast({
      title: 'Profile updated',
      description: 'Your changes have been saved successfully.',
    });
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground mt-1">View and manage your personal information</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => setIsEditing(false)} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} variant="accent">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          {/* Cover & Avatar */}
          <div className="h-32 gradient-hero relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-xl bg-card border-4 border-card flex items-center justify-center text-3xl font-bold text-accent shadow-lg">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-muted-foreground">{user?.position}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent">
                  {user?.department}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-accent" />
              Personal Information
            </h3>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Full Name</Label>
                <p className="text-foreground font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </Label>
                <p className="text-foreground font-medium">{user?.email}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone
                </Label>
                {isEditing ? (
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-foreground font-medium">{user?.phone || 'Not provided'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Address
                </Label>
                {isEditing ? (
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                  />
                ) : (
                  <p className="text-foreground font-medium">{user?.address || 'Not provided'}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Job Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-accent" />
              Job Information
            </h3>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Employee ID</Label>
                <p className="text-foreground font-medium">{user?.employeeId}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Department</Label>
                <p className="text-foreground font-medium">{user?.department}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Position</Label>
                <p className="text-foreground font-medium">{user?.position}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Join Date
                </Label>
                <p className="text-foreground font-medium">
                  {user?.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }) : 'Not available'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Salary Structure (Read-only) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Salary Structure</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Basic Salary</p>
              <p className="text-xl font-bold text-foreground mt-1">$5,000</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Allowances</p>
              <p className="text-xl font-bold text-success mt-1">+$800</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Deductions</p>
              <p className="text-xl font-bold text-destructive mt-1">-$500</p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg text-center border border-accent/20">
              <p className="text-sm text-muted-foreground">Net Salary</p>
              <p className="text-xl font-bold text-accent mt-1">$5,300</p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
