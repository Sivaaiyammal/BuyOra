import { ReactNode } from 'react';
import Card from '../common/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color: 'blue' | 'purple' | 'pink' | 'orange' | 'green';
  trend?: {
    value: string | number;
    up?: boolean;
  };
}

const StatsCard = ({ title, value, icon, color, trend }: StatsCardProps) => {
  return (
    <Card color={color} className="relative overflow-hidden">
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-medium opacity-90">{title}</h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-3xl font-bold">{value}</p>
          {trend && (
            <div className="flex items-center">
              <span className={`text-sm font-medium ${trend.up ? 'text-green-200' : 'text-red-200'}`}>
                {trend.up ? '↑' : '↓'} {trend.value}
              </span>
            </div>
          )}
        </div>
      </div>
      {icon && (
        <div className="absolute top-3 right-3 opacity-20">
          {icon}
        </div>
      )}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10"></div>
    </Card>
  );
};

export default StatsCard;