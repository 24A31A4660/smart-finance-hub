import { DollarSign, TrendingUp, Shield, CreditCard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Layout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import TransactionRow from '@/components/TransactionRow';
import RiskGauge from '@/components/RiskGauge';
import { userProfile, transactions, monthlyData, spendingCategories, alerts, savingsGoals } from '@/lib/mock-data';

export default function Dashboard() {
  const recentTransactions = transactions.slice(0, 5);
  const unreadAlerts = alerts.filter(a => !a.read);
  const overallRisk = 12; // Simulated overall account risk

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good morning, {userProfile.name.split(' ')[0]} 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">Here's your financial overview for today</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Balance" value={`$${userProfile.balance.toLocaleString()}`} change="+2.4% from last month" changeType="positive" icon={DollarSign} delay={0} />
          <StatCard title="Monthly Income" value="$5,600" change="+3.7% vs avg" changeType="positive" icon={TrendingUp} delay={0.1} />
          <StatCard title="Monthly Expenses" value="$3,630" change="+6.2% vs avg" changeType="negative" icon={CreditCard} delay={0.2} />
          <StatCard title="Credit Score" value={userProfile.creditScore.toString()} change="+5 points" changeType="positive" icon={Shield} delay={0.3} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Income vs Expenses Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Income vs Expenses</h2>
              <span className="text-xs text-muted-foreground">Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(165,80%,44%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(165,80%,44%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(210,100%,56%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(210,100%,56%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,12%,50%)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,12%,50%)', fontSize: 12 }} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,10%)', border: '1px solid hsl(220,14%,20%)', borderRadius: 8, color: 'hsl(210,20%,92%)' }} />
                <Area type="monotone" dataKey="income" stroke="hsl(165,80%,44%)" fill="url(#incomeGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" stroke="hsl(210,100%,56%)" fill="url(#expenseGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Spending Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-5">
            <h2 className="font-semibold text-foreground mb-4">Spending Breakdown</h2>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={spendingCategories} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="amount" paddingAngle={3}>
                  {spendingCategories.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {spendingCategories.slice(0, 4).map(cat => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-muted-foreground">{cat.name}</span>
                  </div>
                  <span className="text-foreground font-medium">${cat.amount}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Transactions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="lg:col-span-2 glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-foreground">Recent Transactions</h2>
              <Link to="/transactions" className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-1">
              {recentTransactions.map((t, i) => (
                <TransactionRow key={t.id} transaction={t} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Security & Alerts */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-5">
              <h2 className="font-semibold text-foreground mb-4">Account Security</h2>
              <div className="flex justify-center">
                <RiskGauge score={overallRisk} level="LOW" />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">Your account is secure. No anomalies detected.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="glass-card p-5">
              <h2 className="font-semibold text-foreground mb-3">Alerts</h2>
              <div className="space-y-2">
                {unreadAlerts.slice(0, 3).map(alert => (
                  <div key={alert.id} className={`p-2.5 rounded-lg border text-xs ${
                    alert.severity === 'high' ? 'bg-loss/5 border-loss/20 text-loss' :
                    alert.severity === 'medium' ? 'bg-risk-medium/5 border-risk-medium/20 text-risk-medium' :
                    'bg-primary/5 border-primary/20 text-primary'
                  }`}>
                    <p className="font-medium">{alert.title}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Savings Goals */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="glass-card p-5">
          <h2 className="font-semibold text-foreground mb-4">Savings Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {savingsGoals.map(goal => {
              const pct = Math.round((goal.current / goal.target) * 100);
              return (
                <div key={goal.id} className="bg-secondary/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{goal.icon}</span>
                    <span className="text-sm font-medium text-foreground">{goal.name}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>${goal.current.toLocaleString()}</span>
                    <span>${goal.target.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{pct}% complete</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
