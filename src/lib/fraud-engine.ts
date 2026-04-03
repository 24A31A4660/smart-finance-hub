import type { RiskAssessment } from './types';

// Simulated Isolation Forest-inspired anomaly detection
export function assessTransactionRisk(params: {
  amount: number;
  averageAmount: number;
  loginTime: number; // hour 0-23
  usualLoginTime: number;
  isNewDevice: boolean;
  isNewLocation: boolean;
  recentTransactionCount: number; // last hour
  failedAttempts: number;
  minutesSinceLastTransaction: number;
  dailyTotal: number;
  dailyLimit: number;
}): RiskAssessment {
  const {
    amount, averageAmount, loginTime, usualLoginTime,
    isNewDevice, isNewLocation, recentTransactionCount,
    failedAttempts, minutesSinceLastTransaction, dailyTotal, dailyLimit
  } = params;

  // Feature engineering
  const loginDeviation = Math.abs(loginTime - usualLoginTime) / 12; // 0-1
  const amountDeviation = Math.min(Math.abs(amount - averageAmount) / averageAmount, 3) / 3; // 0-1
  const deviceFlag = isNewDevice ? 1 : 0;
  const locationFlag = isNewLocation ? 1 : 0;
  const transactionVelocity = Math.min(recentTransactionCount / 10, 1); // 0-1
  const attempts = Math.min(failedAttempts / 5, 1);
  const timeSinceLastTransaction = minutesSinceLastTransaction < 1 ? 1 : Math.max(0, 1 - minutesSinceLastTransaction / 60);
  const dailyUsageRatio = Math.min(dailyTotal / dailyLimit, 1);
  const transactionFrequency = Math.min(recentTransactionCount / 20, 1);

  // Weighted anomaly score (simulating Isolation Forest output)
  const weights = {
    loginDeviation: 0.08,
    amountDeviation: 0.2,
    deviceFlag: 0.15,
    locationFlag: 0.12,
    transactionVelocity: 0.12,
    attempts: 0.13,
    timeSinceLastTransaction: 0.08,
    dailyUsageRatio: 0.07,
    transactionFrequency: 0.05,
  };

  const rawScore =
    loginDeviation * weights.loginDeviation +
    amountDeviation * weights.amountDeviation +
    deviceFlag * weights.deviceFlag +
    locationFlag * weights.locationFlag +
    transactionVelocity * weights.transactionVelocity +
    attempts * weights.attempts +
    timeSinceLastTransaction * weights.timeSinceLastTransaction +
    dailyUsageRatio * weights.dailyUsageRatio +
    transactionFrequency * weights.transactionFrequency;

  const riskScore = Math.round(rawScore * 100);

  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  let action: 'ALLOW' | 'OTP' | 'BLOCK';
  let prediction: 'Normal' | 'Suspicious';

  if (riskScore <= 30) {
    riskLevel = 'LOW';
    action = 'ALLOW';
    prediction = 'Normal';
  } else if (riskScore <= 65) {
    riskLevel = 'MEDIUM';
    action = 'OTP';
    prediction = 'Suspicious';
  } else {
    riskLevel = 'HIGH';
    action = 'BLOCK';
    prediction = 'Suspicious';
  }

  // Generate explainable reason
  const reasons: string[] = [];
  if (amountDeviation > 0.5) reasons.push('Unusual transaction amount');
  if (deviceFlag) reasons.push('New device detected');
  if (locationFlag) reasons.push('Unfamiliar location');
  if (transactionVelocity > 0.5) reasons.push('High transaction velocity');
  if (attempts > 0.3) reasons.push('Multiple failed attempts');
  if (loginDeviation > 0.5) reasons.push('Unusual login time');
  if (dailyUsageRatio > 0.8) reasons.push('Near daily limit');

  return {
    riskScore,
    prediction,
    riskLevel,
    action,
    reason: reasons.length > 0 ? reasons.join('; ') : 'Transaction appears normal',
    features: {
      loginDeviation: Math.round(loginDeviation * 100),
      amountDeviation: Math.round(amountDeviation * 100),
      deviceFlag,
      locationFlag,
      transactionVelocity: Math.round(transactionVelocity * 100),
      attempts: Math.round(attempts * 100),
      timeSinceLastTransaction: Math.round(timeSinceLastTransaction * 100),
      dailyUsageRatio: Math.round(dailyUsageRatio * 100),
      transactionFrequency: Math.round(transactionFrequency * 100),
    },
  };
}
