import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Clock, Calendar, DollarSign, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Users, title: 'Employee Management', description: 'Complete employee profiles and document management' },
  { icon: Clock, title: 'Attendance Tracking', description: 'Real-time check-in/out with detailed reports' },
  { icon: Calendar, title: 'Leave Management', description: 'Streamlined leave requests and approvals' },
  { icon: DollarSign, title: 'Payroll Visibility', description: 'Transparent salary and payment tracking' },
  { icon: Shield, title: 'Role-Based Access', description: 'Secure admin and employee permissions' },
  { icon: Zap, title: 'Instant Approvals', description: 'Quick workflow for HR decisions' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold">D</span>
            </div>
            <span className="font-semibold text-lg text-foreground">Dayflow</span>
          </div>
          <Link to="/auth">
            <Button variant="hero">
              Get Started <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              Human Resource Management System
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Every workday,<br />
              <span className="text-accent">perfectly aligned.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamline HR operations with our comprehensive platform. From attendance to payroll, 
              manage your workforce efficiently and effectively.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button variant="hero" size="lg">
                  Start Free Trial <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">Everything you need to manage HR</h2>
            <p className="mt-4 text-muted-foreground">Powerful features to streamline your human resource operations</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-xl border border-border hover:border-accent/30 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground text-lg">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="gradient-hero rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground">Ready to transform your HR?</h2>
            <p className="mt-4 text-primary-foreground/80">Join hundreds of companies already using Dayflow</p>
            <Link to="/auth" className="mt-8 inline-block">
              <Button variant="hero" size="lg" className="bg-accent">
                Get Started Now <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2026 Dayflow. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
