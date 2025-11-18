import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types';
import { Search, Filter, Clock, Briefcase, Bell, Check, X } from 'lucide-react';

interface DashboardProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const AVAILABLE_TAGS = ['Python', 'React', 'SQL', 'Data Science', 'Yield Analysis', 'Firmware', 'Automation'];

const Dashboard: React.FC<DashboardProps> = ({ projects, onProjectClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  
  // Alert State
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [subscribedTags, setSubscribedTags] = useState<string[]>(['Python']); // Default sub

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || p.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const departments = ['All', ...Array.from(new Set(projects.map(p => p.department)))];

  const toggleTag = (tag: string) => {
    if (subscribedTags.includes(tag)) {
      setSubscribedTags(subscribedTags.filter(t => t !== tag));
    } else {
      setSubscribedTags([...subscribedTags, tag]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Internal Gigs</h1>
          <p className="text-slate-600 mt-2">Pick up a side project, help a team, earn Bravo Points.</p>
        </div>
        <button 
          onClick={() => setShowAlertModal(true)}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
        >
          <Bell className={`w-4 h-4 mr-2 ${subscribedTags.length > 0 ? 'text-blue-500 fill-blue-500' : ''}`} />
          Gig Alerts
          {subscribedTags.length > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {subscribedTags.length} Active
            </span>
          )}
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for projects, skills, or keywords..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-slate-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <select 
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white text-slate-900"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            onClick={() => onProjectClick(project)}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col group"
          >
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                  ${project.status === ProjectStatus.OPEN ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                  {project.status}
                </span>
                <span className="text-blue-600 font-bold flex items-center bg-blue-50 px-3 py-1 rounded-full text-sm">
                  ★ {project.bravoPoints}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {project.title}
              </h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map(skill => (
                  <span key={skill} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl flex justify-between items-center text-sm text-slate-500">
               <div className="flex items-center">
                 <Briefcase className="w-4 h-4 mr-1.5" />
                 {project.department}
               </div>
               <div className="flex items-center">
                 <Clock className="w-4 h-4 mr-1.5" />
                 {project.bids.length} bids
               </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p className="text-lg">No projects found matching your search.</p>
        </div>
      )}

      {/* Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-blue-600" />
                Manage Gig Alerts
              </h3>
              <button onClick={() => setShowAlertModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">
                We'll notify you immediately when a new gig matches these topics. Don't miss an opportunity to earn points!
              </p>
              <div className="space-y-2">
                {AVAILABLE_TAGS.map(tag => {
                  const isSelected = subscribedTags.includes(tag);
                  return (
                    <div 
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-all
                        ${isSelected 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-white border-slate-200 hover:border-blue-300'}`}
                    >
                      <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>{tag}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                        ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
              <button 
                onClick={() => setShowAlertModal(false)}
                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;