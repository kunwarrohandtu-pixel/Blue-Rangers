import { Waves, Bell, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  alertCount: number;
}

const tabs = ['Live Map', 'Analytics', 'Ranger Logs', 'Alerts'];

export const Navigation = ({ activeTab, onTabChange, alertCount }: NavigationProps) => {
  return (
    <nav className="h-16 bg-ocean-deep border-b border-primary/20 flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Waves className="w-8 h-8 text-primary icon-glow" />
          <div className="absolute inset-0 animate-pulse-ring rounded-full border border-primary/30" />
        </div>
        <div className="flex items-center">
          <span className="text-primary font-bold text-xl glow-cyan">Reef Sentinel</span>
          <span className="text-muted-foreground mx-2">|</span>
          <span className="text-foreground text-lg">Marine Command Center</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`nav-tab ${activeTab === tab ? 'nav-tab-active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-reef-critical rounded-full flex items-center justify-center text-xs font-bold text-foreground">
              {alertCount}
            </span>
          )}
        </button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors">
            <Avatar className="w-8 h-8 border border-primary/30">
              <AvatarFallback className="bg-secondary text-primary text-sm">MC</AvatarFallback>
            </Avatar>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-panel border-primary/20">
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>System Preferences</DropdownMenuItem>
            <DropdownMenuItem>Help & Support</DropdownMenuItem>
            <DropdownMenuItem className="text-reef-critical">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
