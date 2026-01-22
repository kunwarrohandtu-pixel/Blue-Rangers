import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { LiveMapView } from '@/components/views/LiveMapView';
import { AnalyticsView } from '@/components/views/AnalyticsView';
import { RangerLogsView } from '@/components/views/RangerLogsView';
import { AlertsView } from '@/components/views/AlertsView';
import { alerts } from '@/data/mockData';

const Index = () => {
  const [activeTab, setActiveTab] = useState('Live Map');

  const renderView = () => {
    switch (activeTab) {
      case 'Live Map':
        return <LiveMapView />;
      case 'Analytics':
        return <AnalyticsView />;
      case 'Ranger Logs':
        return <RangerLogsView />;
      case 'Alerts':
        return <AlertsView />;
      default:
        return <LiveMapView />;
    }
  };

  const criticalAlertCount = alerts.filter((a) => a.severity === 'critical').length;

  return (
    <div className="min-h-screen bg-ocean-deep">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        alertCount={criticalAlertCount}
      />
      <main>{renderView()}</main>
    </div>
  );
};

export default Index;
