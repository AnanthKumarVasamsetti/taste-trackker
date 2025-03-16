
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ClipboardCheck, Home, User, LogOut } from "lucide-react";

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MobileLayout = ({ children, title = "FoodAudit Pro" }: MobileLayoutProps) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm p-4">
        <h1 className="text-xl font-bold text-brand-blue">{title}</h1>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="bg-white border-t shadow-sm">
        <div className="flex justify-around">
          <Link 
            to="/mobile" 
            className={`flex flex-col items-center p-3 ${location.pathname === '/mobile' ? 'text-brand-blue' : 'text-gray-500'}`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link 
            to="/mobile/audits" 
            className={`flex flex-col items-center p-3 ${location.pathname.includes('/mobile/audits') ? 'text-brand-blue' : 'text-gray-500'}`}
          >
            <ClipboardCheck className="h-5 w-5" />
            <span className="text-xs mt-1">My Audits</span>
          </Link>
          <Link 
            to="/mobile/profile" 
            className={`flex flex-col items-center p-3 ${location.pathname === '/mobile/profile' ? 'text-brand-blue' : 'text-gray-500'}`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
