import React from 'react';
import { User } from '../types';
import { LayoutGrid, PlusCircle, User as UserIcon, Zap, Home } from 'lucide-react';

interface NavbarProps {
  user: User;
  onNavigate: (view: 'home' | 'dashboard' | 'create' | 'profile') => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, currentView }) => {
  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
            <img src="/favicon.png" alt="GigForge Logo" className="w-8 h-8 mr-3" />
            <span className="font-bold text-xl tracking-tight text-white">Micron GigForge</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'home' ? 'text-white bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'dashboard' ? 'text-white bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
            >
              Explore Gigs
            </button>
            <button 
              onClick={() => onNavigate('create')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'create' ? 'text-white bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
            >
              Post a Project
            </button>
          </div>

          {/* User Stats */}
          <div className="flex items-center space-x-4">
            <div className="bg-slate-800 px-3 py-1.5 rounded-full flex items-center border border-slate-700 hover:border-slate-600 transition-colors cursor-help" title="Your Bravo Balance">
              <span className="text-yellow-400 mr-2 text-sm">★</span>
              <span className="text-sm font-semibold">{user.bravoBalance}</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="text-right hidden sm:block">
                 <div className="text-sm font-bold text-white leading-none">{user.name}</div>
                 <div className="text-xs text-slate-400 leading-none mt-1">{user.role}</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-sm font-bold border-2 border-slate-700 shadow-sm">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu (simplified) */}
      <div className="md:hidden bg-slate-800 border-t border-slate-700 flex justify-around py-2">
         <button onClick={() => onNavigate('home')} className={`p-2 ${currentView === 'home' ? 'text-blue-400' : 'text-slate-400'}`}><Home className="w-6 h-6" /></button>
         <button onClick={() => onNavigate('dashboard')} className={`p-2 ${currentView === 'dashboard' ? 'text-blue-400' : 'text-slate-400'}`}><LayoutGrid className="w-6 h-6" /></button>
         <button onClick={() => onNavigate('create')} className={`p-2 ${currentView === 'create' ? 'text-blue-400' : 'text-slate-400'}`}><PlusCircle className="w-6 h-6" /></button>
         <button className="p-2 text-slate-400"><UserIcon className="w-6 h-6" /></button>
      </div>
    </nav>
  );
};

export default Navbar;