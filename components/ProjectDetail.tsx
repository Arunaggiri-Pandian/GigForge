import React, { useState } from 'react';
import { Project, User, Bid } from '../types';
import { ArrowLeft, Clock, User as UserIcon, FileCode, Send, Sparkles, Loader2, Copy, CheckCircle, GitBranch } from 'lucide-react';
import { generateHandoverDocs } from '../services/geminiService';

interface ProjectDetailProps {
  project: Project;
  currentUser: User;
  onBack: () => void;
  onPlaceBid: (projectId: string, bid: Bid) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, currentUser, onBack, onPlaceBid }) => {
  const [bidAmount, setBidAmount] = useState(project.bravoPoints);
  const [bidComment, setBidComment] = useState('');
  const [showBidForm, setShowBidForm] = useState(false);

  // Handover State
  const [showHandover, setShowHandover] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [solutionCode, setSolutionCode] = useState('');
  const [isGeneratingDocs, setIsGeneratingDocs] = useState(false);
  const [generatedDocs, setGeneratedDocs] = useState('');

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBid: Bid = {
      id: `b-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      proposedPoints: bidAmount,
      comment: bidComment,
      timestamp: new Date()
    };
    onPlaceBid(project.id, newBid);
    setShowBidForm(false);
  };

  const handleGenerateDocs = async () => {
    if (!repoUrl) return;
    setIsGeneratingDocs(true);
    const docs = await generateHandoverDocs(project.title, repoUrl, solutionCode || "No specific code snippet provided. Please generate generic structure.");
    setGeneratedDocs(docs);
    setIsGeneratingDocs(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
                {project.department}
              </span>
              <span className="text-slate-400 text-sm">Posted on {project.postedDate.toLocaleDateString()}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-6">{project.title}</h1>
            
            <div className="prose prose-slate max-w-none text-slate-600 mb-8">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Description</h4>
              <p className="whitespace-pre-line leading-relaxed">{project.description}</p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {project.skills.map(skill => (
                  <span key={skill} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-sm font-medium">
                    {skill}
                  </span>
                ))}
                {project.skills.length === 0 && <span className="text-slate-400 italic text-sm">None specified</span>}
              </div>
            </div>
          </div>

          {/* AI Handover Generator */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
             <div className="flex items-center mb-4">
               <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                 <Sparkles className="w-5 h-5 text-indigo-600" />
               </div>
               <h3 className="text-xl font-bold text-slate-900">Submit Work & Generate Handover</h3>
             </div>
             <p className="text-slate-600 text-sm mb-6">
               Finished this gig? Provide the Bitbucket link below. Gemini will help you generate a professional <strong>MAINTENANCE.md</strong> guide for the team so you don't have to write it from scratch.
             </p>
             
             {!showHandover ? (
               <button 
                 onClick={() => setShowHandover(true)}
                 className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center shadow-sm"
               >
                 <FileCode className="w-5 h-5 mr-2 text-slate-500" />
                 Start Handover Process
               </button>
             ) : (
               <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                 {/* Repo Link Input */}
                 <div>
                   <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Bitbucket Repository URL <span className="text-red-500">*</span></label>
                   <div className="relative">
                     <GitBranch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                     <input 
                        type="text"
                        className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-white"
                        placeholder="https://bitbucket.micron.com/projects/..."
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                     />
                   </div>
                 </div>

                 {/* Code Context Input */}
                 <div>
                   <label className="block text-xs font-bold text-slate-700 mb-1 uppercase flex justify-between">
                     <span>Main Logic / Code Snippet</span>
                     <span className="text-slate-400 font-normal normal-case">Optional, gives AI context</span>
                   </label>
                   <textarea 
                     className="w-full p-3 text-sm border border-slate-300 rounded-lg text-slate-900 font-mono focus:ring-2 focus:ring-blue-500 outline-none bg-white h-32"
                     placeholder="// Paste the critical part of your script here so Gemini can describe the logic..."
                     value={solutionCode}
                     onChange={(e) => setSolutionCode(e.target.value)}
                   />
                 </div>
                 
                 {generatedDocs ? (
                   <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 relative mt-4">
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <span className="text-xs text-green-600 flex items-center font-medium bg-green-100 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3 mr-1" /> Generated
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 mb-2">MAINTENANCE.md Preview:</h4>
                      <div className="bg-white p-3 rounded text-xs font-mono text-slate-600 whitespace-pre-wrap h-64 overflow-y-auto border border-slate-200 shadow-inner">
                        {generatedDocs}
                      </div>
                      <div className="mt-3 flex justify-end">
                         <button 
                           onClick={() => setGeneratedDocs('')}
                           className="text-xs text-slate-500 hover:text-blue-600 underline"
                         >
                           Reset & Try Again
                         </button>
                      </div>
                   </div>
                 ) : (
                    <button 
                      onClick={handleGenerateDocs}
                      disabled={isGeneratingDocs || !repoUrl}
                      className={`w-full py-3 rounded-lg font-bold flex items-center justify-center transition-colors shadow-sm
                        ${isGeneratingDocs || !repoUrl 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                      {isGeneratingDocs ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" /> Generate Docs
                        </>
                      )}
                    </button>
                 )}
               </div>
             )}
          </div>

          {/* Bids Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
             <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
               Current Bids <span className="ml-3 bg-slate-100 text-slate-600 text-sm px-2 py-1 rounded-full">{project.bids.length}</span>
             </h3>
             
             <div className="space-y-4">
               {project.bids.length === 0 ? (
                 <p className="text-slate-500 italic">No bids yet. Be the first!</p>
               ) : (
                 project.bids.map(bid => (
                   <div key={bid.id} className="flex items-start p-4 rounded-lg bg-slate-50 border border-slate-100">
                     <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                       {bid.userName.charAt(0)}
                     </div>
                     <div className="flex-grow">
                       <div className="flex justify-between items-center mb-1">
                         <span className="font-bold text-slate-900">{bid.userName}</span>
                         <span className="text-sm font-mono font-semibold text-blue-600">{bid.proposedPoints} pts</span>
                       </div>
                       <p className="text-slate-600 text-sm mb-1">"{bid.comment}"</p>
                       <p className="text-xs text-slate-400">{bid.timestamp.toLocaleDateString()}</p>
                     </div>
                   </div>
                 ))
               )}
             </div>
          </div>
        </div>

        {/* Right Col: Sidebar / Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sticky top-24">
            <div className="flex items-center justify-center mb-6">
               <div className="text-center">
                 <span className="block text-slate-500 text-sm font-medium mb-1">Offering</span>
                 <span className="block text-4xl font-bold text-blue-600">★ {project.bravoPoints}</span>
               </div>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-6 mb-6">
              <div className="flex items-center text-slate-700">
                <UserIcon className="w-5 h-5 mr-3 text-slate-400" />
                <span className="font-medium">{project.requesterName}</span>
              </div>
              <div className="flex items-center text-slate-700">
                <Clock className="w-5 h-5 mr-3 text-slate-400" />
                <span>{project.status}</span>
              </div>
            </div>

            {!showBidForm ? (
              <button 
                onClick={() => setShowBidForm(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all transform active:scale-95"
              >
                Place a Bid
              </button>
            ) : (
              <form onSubmit={handleBidSubmit} className="bg-slate-50 p-4 rounded-lg border border-slate-200 animate-in fade-in zoom-in duration-200">
                <h4 className="font-bold text-slate-800 mb-3 text-sm">Submit Proposal</h4>
                
                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Points Requested</label>
                  <input 
                    type="number" 
                    className="w-full p-2 text-sm border border-slate-300 rounded bg-white shadow-sm text-slate-900"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Why you?</label>
                  <textarea 
                    className="w-full p-2 text-sm border border-slate-300 rounded resize-none bg-white shadow-sm text-slate-900"
                    rows={2}
                    placeholder="I have done similar work..."
                    value={bidComment}
                    onChange={(e) => setBidComment(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex gap-2">
                   <button 
                     type="button" 
                     onClick={() => setShowBidForm(false)}
                     className="flex-1 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded"
                   >
                     Cancel
                   </button>
                   <button 
                     type="submit" 
                     className="flex-1 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded"
                   >
                     Submit
                   </button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-400">
                By bidding, you agree to Micron's internal gig policies.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;