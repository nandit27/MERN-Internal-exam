import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  QrCode, 
  History, 
  Settings, 
  LogOut, 
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const { logout, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 w-72 bg-card border-r border-border
      `}>
        <div className="flex flex-col h-full">
          {/* App Logo & Title */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <QrCode className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-primary">QR Code App</h1>
                <p className="text-xs text-muted-foreground">Generate & Manage QR Codes</p>
              </div>
            </div>
          </div>
          
          {/* User Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
          </div>
          {/* Logout Button */}
          <div className="p-4 border-t border-border">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-3 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg md:hidden hover:bg-primary/90 transition-colors duration-200"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 min-h-screen">
        <div className="container mx-auto p-6 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout; 