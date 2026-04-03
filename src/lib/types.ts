export interface Transaction {
  id: string;
  type: 'credit' | 'debit' | 'transfer';
  amount: number;
  category: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'blocked';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  riskScore: number;
  merchant?: string;
}

export interface RiskAssessment {
  riskScore: number;
  prediction: 'Normal' | 'Suspicious';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  action: 'ALLOW' | 'OTP' | 'BLOCK';
  reason: string;
  features: {
    loginDeviation: number;
    amountDeviation: number;
    deviceFlag: number;
    locationFlag: number;
    transactionVelocity: number;
    attempts: number;
    timeSinceLastTransaction: number;
    dailyUsageRatio: number;
    transactionFrequency: number;
  };
}

export interface SpendingCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface BudgetItem {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  icon: string;
}

export interface Alert {
  id: string;
  type: 'fraud' | 'budget' | 'insight' | 'system';
  severity: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  accountNumber: string;
  balance: number;
  creditScore: number;
  memberSince: string;
}
