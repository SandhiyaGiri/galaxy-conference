import React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, FileText, Users, Lightbulb, Target } from "lucide-react";

interface BlueprintCardProps {
  lever: {
    icon: React.ReactNode;
    title: string;
    benefit: string;
    description: string;
    howBanksUse: string;
    lego: Array<{ galaxy: string; label: string; sub: string }>;
    outcomes: string[];
  };
  onClose: () => void;
}

export default function BlueprintCard({ lever, onClose }: BlueprintCardProps) {
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60"
      onClick={onClose}
    >
      <div 
        className="kiosk-modal-shell w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-8 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start bg-white gap-4 md:gap-0">
          <div className="flex gap-4 md:gap-6 items-center">
            <div className="text-primary p-3 md:p-4 bg-white rounded-xl md:rounded-2xl shadow-sm border border-black/5">
              {lever.icon}
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase font-outfit">{lever.title}</h2>
              <p className="text-sm md:text-lg text-slate-500 font-bold font-outfit">{lever.benefit}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors border border-black/5"
          >
            <X size={32} className="text-slate-400" />
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap md:flex-nowrap bg-slate-100 p-2 gap-2 border-b border-slate-200">
          {[
            { id: "overview", label: "Blueprint", icon: FileText },
            { id: "use-case", label: "Deployment", icon: Lightbulb },
            { id: "outcomes", label: "Business Impact", icon: Target },
            { id: "team", label: "Connect", icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 rounded-xl text-xs md:text-sm font-black uppercase tracking-widest transition-all font-outfit min-w-[140px] md:min-w-0 ${
                activeTab === tab.id 
                  ? "bg-white text-primary shadow-lg border border-black/5" 
                  : "text-slate-400 hover:text-slate-700 hover:bg-slate-200"
              }`}
            >
              <tab.icon size={18} className="md:w-5 md:h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-slate-50">
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-base md:text-xl text-slate-600 leading-relaxed mb-8 md:mb-10 border-l-4 border-primary pl-4 md:pl-6 font-medium">
                {lever.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {lever.lego.map((block: any, i: number) => (
                  <div key={i} className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col gap-1 md:gap-2 luxury-shine">
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 font-outfit">{block.galaxy} capability</span>
                    <h4 className="text-xl md:text-2xl font-black text-slate-900 font-outfit">{block.label}</h4>
                    <p className="text-xs md:text-sm text-slate-500 font-medium">{block.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "use-case" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="glass-panel p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50">
                <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-primary mb-4 md:mb-6 font-outfit">Strategic Implementation</h4>
                <p className="text-lg md:text-2xl text-slate-700 leading-relaxed md:leading-snug font-bold font-outfit italic">
                  "{lever.howBanksUse}"
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "outcomes" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 gap-4">
              {lever.outcomes.map((outcome: string, i: number) => (
                <div key={i} className="flex items-center gap-4 md:gap-6 p-4 md:p-6 glass-panel rounded-2xl">
                  <div className="bg-primary/10 p-2 md:p-3 rounded-full border border-primary/20 shrink-0">
                    <CheckCircle2 className="text-primary w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <span className="text-lg md:text-2xl font-bold text-slate-800 tracking-tight font-outfit leading-tight">{outcome}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-center py-6 md:py-10">
              <h3 className="text-2xl md:text-4xl font-black text-slate-900 uppercase mb-4 font-outfit">Ready to Build?</h3>
              <p className="text-slate-500 text-sm md:text-lg mb-8 md:mb-12 max-w-lg mx-auto font-bold font-outfit">
                Scan the QR code on the kiosk or tap below to request a deep-dive session with our product architects.
              </p>
              <div className="flex justify-center gap-8">
                <button className="kiosk-modal-primary-button max-w-xs h-16 md:h-20 text-sm md:text-lg shadow-xl shadow-primary/20">
                  Request Architecture Call
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 bg-white border-t border-slate-200 flex flex-col md:flex-row justify-between items-center px-6 md:px-10 gap-2 md:gap-0">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#8a5cf5]" />
             <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-slate-400 font-outfit">Finzly Galaxy Engine // Active System</span>
          </div>
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-slate-300 font-outfit">© 2026 Finzly Inc. All Rights Reserved.</span>
        </div>
      </div>
    </motion.div>
  );
}
