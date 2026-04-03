import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import Layout from '@/components/Layout';
import { monthlyData, spendingCategories } from '@/lib/mock-data';

const weeklySpending = [
  { day: 'Mon', amount: 45 }, { day: 'Tue', amount: 120 }, { day: 'Wed', amount: 30 },
  { day: 'Thu', amount: 85 }, { day: 'Fri', amount: 200 }, { day: 'Sat', amount: 150 }, { day: 'Sun', amount: 60 },
];

const behaviorData = [
  { trait: 'Consistency', value: 85 }, { trait: 'Budgeting', value: 70 }, { trait: 'Saving', value: 78 },
  { trait: 'Spending Control', value: 62 }, { trait: 'Investment', value: 55 }, { trait: 'Planning', value: 72 },
];

const tooltipStyle = { backgroundColor: 'hsl(220,18%,10%)', border: '1px solid hsl(220,14%,20%)', borderRadius: 8, color: 'hsl(210,20%,92%)' };

export default function Analytics() {
  const savingsRate = monthlyData.map(m => ({ month: m.month, rate: Math.round((m.savings / m.income) * 100) }));

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Financial Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Deep insights into your financial behavior</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Monthly Comparison */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
            <h2 className="font-semibold text-foreground mb-4">Monthly Comparison</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,12%,50%)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,12%,50%)', fontSize: 12 }} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="income" fill="hsl(165,80%,44%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="hsl(210,100%,56%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Savings Rate */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h2 className="font-semibold text-foreground mb-4">Savings Rate Trend</h2>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={savingsRate}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,12%,50%)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,12%,50%)', fontSize: 12 }} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="rate" stroke="hsl(165,80%,44%)" strokeWidth={2.5} dot={{ fill: 'hsl(165,80%,44%)', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Weekly Spending */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
            <h2 className="font-semibold text-foreground mb-4">Weekly Spending Pattern</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={weeklySpending}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,12%,50%)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,12%,50%)', fontSize: 12 }} tickFormatter={v => `$${v}`} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="amount" fill="hsl(230,90%,62%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Behavioral Profile */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
            <h2 className="font-semibold text-foreground mb-4">Financial Behavior Profile</h2>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={behaviorData}>
                <PolarGrid stroke="hsl(220,14%,20%)" />
                <PolarAngleAxis dataKey="trait" tick={{ fill: 'hsl(215,12%,50%)', fontSize: 11 }} />
                <Radar dataKey="value" stroke="hsl(210,100%,56%)" fill="hsl(210,100%,56%)" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Insights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-5">
          <h2 className="font-semibold text-foreground mb-4">AI-Powered Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { emoji: '⚠️', title: 'Overspending Alert', desc: 'Your Food & Dining and Shopping categories exceeded budget by $210 combined. Consider meal planning.', severity: 'medium' as const },
              { emoji: '📈', title: 'Savings Opportunity', desc: 'Your transport costs dropped 15%. Redirecting savings could boost your Emergency Fund by $48/month.', severity: 'low' as const },
              { emoji: '🎯', title: 'Goal on Track', desc: 'Vacation fund is 76% complete with 4 months remaining. You\'re ahead of schedule!', severity: 'low' as const },
            ].map((insight, i) => (
              <div key={i} className={`p-4 rounded-lg border ${
                insight.severity === 'medium' ? 'bg-risk-medium/5 border-risk-medium/20' : 'bg-primary/5 border-primary/20'
              }`}>
                <span className="text-xl">{insight.emoji}</span>
                <h3 className="font-medium text-foreground text-sm mt-2">{insight.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{insight.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
