import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Clock, Ban } from 'lucide-react';
import type { Transaction } from '@/lib/types';
import RiskGauge from './RiskGauge';

interface TransactionRowProps {
  transaction: Transaction;
  index: number;
}

export default function TransactionRow({ transaction: t, index }: TransactionRowProps) {
  const isCredit = t.type === 'credit';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isCredit ? 'bg-profit/10' : 'bg-primary/10'
      }`}>
        {isCredit ? (
          <ArrowDownRight className="w-5 h-5 text-profit" />
        ) : (
          <ArrowUpRight className="w-5 h-5 text-primary" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{t.description}</p>
        <p className="text-xs text-muted-foreground">{t.category} • {new Date(t.date).toLocaleDateString()}</p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className={`text-sm font-semibold ${isCredit ? 'text-profit' : 'text-foreground'}`}>
          {isCredit ? '+' : '-'}${t.amount.toLocaleString()}
        </p>
        <div className="flex items-center gap-1.5 justify-end mt-0.5">
          {t.status === 'blocked' && <Ban className="w-3 h-3 text-loss" />}
          {t.status === 'pending' && <Clock className="w-3 h-3 text-risk-medium" />}
          <span className={`text-xs ${
            t.status === 'completed' ? 'text-muted-foreground' :
            t.status === 'pending' ? 'text-risk-medium' :
            'text-loss'
          }`}>
            {t.status}
          </span>
        </div>
      </div>

      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <RiskGauge score={t.riskScore} level={t.riskLevel} size="sm" />
      </div>
    </motion.div>
  );
}
