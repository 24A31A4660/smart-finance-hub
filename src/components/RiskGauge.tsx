import { motion } from 'framer-motion';
import { Shield, AlertTriangle, XOctagon } from 'lucide-react';

interface RiskGaugeProps {
  score: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  size?: 'sm' | 'lg';
}

export default function RiskGauge({ score, level, size = 'lg' }: RiskGaugeProps) {
  const circumference = 2 * Math.PI * 45;
  const progress = (score / 100) * circumference;
  const isLarge = size === 'lg';

  const color = level === 'LOW' ? 'text-risk-low' : level === 'MEDIUM' ? 'text-risk-medium' : 'text-risk-high';
  const strokeColor = level === 'LOW' ? 'hsl(165,80%,44%)' : level === 'MEDIUM' ? 'hsl(42,95%,55%)' : 'hsl(0,72%,56%)';
  const Icon = level === 'LOW' ? Shield : level === 'MEDIUM' ? AlertTriangle : XOctagon;

  return (
    <div className={`flex flex-col items-center ${isLarge ? 'gap-3' : 'gap-1'}`}>
      <div className={`relative ${isLarge ? 'w-32 h-32' : 'w-16 h-16'}`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(220,14%,16%)" strokeWidth={isLarge ? 8 : 6} />
          <motion.circle
            cx="50" cy="50" r="45" fill="none"
            stroke={strokeColor}
            strokeWidth={isLarge ? 8 : 6}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${color} ${isLarge ? 'text-2xl' : 'text-sm'}`}>{score}</span>
        </div>
      </div>
      {isLarge && (
        <div className="text-center">
          <div className={`flex items-center gap-1.5 justify-center ${color}`}>
            <Icon className="w-4 h-4" />
            <span className="text-sm font-semibold">{level} RISK</span>
          </div>
        </div>
      )}
    </div>
  );
}
