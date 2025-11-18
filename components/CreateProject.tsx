import React, { useState, useEffect } from 'react';
import { DEPARTMENTS } from '../constants';
import { Project, DuplicateCheckResult, ProjectStatus } from '../types';
import { checkForDuplicateProjects } from '../services/geminiService';
import { AlertTriangle, CheckCircle, Loader2, Info, ArrowRight } from 'lucide-react';

interface CreateProjectProps {
  existingProjects: Project[];
  onCancel: () => void;
  onSubmit: (newProject: Partial<Project>) => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({ existingProjects, onCancel, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [points, setPoints] = useState(100);
  
  // Smart Check States
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<DuplicateCheckResult | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  // Debounce mechanism for AI check
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (title.length > 5 && description.length > 10) {
        setIsChecking(true);
        const result = await checkForDuplicateProjects(title, description, existingProjects);
        setCheckResult(result);
        setHasChecked(true);
        setIsChecking(false);
      } else {
        setCheckResult(null);
        setHasChecked(false);
      }
    }, 1500); // Check 1.5s after user stops typing

    return () => clearTimeout(timeoutId);
  }, [title, description, existingProjects]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Block if duplicate is found and not acknowledged (can be enhanced)
    onSubmit({
      title,
      description,
      department,
      bravoPoints: points,
      status: ProjectStatus.OPEN,
      skills: [],
      bids: [],
      postedDate: new Date()
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
        <div className="bg-blue-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Propose New Project</h2>
          <p className="text-blue-100 mt-1">Offer Bravo Points to get help from other teams.</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Project Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-slate-900 shadow-sm"
                placeholder="e.g. Automated Log Parser for Metrology"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Department & Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                <select
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900 shadow-sm"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Offering (Bravo Points)</label>
                <input
                  type="number"
                  min="50"
                  step="50"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900 shadow-sm"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Detailed Description</label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white text-slate-900 shadow-sm"
                placeholder="Describe the problem, the expected solution, and any specific technologies needed."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-2 text-right">
                We'll automatically check for similar existing projects as you type.
              </p>
            </div>

            {/* AI Duplication Check Feedback Section */}
            <div className="mb-8 min-h-[100px]">
              {isChecking && (
                <div className="flex items-center text-blue-600 bg-blue-50 p-4 rounded-lg">
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  <span className="text-sm font-medium">Gemini is analyzing internal database for duplicates...</span>
                </div>
              )}

              {!isChecking && hasChecked && checkResult && !checkResult.isDuplicate && (
                <div className="flex items-start text-green-700 bg-green-50 p-4 rounded-lg border border-green-100">
                  <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold">Great! This looks like a unique project.</p>
                    <p className="text-xs mt-1 opacity-90">{checkResult.reason}</p>
                  </div>
                </div>
              )}

              {!isChecking && hasChecked && checkResult && checkResult.isDuplicate && (
                <div className="flex items-start text-amber-800 bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <AlertTriangle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-amber-600" />
                  <div>
                    <p className="text-sm font-bold text-amber-900">Potential Duplicate Found</p>
                    <p className="text-sm mt-1 mb-2">{checkResult.reason}</p>
                    {checkResult.similarProjectIds.length > 0 && (
                      <div className="bg-white/50 p-2 rounded text-xs border border-amber-100">
                        <strong>Similar Projects: </strong>
                        {checkResult.similarProjectIds.map(id => {
                          const p = existingProjects.find(ep => ep.id === id);
                          return p ? <span key={id} className="underline cursor-pointer mr-2 hover:text-amber-900">{p.title}</span> : null;
                        })}
                      </div>
                    )}
                    <div className="mt-3 text-xs bg-white inline-block px-2 py-1 rounded border border-amber-200 shadow-sm">
                      Consider joining the existing effort instead of creating a new one.
                    </div>
                  </div>
                </div>
              )}
              
              {!isChecking && !hasChecked && (
                <div className="flex items-center text-slate-400 bg-slate-50 p-4 rounded-lg border border-dashed border-slate-200">
                  <Info className="w-5 h-5 mr-3" />
                  <span className="text-sm">AI analysis will appear here once you provide enough details.</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isChecking || (checkResult?.isDuplicate === true)}
                className={`px-6 py-2 rounded-lg font-medium flex items-center text-white transition-colors
                  ${(isChecking || (checkResult?.isDuplicate === true)) 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
              >
                Submit Proposal <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;