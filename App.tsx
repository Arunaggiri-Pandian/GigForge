import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CreateProject from './components/CreateProject';
import ProjectDetail from './components/ProjectDetail';
import Home from './components/Home';
import { Project, Bid } from './types';
import { CURRENT_USER, MOCK_PROJECTS } from './constants';

type ViewState = 'home' | 'dashboard' | 'create' | 'detail';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Navigation Handlers
  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (view !== 'detail') {
      setSelectedProject(null);
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('detail');
  };

  const handleCreateProject = (newProjectData: Partial<Project>) => {
    const newProject: Project = {
      ...newProjectData,
      id: `p${Date.now()}`,
      skills: newProjectData.skills || [], // Ensure defaults
    } as Project;

    setProjects([newProject, ...projects]);
    setCurrentView('dashboard');
  };

  const handlePlaceBid = (projectId: string, bid: Bid) => {
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        return { ...p, bids: [...p.bids, bid] };
      }
      return p;
    });
    setProjects(updatedProjects);
    
    // Update selected project view as well
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject({ ...selectedProject, bids: [...selectedProject.bids, bid] });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar 
        user={CURRENT_USER} 
        onNavigate={(view: any) => handleNavigate(view)} 
        currentView={currentView}
      />

      <main>
        {currentView === 'home' && (
          <Home onNavigate={(view) => handleNavigate(view)} />
        )}

        {currentView === 'dashboard' && (
          <Dashboard 
            projects={projects} 
            onProjectClick={handleProjectClick} 
          />
        )}

        {currentView === 'create' && (
          <CreateProject 
            existingProjects={projects}
            onCancel={() => handleNavigate('dashboard')}
            onSubmit={handleCreateProject}
          />
        )}

        {currentView === 'detail' && selectedProject && (
          <ProjectDetail 
            project={selectedProject}
            currentUser={CURRENT_USER}
            onBack={() => handleNavigate('dashboard')}
            onPlaceBid={handlePlaceBid}
          />
        )}
      </main>
    </div>
  );
};

export default App;