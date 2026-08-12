import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { Activity, Zap, Gauge } from 'lucide-react';
import { IBike } from '../../types';

interface BikePerformanceChartProps {
  bike: IBike;
}

export const BikePerformanceChart: React.FC<BikePerformanceChartProps> = ({ bike }) => {
  // Generate dyno performance points based on bike category and specs
  const generateDynoData = () => {
    // Parse power numeric
    const powerMatch = bike.specs.power?.match(/(\d+(\.\d+)?)/);
    const maxPower = powerMatch ? parseFloat(powerMatch[1]) : 50;

    // Parse torque numeric
    const torqueMatch = bike.specs.torque?.match(/(\d+(\.\d+)?)/);
    const maxTorque = torqueMatch ? parseFloat(torqueMatch[1]) : 40;

    const isElectric = bike.category === 'electric';

    if (isElectric) {
      // Instant torque curve for electric
      return [
        { rpm: '0 RPM', torque: maxTorque, power: Math.round(maxPower * 0.2) },
        { rpm: '2,000 RPM', torque: maxTorque, power: Math.round(maxPower * 0.5) },
        { rpm: '4,000 RPM', torque: Math.round(maxTorque * 0.95), power: Math.round(maxPower * 0.85) },
        { rpm: '6,000 RPM', torque: Math.round(maxTorque * 0.8), power: maxPower },
        { rpm: '8,000 RPM', torque: Math.round(maxTorque * 0.65), power: Math.round(maxPower * 0.9) },
        { rpm: '10,000 RPM', torque: Math.round(maxTorque * 0.45), power: Math.round(maxPower * 0.75) }
      ];
    }

    // High revving sport vs cruiser vs standard
    const isSport = bike.category === 'sport';
    const isCruiser = bike.category === 'cruiser';

    if (isCruiser) {
      // Low-end torque cruiser curve
      return [
        { rpm: '1,500 RPM', torque: Math.round(maxTorque * 0.75), power: Math.round(maxPower * 0.25) },
        { rpm: '3,000 RPM', torque: Math.round(maxTorque * 0.95), power: Math.round(maxPower * 0.55) },
        { rpm: '4,000 RPM', torque: maxTorque, power: Math.round(maxPower * 0.75) },
        { rpm: '5,500 RPM', torque: Math.round(maxTorque * 0.85), power: maxPower },
        { rpm: '7,000 RPM', torque: Math.round(maxTorque * 0.6), power: Math.round(maxPower * 0.8) }
      ];
    }

    if (isSport) {
      // High RPM Screamer
      return [
        { rpm: '2,000 RPM', torque: Math.round(maxTorque * 0.4), power: Math.round(maxPower * 0.2) },
        { rpm: '4,000 RPM', torque: Math.round(maxTorque * 0.6), power: Math.round(maxPower * 0.35) },
        { rpm: '6,000 RPM', torque: Math.round(maxTorque * 0.8), power: Math.round(maxPower * 0.55) },
        { rpm: '8,000 RPM', torque: Math.round(maxTorque * 0.95), power: Math.round(maxPower * 0.8) },
        { rpm: '10,000 RPM', torque: maxTorque, power: Math.round(maxPower * 0.95) },
        { rpm: '12,000 RPM', torque: Math.round(maxTorque * 0.85), power: maxPower },
        { rpm: '14,000 RPM', torque: Math.round(maxTorque * 0.7), power: Math.round(maxPower * 0.9) }
      ];
    }

    // General Standard Curve
    return [
      { rpm: '2,000 RPM', torque: Math.round(maxTorque * 0.5), power: Math.round(maxPower * 0.25) },
      { rpm: '4,000 RPM', torque: Math.round(maxTorque * 0.75), power: Math.round(maxPower * 0.45) },
      { rpm: '6,500 RPM', torque: maxTorque, power: Math.round(maxPower * 0.75) },
      { rpm: '8,500 RPM', torque: Math.round(maxTorque * 0.9), power: maxPower },
      { rpm: '10,500 RPM', torque: Math.round(maxTorque * 0.7), power: Math.round(maxPower * 0.85) }
    ];
  };

  const data = generateDynoData();

  return (
    <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400">
          <Activity className="w-4 h-4" />
          <span>Dyno Power & Torque Curve</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1 font-semibold text-orange-400">
            <Zap className="w-3 h-3" /> Power (HP)
          </span>
          <span className="flex items-center gap-1 font-semibold text-amber-400">
            <Gauge className="w-3 h-3" /> Torque (Nm)
          </span>
        </div>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorTorque" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="rpm" stroke="#71717a" tick={{ fontSize: 10 }} />
            <YAxis stroke="#71717a" tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                borderColor: '#3f3f46',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#ffffff'
              }}
            />
            <Area
              type="monotone"
              dataKey="power"
              name="Power (HP)"
              stroke="#f97316"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPower)"
            />
            <Area
              type="monotone"
              dataKey="torque"
              name="Torque (Nm)"
              stroke="#fbbf24"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTorque)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[10px] text-zinc-500 text-center italic">
        Simulated engine dynamometer curve output based on factory tuning specifications.
      </p>
    </div>
  );
};
