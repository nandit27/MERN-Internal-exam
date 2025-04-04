import { useState } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import QRGenerator from './QRGenerator';
import QRScanner from './QRScanner';
import QRHistory from './QRHistory';
import { QrCode, Scan, History, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [scanResult, setScanResult] = useState(null);

  const handleScanResult = (result) => {
    setScanResult(result);
    console.log('Scanned QR Code:', result);
  };

  const tabs = [
    { 
      id: 'generate', 
      label: 'Generate QR', 
      icon: QrCode,
      description: 'Create new QR codes'
    },
    { 
      id: 'scan', 
      label: 'Scan QR', 
      icon: Scan,
      description: 'Scan existing QR codes'
    },
    { 
      id: 'history', 
      label: 'History', 
      icon: History,
      description: 'View generated QR codes'
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'generate':
        return <QRGenerator />;
      case 'scan':
        return (
          <div className="space-y-6">
            <QRScanner onResult={handleScanResult} />
            {scanResult && (
              <div className="p-6 bg-card/50 rounded-lg border border-border/50 backdrop-blur-sm">
                <h3 className="text-sm font-medium mb-2 text-foreground/80">Scan Result:</h3>
                <p className="text-sm text-muted-foreground break-all">{scanResult}</p>
              </div>
            )}
          </div>
        );
      case 'history':
        return <QRHistory />;
      default:
        return <QRGenerator />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h1>
          <p className="text-muted-foreground">
            {tabs.find(tab => tab.id === activeTab)?.description}
          </p>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group relative overflow-hidden
                flex items-center justify-between
                p-6 rounded-xl transition-all duration-300
                ${activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-card hover:bg-card/80 text-foreground border border-border'
                }
              `}
            >
              <div className="flex items-center space-x-4">
                <div className={`
                  p-3 rounded-lg transition-colors duration-300
                  ${activeTab === tab.id
                    ? 'bg-white/10'
                    : 'bg-primary/10 group-hover:bg-primary/20'
                  }
                `}>
                  <tab.icon className={`
                    w-6 h-6 transition-colors duration-300
                    ${activeTab === tab.id
                      ? 'text-primary-foreground'
                      : 'text-primary group-hover:text-primary'
                    }
                  `} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">{tab.label}</h3>
                  <p className={`
                    text-sm transition-colors duration-300
                    ${activeTab === tab.id
                      ? 'text-primary-foreground/80'
                      : 'text-muted-foreground'
                    }
                  `}>
                    {tab.description}
                  </p>
                </div>
              </div>
              <ChevronRight className={`
                w-5 h-5 transition-all duration-300
                ${activeTab === tab.id
                  ? 'opacity-100 translate-x-0 text-primary-foreground'
                  : 'opacity-0 -translate-x-4 text-primary'
                }
              `} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 min-h-[60vh]">
          {renderContent()}
        </div>

        {/* Quick Actions Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Need help? Check our <a href="#" className="text-primary hover:underline">documentation</a>
          </p>
          <div className="flex items-center space-x-4">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Support
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Feedback
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 