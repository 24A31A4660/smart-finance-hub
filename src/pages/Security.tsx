import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Send, CheckCircle, AlertTriangle, XOctagon } from 'lucide-react';
import Layout from '@/components/Layout';
import RiskGauge from '@/components/RiskGauge';
import { assessTransactionRisk } from '@/lib/fraud-engine';
import { alerts } from '@/lib/mock-data';
import type { RiskAssessment } from '@/lib/types';

export default function Security() {
  const [amount, setAmount] = useState('');
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);

  const simulateTransaction = () => {
    const amt = parseFloat(amount) || 0;
    const result = assessTransactionRisk({
      amount: amt,
      averageAmount: 250,
      loginTime: new Date().getHours(),
      usualLoginTime: 10,
      isNewDevice: amt > 1000,
      isNewLocation: amt > 2000,
      recentTransactionCount: amt > 500 ? 8 : 2,
      failedAttempts: amt > 1500 ? 3 : 0,
      minutesSinceLastTransaction: amt > 800 ? 2 : 30,
      dailyTotal: amt,
      dailyLimit: 5000,
    });
    setAssessment(result);
    setShowOtp(result.action === 'OTP');
    setVerified(false);
    setOtp('');
  };

  const verifyOtp = () => {
    if (otp.length === 6) {
      setVerified(true);
      setShowOtp(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Security Center</h1>
          <p className="text-sm text-muted-foreground mt-1">ML-powered fraud detection and transaction security</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transaction Simulator */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <h2 className="font-semibold text-foreground mb-1">Transaction Risk Simulator</h2>
            <p className="text-xs text-muted-foreground mb-5">Enter an amount to simulate ML fraud detection</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">Transaction Amount ($)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="e.g., 250, 1500, 3000"
                  className="w-full bg-secondary rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Try: <span className="text-foreground">$50</span> (Low risk) • <span className="text-risk-medium">$1,200</span> (Medium) • <span className="text-loss">$3,000</span> (High)</p>
              </div>
              <button
                onClick={simulateTransaction}
                disabled={!amount}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> Analyze Transaction
              </button>
            </div>

            {/* OTP Verification */}
            <AnimatePresence>
              {showOtp && !verified && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 p-4 rounded-lg bg-risk-medium/10 border border-risk-medium/20">
                  <p className="text-sm font-medium text-risk-medium mb-2">OTP Verification Required</p>
                  <p className="text-xs text-muted-foreground mb-3">Enter the 6-digit code sent to your device (use any 6 digits)</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="______"
                      className="flex-1 bg-secondary rounded-lg px-4 py-2 text-foreground text-center tracking-widest outline-none focus:ring-2 focus:ring-risk-medium/50"
                    />
                    <button onClick={verifyOtp} className="px-4 py-2 rounded-lg bg-risk-medium text-foreground text-sm font-medium hover:bg-risk-medium/80 transition-colors">
                      Verify
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {verified && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 rounded-lg bg-profit/10 border border-profit/20 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-profit" />
                <span className="text-sm text-profit font-medium">OTP verified. Transaction approved.</span>
              </motion.div>
            )}
          </motion.div>

          {/* Risk Assessment Results */}
          <AnimatePresence mode="wait">
            {assessment && (
              <motion.div
                key={assessment.riskScore}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-card p-6"
              >
                <h2 className="font-semibold text-foreground mb-4">ML Risk Assessment</h2>

                <div className="flex justify-center mb-6">
                  <RiskGauge score={assessment.riskScore} level={assessment.riskLevel} />
                </div>

                {/* Decision */}
                <div className={`p-4 rounded-lg mb-4 flex items-center gap-3 ${
                  assessment.action === 'ALLOW' ? 'bg-profit/10 border border-profit/20' :
                  assessment.action === 'OTP' ? 'bg-risk-medium/10 border border-risk-medium/20' :
                  'bg-loss/10 border border-loss/20'
                }`}>
                  {assessment.action === 'ALLOW' ? <CheckCircle className="w-5 h-5 text-profit" /> :
                   assessment.action === 'OTP' ? <AlertTriangle className="w-5 h-5 text-risk-medium" /> :
                   <XOctagon className="w-5 h-5 text-loss" />}
                  <div>
                    <p className={`text-sm font-semibold ${
                      assessment.action === 'ALLOW' ? 'text-profit' :
                      assessment.action === 'OTP' ? 'text-risk-medium' : 'text-loss'
                    }`}>
                      Action: {assessment.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{assessment.reason}</p>
                  </div>
                </div>

                {/* Feature Breakdown */}
                <h3 className="text-sm font-medium text-foreground mb-3">Feature Analysis</h3>
                <div className="space-y-2">
                  {Object.entries(assessment.features).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-40 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            (value as number) < 30 ? 'bg-risk-low' : (value as number) < 60 ? 'bg-risk-medium' : 'bg-risk-high'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">{value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security Alerts */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <h2 className="font-semibold text-foreground mb-4">Security Alerts</h2>
          <div className="space-y-2">
            {alerts.filter(a => a.type === 'fraud' || a.type === 'system').map(alert => (
              <div key={alert.id} className={`p-4 rounded-lg border ${
                alert.severity === 'high' ? 'bg-loss/5 border-loss/20' :
                alert.severity === 'medium' ? 'bg-risk-medium/5 border-risk-medium/20' :
                'bg-primary/5 border-primary/20'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm font-medium ${
                      alert.severity === 'high' ? 'text-loss' :
                      alert.severity === 'medium' ? 'text-risk-medium' : 'text-foreground'
                    }`}>{alert.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{new Date(alert.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
