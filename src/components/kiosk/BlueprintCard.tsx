import React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import brianPhoto from "../../assets/brian.jpeg";
import samPhoto from "../../assets/sam.jpg";
import scottPhoto from "../../assets/scott.jpg";
import melissaPhoto from "../../assets/melissa.webp";
import chrisPhoto from "../../assets/chris.jpeg";
import stevePhoto from "../../assets/steve.jpg";
import finzlyQr from "../../assets/finzly-qr.png";

const ALL_REPS: Record<string, { name: string; role: string; region: string; color: string; photo: string }> = {
  brian: { name: "Brian", role: "FX & Trade Specialist", region: "Global", color: "#1D9E75", photo: brianPhoto },
  sam: { name: "Sam", role: "Enterprise Banking", region: "Northeast", color: "#378ADD", photo: samPhoto },
  scott: { name: "Scott", role: "Payments Lead", region: "Midwest", color: "#7F77DD", photo: scottPhoto },
  melissa: { name: "Melissa", role: "Digital Experiences", region: "South", color: "#D85A30", photo: melissaPhoto },
  chris: { name: "Chris", role: "Partner Banking", region: "West", color: "#BA7517", photo: chrisPhoto },
  steve: { name: "Steve T", role: "Token & Digital Assets", region: "Global", color: "#993556", photo: stevePhoto },
};

interface BlueprintCardProps {
  lever: {
    icon: React.ReactNode;
    title: string;
    benefit: string;
    description: string;
    howBanksUse: string;
    blocks: string[];
    lego: Array<{ galaxy: string; label: string; sub: string }>;
    outcomes: string[];
    reps: string[];
  };
  onClose: () => void;
}

const TABS = [
  { id: "blocks", label: "Building Blocks" },
  { id: "use-case", label: "How Banks Can Use It" },
  { id: "outcomes", label: "Business Outcomes" },
  { id: "team", label: "Speak to Sales" },
];

export default function BlueprintCard({ lever, onClose }: BlueprintCardProps) {
  const [activeTab, setActiveTab] = React.useState("blocks");
  const reps = (lever.reps || []).map(k => ALL_REPS[k]).filter(Boolean);

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
        <div className="p-4 md:p-8 border-b border-slate-200 flex flex-row justify-between items-start bg-white gap-4">
          <div className="flex flex-1 gap-4 md:gap-6 items-center">
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

        {/* Tabs */}
        <div className="flex flex-wrap md:flex-nowrap bg-slate-100 p-2 gap-2 border-b border-slate-200">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center py-3 md:py-4 rounded-xl text-xs md:text-sm font-black transition-all font-outfit ${activeTab === tab.id
                ? "bg-white text-primary shadow-lg border border-black/5"
                : "text-slate-400 hover:text-slate-700 hover:bg-slate-200"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-slate-50">

          {activeTab === "blocks" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-base md:text-xl text-slate-600 leading-relaxed mb-8 md:mb-10 border-l-4 border-primary pl-4 md:pl-6 font-medium">
                {lever.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {lever.lego.map((block, i) => (
                  <div key={i} className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col gap-1 md:gap-2 luxury-shine">
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 font-outfit">
                      {block.galaxy.charAt(0).toUpperCase() + block.galaxy.slice(1)} Galaxy
                    </span>
                    <h4 className="text-xl md:text-2xl font-black text-slate-900 font-outfit">{block.label}</h4>
                    <p className="text-xs md:text-sm text-slate-500 font-medium">{block.sub}</p>
                  </div>
                ))}
              </div>
              {lever.lego.length > 1 && (
                <div className="mt-6">
                  <span className="text-xs px-4 py-1.5 rounded-full font-bold font-outfit bg-primary/10 text-primary border border-primary/20">
                    Snaps together seamlessly
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "use-case" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="glass-panel p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50">
                <p className="text-lg md:text-2xl text-slate-700 leading-relaxed md:leading-snug font-bold font-outfit">
                  {lever.howBanksUse}
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "outcomes" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {lever.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 glass-panel rounded-2xl">
                    <div className="bg-primary/10 p-1.5 rounded-full border border-primary/20 shrink-0 mt-0.5">
                      <CheckCircle2 className="text-primary w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 font-outfit leading-snug">{outcome}</span>
                  </div>
                ))}
              </div>
              {/* QR / brochure */}
              <div className="glass-panel p-4 rounded-2xl flex items-center gap-4">
                <span className="text-2xl shrink-0">📱</span>
                <div>
                  <div className="text-sm font-black text-slate-800 font-outfit">Download the brochure</div>
                  <div className="text-xs text-slate-500 font-outfit">Scan QR or ask your sales rep</div>
                </div>
                <div className="ml-auto w-16 h-16 bg-white rounded-xl border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden p-1">
                  <img src={finzlyQr} alt="Finzly QR Code" className="w-full h-full object-contain" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-slate-500 text-sm md:text-base mb-6 md:mb-8 font-bold font-outfit">
                Ready to explore {lever.title} for your bank? Our team will build your custom roadmap.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-6">
                {reps.map(rep => (
                  <div
                    key={rep.name}
                    className="glass-panel flex flex-col items-center gap-2 p-4 md:p-5 rounded-2xl"
                    style={{ minWidth: "120px" }}
                  >
                    <img
                      src={rep.photo}
                      alt={rep.name}
                      className="w-14 h-14 rounded-full object-cover border-2"
                      style={{ borderColor: rep.color }}
                    />
                    <div className="text-center">
                      <div className="font-black text-sm text-slate-900 font-outfit">{rep.name}</div>
                      <div className="text-[11px] text-slate-500 leading-snug font-outfit">{rep.role}</div>
                      <div className="text-[11px] text-slate-400 font-outfit">{rep.region}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <span className="text-sm px-6 py-2 rounded-full font-bold font-outfit bg-primary/10 text-primary border border-primary/20">
                  Feel free to connect
                </span>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </motion.div>
  );
}
