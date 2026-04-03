import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { budgetItems, savingsGoals } from '@/lib/mock-data';

const monthlyIncome = 5600;
const totalSpent = budgetItems.reduce((s, b) => s + b.spent, 0);
const totalAllocated = budgetItems.reduce((s, b) => s + b.allocated, 0);

const tips = [
  { icon: '🍳', title: 'Meal prep on Sundays', desc: 'Save ~$120/month by cooking at home instead of eating out 3x/week.' },
  { icon: '☕', title: 'Coffee habit audit', desc: 'Your daily $5 coffee adds up to $150/month. Try brewing at home.' },
  { icon: '📱', title: 'Review subscriptions', desc: 'Audit recurring charges — the average person overpays $50/month on unused subscriptions.' },
  { icon: '💰', title: 'Automate savings', desc: 'Set up auto-transfer of $500 on payday to hit your goals faster.' },
];

export default function Budgeting() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Smart Budgeting</h1>
          <p className="text-sm text-muted-foreground mt-1">Track budgets, set goals, and get personalized tips</p>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Monthly Income', value: `$${monthlyIncome.toLocaleString()}`, color: 'text-profit' },
            { label: 'Total Spent', value: `$${totalSpent.toLocaleString()}`, color: 'text-foreground' },
            { label: 'Remaining', value: `$${(monthlyIncome - totalSpent).toLocaleString()}`, color: totalSpent > monthlyIncome ? 'text-loss' : 'text-profit' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5 text-center">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className={`text-2xl font-bold mt-1 ${item.color}`}>{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Budget Items */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <h2 className="font-semibold text-foreground mb-4">Budget Breakdown</h2>
          <div className="space-y-4">
            {budgetItems.map(item => {
              const pct = Math.min(Math.round((item.spent / item.allocated) * 100), 100);
              const overBudget = item.spent > item.allocated;
              return (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{item.category}</span>
                    <span className={`text-xs font-medium ${overBudget ? 'text-loss' : 'text-muted-foreground'}`}>
                      ${item.spent} / ${item.allocated}
                      {overBudget && ` (+$${Math.abs(item.remaining)})`}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${overBudget ? 'bg-loss' : 'bg-primary'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(pct, 100)}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Savings Goals + Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
            <h2 className="font-semibold text-foreground mb-4">Savings Goals</h2>
            <div className="space-y-4">
              {savingsGoals.map(goal => {
                const pct = Math.round((goal.current / goal.target) * 100);
                return (
                  <div key={goal.id} className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{goal.icon} {goal.name}</span>
                      <span className="text-xs text-primary font-medium">{pct}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1 }} />
                    </div>
                    <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                      <span>${goal.current.toLocaleString()} saved</span>
                      <span>Due {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-5">
            <h2 className="font-semibold text-foreground mb-4">💡 Smart Tips</h2>
            <div className="space-y-3">
              {tips.map((tip, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-secondary/50">
                  <span className="text-xl">{tip.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tip.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
