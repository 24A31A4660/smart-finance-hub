import type { Transaction, SpendingCategory, MonthlyData, BudgetItem, SavingsGoal, Alert, UserProfile } from './types';

export const userProfile: UserProfile = {
  name: 'Alexander Mitchell',
  email: 'alex.mitchell@email.com',
  avatar: 'AM',
  accountNumber: '•••• •••• •••• 4829',
  balance: 48_752.30,
  creditScore: 782,
  memberSince: '2022-03-15',
};

export const transactions: Transaction[] = [
  { id: 't1', type: 'debit', amount: 42.50, category: 'Food & Dining', description: 'Whole Foods Market', date: '2026-04-03T10:30:00', status: 'completed', riskLevel: 'LOW', riskScore: 8, merchant: 'Whole Foods' },
  { id: 't2', type: 'debit', amount: 1250.00, category: 'Housing', description: 'Monthly Rent Payment', date: '2026-04-01T09:00:00', status: 'completed', riskLevel: 'LOW', riskScore: 5, merchant: 'Property Mgmt' },
  { id: 't3', type: 'credit', amount: 5400.00, category: 'Income', description: 'Salary Deposit', date: '2026-03-31T08:00:00', status: 'completed', riskLevel: 'LOW', riskScore: 2 },
  { id: 't4', type: 'debit', amount: 89.99, category: 'Shopping', description: 'Amazon Purchase', date: '2026-03-30T15:20:00', status: 'completed', riskLevel: 'LOW', riskScore: 12, merchant: 'Amazon' },
  { id: 't5', type: 'debit', amount: 2800.00, category: 'Transfer', description: 'Wire Transfer - Unusual', date: '2026-03-29T02:15:00', status: 'blocked', riskLevel: 'HIGH', riskScore: 78, merchant: 'Unknown' },
  { id: 't6', type: 'debit', amount: 650.00, category: 'Travel', description: 'Flight Booking', date: '2026-03-28T11:45:00', status: 'pending', riskLevel: 'MEDIUM', riskScore: 45, merchant: 'Delta Airlines' },
  { id: 't7', type: 'debit', amount: 15.99, category: 'Entertainment', description: 'Netflix Subscription', date: '2026-03-27T00:00:00', status: 'completed', riskLevel: 'LOW', riskScore: 3, merchant: 'Netflix' },
  { id: 't8', type: 'debit', amount: 120.00, category: 'Health', description: 'Gym Membership', date: '2026-03-25T07:30:00', status: 'completed', riskLevel: 'LOW', riskScore: 6, merchant: 'Equinox' },
  { id: 't9', type: 'debit', amount: 340.00, category: 'Shopping', description: 'Electronics Store', date: '2026-03-24T14:00:00', status: 'completed', riskLevel: 'LOW', riskScore: 18, merchant: 'Best Buy' },
  { id: 't10', type: 'credit', amount: 200.00, category: 'Income', description: 'Freelance Payment', date: '2026-03-23T16:00:00', status: 'completed', riskLevel: 'LOW', riskScore: 4 },
];

export const spendingCategories: SpendingCategory[] = [
  { name: 'Housing', amount: 1250, percentage: 35, color: 'hsl(210, 100%, 56%)', trend: 'stable' },
  { name: 'Food & Dining', amount: 580, percentage: 16, color: 'hsl(165, 80%, 44%)', trend: 'up' },
  { name: 'Transport', amount: 320, percentage: 9, color: 'hsl(42, 95%, 55%)', trend: 'down' },
  { name: 'Shopping', amount: 430, percentage: 12, color: 'hsl(280, 70%, 60%)', trend: 'up' },
  { name: 'Entertainment', amount: 180, percentage: 5, color: 'hsl(330, 70%, 55%)', trend: 'stable' },
  { name: 'Health', amount: 220, percentage: 6, color: 'hsl(0, 72%, 56%)', trend: 'down' },
  { name: 'Travel', amount: 650, percentage: 18, color: 'hsl(200, 80%, 50%)', trend: 'up' },
];

export const monthlyData: MonthlyData[] = [
  { month: 'Oct', income: 5400, expenses: 3200, savings: 2200 },
  { month: 'Nov', income: 5600, expenses: 3800, savings: 1800 },
  { month: 'Dec', income: 6200, expenses: 4500, savings: 1700 },
  { month: 'Jan', income: 5400, expenses: 3100, savings: 2300 },
  { month: 'Feb', income: 5400, expenses: 3400, savings: 2000 },
  { month: 'Mar', income: 5600, expenses: 3630, savings: 1970 },
];

export const budgetItems: BudgetItem[] = [
  { category: 'Housing', allocated: 1300, spent: 1250, remaining: 50 },
  { category: 'Food & Dining', allocated: 500, spent: 580, remaining: -80 },
  { category: 'Transport', allocated: 400, spent: 320, remaining: 80 },
  { category: 'Shopping', allocated: 300, spent: 430, remaining: -130 },
  { category: 'Entertainment', allocated: 200, spent: 180, remaining: 20 },
  { category: 'Health', allocated: 250, spent: 220, remaining: 30 },
];

export const savingsGoals: SavingsGoal[] = [
  { id: 'g1', name: 'Emergency Fund', target: 15000, current: 12400, deadline: '2026-12-31', icon: '🛡️' },
  { id: 'g2', name: 'New Car', target: 35000, current: 8200, deadline: '2027-06-30', icon: '🚗' },
  { id: 'g3', name: 'Vacation', target: 5000, current: 3800, deadline: '2026-08-15', icon: '✈️' },
  { id: 'g4', name: 'Investment Portfolio', target: 50000, current: 22000, deadline: '2028-01-01', icon: '📈' },
];

export const alerts: Alert[] = [
  { id: 'a1', type: 'fraud', severity: 'high', title: 'Suspicious Transaction Blocked', message: 'A wire transfer of $2,800 was blocked due to unusual activity at 2:15 AM from an unrecognized device.', timestamp: '2026-03-29T02:15:00', read: false },
  { id: 'a2', type: 'budget', severity: 'medium', title: 'Budget Exceeded: Food & Dining', message: 'You\'ve exceeded your Food & Dining budget by $80 this month.', timestamp: '2026-04-02T12:00:00', read: false },
  { id: 'a3', type: 'insight', severity: 'low', title: 'Savings Milestone', message: 'You\'re 83% toward your Emergency Fund goal. Great progress!', timestamp: '2026-04-01T09:00:00', read: true },
  { id: 'a4', type: 'budget', severity: 'medium', title: 'Budget Exceeded: Shopping', message: 'Shopping spending is $130 over budget. Consider reducing discretionary purchases.', timestamp: '2026-03-31T18:00:00', read: false },
  { id: 'a5', type: 'system', severity: 'low', title: 'Credit Score Update', message: 'Your credit score increased by 5 points to 782.', timestamp: '2026-03-28T10:00:00', read: true },
];
