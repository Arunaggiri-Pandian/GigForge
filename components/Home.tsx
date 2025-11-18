import React, { useState } from 'react';
import { ArrowRight, Search, PlusCircle, Zap, HelpCircle, Cpu, ShieldCheck, BarChart3, ChevronDown, ChevronUp, ClipboardCheck, Bell, FileCode } from 'lucide-react';

interface HomeProps {
  onNavigate: (view: 'dashboard' | 'create') => void;
}

interface FAQData {
  question: string;
  answer: string;
  icon: React.ElementType;
}

const FAQItem: React.FC<FAQData> = ({ icon: Icon, question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${isOpen ? 'border-blue-400 shadow-md' : 'border-slate-200 shadow-sm hover:border-blue-300'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
      >
        <div className="flex items-center">
          <div className={`p-2 rounded-lg mr-4 transition-colors ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-500'}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-blue-800' : 'text-slate-800 group-hover:text-blue-600'}`}>
            {question}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-400 flex-shrink-0 ml-4" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 pt-0 pl-[4.5rem] animate-in fade-in slide-in-from-top-2 duration-200">
           <div className="border-t border-slate-100 pt-4">
             <p className="text-slate-600 text-sm leading-relaxed">
               {answer}
             </p>
           </div>
        </div>
      )}
    </div>
  );
};

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  
  const faqs: FAQData[] = [
    {
      question: "Will this distract from primary KPIs?",
      answer: "No. GigForge is strictly designed for \"spare cycles\" or personal development time. It allows engineers to learn new skills (e.g., a Firmware engineer learning React) while solving real company problems, but it should never replace core responsibilities.",
      icon: BarChart3
    },
    {
      question: "How is this different from an IT Ticket?",
      answer: "IT tickets are for production-critical, full-time resource requirements. GigForge is for \"Shadow IT\" efficiency tools, quick scripts, and prototypes that would otherwise wait months in the backlog.",
      icon: Cpu
    },
    {
      question: "Do I need to check the dashboard daily?",
      answer: "No. You can set up \"Gig Alerts\" for your specific skills (like #Python or #YieldAnalysis). We will notify you immediately when a matching project is posted so you never miss an opportunity.",
      icon: Bell
    },
    {
      question: "Is the code secure?",
      answer: "Yes. This is an internal-only portal. No code or data leaves the Micron intranet. All projects must adhere to standard Micron IP protection policies.",
      icon: ShieldCheck
    },
    {
      question: "How do duplicate checks work?",
      answer: "We use Google's Gemini AI to perform semantic analysis on every new proposal against our existing database. This prevents multiple teams from rebuilding the same \"Wafer Map Viewer\" simultaneously.",
      icon: Search
    },
    {
      question: "Where does the budget come from?",
      answer: "Points are deducted from the requesting department's existing Bravo Recognition Budget. We are simply making the distribution of these rewards more meritocratic and task-based.",
      icon: Zap
    },
    {
      question: "How is Quality Assurance handled?",
      answer: "The \"Requester\" acts as the QA. They do not release the Bravo Points until the tool is verified and a basic Handover Document is provided for future maintenance.",
      icon: ClipboardCheck
    },
    {
      question: "Does the system help with documentation?",
      answer: "Yes! We integrated an AI Handover Generator. When you finish a gig, simply paste your code logic or Bitbucket link, and Gemini will automatically generate a professional MAINTENANCE.md guide for the team.",
      icon: FileCode
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 px-4 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
           <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
           <div className="absolute bottom-0 left-20 w-72 h-72 rounded-full bg-purple-500 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
            <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">Internal Beta • Micron Technology</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Accelerate Innovation with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              GigForge
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Don't let small tasks block big progress. Use your <strong>Bravo Points</strong> to crowd-source solutions from talented colleagues across Micron. 
            <br/><span className="text-blue-300 font-medium">Designed for spare cycles, not full-time assignments.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center group"
            >
              Explore Gigs 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('create')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center"
            >
              <PlusCircle className="mr-2 w-5 h-5" />
              Post a Project
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How GigForge Works</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            A streamlined ecosystem designed to unblock teams and reward initiative using <strong>spare time</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <Cpu className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">1. Post a Request</h3>
            <p className="text-slate-600 leading-relaxed">
              Describe your bottleneck. Our <strong>Gemini AI</strong> engine instantly scans the internal database to ensure you aren't duplicating existing efforts.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
              <Search className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">2. Discover & Bid</h3>
            <p className="text-slate-600 leading-relaxed">
              Engineers with <strong>free time</strong> browse gigs. They bid on your project with a timeline and Bravo Point request.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">3. Reward Success</h3>
            <p className="text-slate-600 leading-relaxed">
              Once the work is delivered and verified by you, Bravo Points are automatically transferred to the solver's profile.
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Section (Accordion Style) */}
      <section className="bg-slate-50 py-20 px-4 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-12">
             <HelpCircle className="w-6 h-6 text-blue-600 mr-3" />
             <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm">
              Still have questions? Contact <a href="#" className="text-blue-600 hover:underline">Internal IT HR Support</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;