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
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-500/10 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="kiosk-modal-shell w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 border-b border-black/5 flex justify-between items-start bg-white/40">
          <div className="flex gap-6 items-center">
            <div className="text-primary p-4 bg-white rounded-2xl shadow-sm border border-black/5">
              {lever.icon}
            </div>
            <div>
              <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase font-outfit">{lever.title}</h2>
              <p className="text-lg text-slate-500 font-bold font-outfit">{lever.benefit}</p>
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
        <div className="flex bg-slate-50/50 p-2 gap-2 border-b border-black/5">
          {[
            { id: "overview", label: "Blueprint", icon: FileText },
            { id: "use-case", label: "Deployment", icon: Lightbulb },
            { id: "outcomes", label: "Business Impact", icon: Target },
            { id: "team", label: "Connect", icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all font-outfit ${
                activeTab === tab.id 
                  ? "bg-white text-primary shadow-lg border border-black/5" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-white/40"
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-white/20">
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-xl text-slate-600 leading-relaxed mb-10 border-l-4 border-primary pl-6 font-medium">
                {lever.description}
              </p>
              <div className="grid grid-cols-2 gap-6">
                {lever.lego.map((block: any, i: number) => (
                  <div key={i} className="glass-panel p-6 rounded-2xl border-black/5 flex flex-col gap-2 luxury-shine bg-white/80">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 font-outfit">{block.galaxy} capability</span>
                    <h4 className="text-2xl font-black text-slate-900 font-outfit">{block.label}</h4>
                    <p className="text-sm text-slate-500 font-medium">{block.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "use-case" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="glass-panel p-8 rounded-3xl border-black/5 bg-gradient-to-br from-white to-slate-50">
                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-6 font-outfit">Strategic Implementation</h4>
                <p className="text-2xl text-slate-700 leading-snug font-bold font-outfit italic">
                  "{lever.howBanksUse}"
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "outcomes" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 gap-4">
              {lever.outcomes.map((outcome: string, i: number) => (
                <div key={i} className="flex items-center gap-6 p-6 glass-panel rounded-2xl border-black/5 bg-white/80">
                  <div className="bg-primary/10 p-3 rounded-full border border-primary/20">
                    <CheckCircle2 className="text-primary w-8 h-8" />
                  </div>
                  <span className="text-2xl font-bold text-slate-800 tracking-tight font-outfit">{outcome}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-center py-10">
              <h3 className="text-4xl font-black text-slate-900 uppercase mb-4 font-outfit">Ready to Build?</h3>
              <p className="text-slate-500 text-lg mb-12 max-w-lg mx-auto font-bold font-outfit">
                Scan the QR code on the kiosk or tap below to request a deep-dive session with our product architects.
              </p>
              <div className="flex justify-center gap-8">
                <button className="kiosk-modal-primary-button max-w-xs h-20 text-lg shadow-xl shadow-primary/20">
                  Request Architecture Call
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50/50 border-t border-black/5 flex justify-between items-center px-10">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#8a5cf5]" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 font-outfit">Finzly Galaxy Engine // Active System</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 font-outfit">© 2026 Finzly Inc. All Rights Reserved.</span>
        </div>
      </div>
    </motion.div>
  );
}
