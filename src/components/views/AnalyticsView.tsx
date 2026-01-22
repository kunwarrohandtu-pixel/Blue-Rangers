import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  ReferenceDot,
} from 'recharts';
import { temperatureData, healthDistribution, activityData } from '@/data/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 border-primary/30">
        <p className="text-sm text-foreground font-medium">Day {label}</p>
        <p className="text-sm text-primary">{payload[0].value.toFixed(1)}°C</p>
      </div>
    );
  }
  return null;
};

export const AnalyticsView = () => {
  const stressEvents = temperatureData.filter((d) => d.hasEvent);

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Temperature vs Stress Events Chart */}
        <div className="glass-panel p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Water Temperature vs. Stress Events (30 Days)
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 255, 218, 0.1)" />
                <XAxis
                  dataKey="day"
                  stroke="#8892b0"
                  fontSize={12}
                  tickFormatter={(value) => `D${value}`}
                />
                <YAxis
                  stroke="#8892b0"
                  fontSize={12}
                  domain={[28, 33]}
                  tickFormatter={(value) => `${value}°C`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="hsl(166, 100%, 70%)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: 'hsl(166, 100%, 70%)' }}
                />
                {stressEvents.map((event) => (
                  <ReferenceDot
                    key={event.day}
                    x={event.day}
                    y={event.temperature}
                    r={6}
                    fill="hsl(344, 100%, 60%)"
                    stroke="hsl(344, 100%, 60%)"
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-primary" />
              <span className="text-muted-foreground">Temperature</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-reef-critical" />
              <span className="text-muted-foreground">Stress Event</span>
            </div>
          </div>
        </div>

        {/* Reef Health Distribution */}
        <div className="glass-panel p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Reef Health Distribution</h2>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {healthDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222 47% 14% / 0.9)',
                    border: '1px solid hsl(166 100% 70% / 0.2)',
                    borderRadius: '8px',
                  }}
                  itemStyle={{ color: '#e6f1ff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
            {healthDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Site Activity Timeline */}
      <div className="glass-panel p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Site Activity Timeline (14 Days)</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 255, 218, 0.1)" />
              <XAxis dataKey="day" stroke="#8892b0" fontSize={12} />
              <YAxis stroke="#8892b0" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222 47% 14% / 0.9)',
                  border: '1px solid hsl(166 100% 70% / 0.2)',
                  borderRadius: '8px',
                }}
                itemStyle={{ color: '#e6f1ff' }}
                labelStyle={{ color: '#e6f1ff' }}
              />
              <Bar dataKey="checkIns" fill="hsl(166, 100%, 70%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
