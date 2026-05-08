import React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { playTabChange, playClose } from "../../lib/sounds";
import brianPhoto from "../../assets/brian.jpeg";
import samPhoto from "../../assets/sam.jpg";
import scottPhoto from "../../assets/scott.jpg";
import melissaPhoto from "../../assets/melissa.jpg";
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
      onClick={() => { playClose(); onClose(); }}
    >
      {/* Fixed height so modal doesn't resize between tabs */}
      <div
        className="kiosk-modal-shell w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-slate-200 flex flex-row justify-between items-start bg-white gap-4 shrink-0">
          <div className="flex flex-1 gap-4 items-center">
            <div className="text-primary p-3 bg-white rounded-xl shadow-sm border border-black/5 shrink-0">
              {lever.icon}
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 font-outfit leading-none">{lever.title}</h2>
              <p className="text-xs md:text-sm text-slate-400 font-medium font-outfit mt-0.5">{lever.benefit}</p>
            </div>
          </div>
          <button
            onClick={() => { playClose(); onClose(); }}
            className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors border border-black/5 shrink-0"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Tabs — underline style */}
        <div className="flex bg-white px-4 md:px-6 border-b border-slate-200 shrink-0">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => { playTabChange(); setActiveTab(tab.id); }}
              className={`flex-1 flex items-center justify-center py-2.5 md:py-3 text-sm md:text-base font-black transition-all font-outfit border-b-2 -mb-px ${activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content — fills remaining height */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-slate-50">

          {/* Building Blocks — description top, cards + connectors bottom */}
          {activeTab === "blocks" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col h-full"
            >
              <p className="text-base text-slate-600 leading-relaxed mb-4 border-l-4 border-primary pl-3 font-normal">
                {lever.description}
              </p>
              <div className="mt-auto pt-2">
                <div className="flex flex-wrap items-center gap-y-3 gap-x-1">
                  {lever.lego.map((block, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && (
                        <span className="text-slate-300 font-black text-xl px-1 shrink-0">+</span>
                      )}
                      <div className="glass-panel p-3 rounded-xl flex flex-col gap-1 luxury-shine shrink-0">
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 font-outfit whitespace-nowrap">
                          {block.galaxy.charAt(0).toUpperCase() + block.galaxy.slice(1)} Galaxy
                        </span>
                        <h4 className="text-sm md:text-base font-black text-slate-900 font-outfit">{block.label}</h4>
                        <p className="text-sm text-slate-500 font-normal max-w-[150px]">{block.sub}</p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                {lever.lego.length > 1 && (
                  <div className="mt-4">
                    <span className="text-xs px-4 py-1.5 rounded-full font-bold font-outfit bg-primary/10 text-primary border border-primary/20">
                      Snaps together seamlessly
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "use-case" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="glass-panel p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50">
                <p className="text-sm md:text-xl text-slate-700 leading-relaxed md:leading-snug font-normal font-outfit">
                  {lever.howBanksUse}
                </p>
              </div>
            </motion.div>
          )}

          {/* Business Outcomes — left: single card with bullet list; right: large QR */}
          {activeTab === "outcomes" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1 glass-panel p-5 md:p-6 rounded-2xl">
                  <div className="space-y-3">
                    {lever.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="bg-primary/10 p-1 rounded-full border border-primary/20 shrink-0 mt-0.5">
                          <CheckCircle2 className="text-primary w-3.5 h-3.5" />
                        </div>
                        <span className="text-base font-normal text-slate-700 font-outfit leading-snug">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:w-52 glass-panel p-5 rounded-2xl flex flex-col items-center justify-center gap-3 shrink-0">
                  <div className="text-center">
                    <div className="text-base font-medium text-slate-800 font-outfit">Download the brochure</div>
                    <div className="text-sm font-normal text-slate-500 font-outfit mt-1">Scan QR or ask your sales rep</div>
                  </div>
                  <div className="w-36 h-36 bg-white rounded-xl border border-slate-200 overflow-hidden p-1 shrink-0">
                    <img src={finzlyQr} alt="Finzly QR Code" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Speak to Sales — intro text, larger photos, underlined footer */}
          {activeTab === "team" && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-slate-500 text-base mb-5 font-normal font-outfit">
                Ready to explore {lever.title} for your bank? Our team will build your custom roadmap.
              </p>
              <div className="flex flex-wrap gap-5 justify-center mb-6">
                {reps.map(rep => (
                  <div
                    key={rep.name}
                    className="glass-panel flex flex-col items-center gap-3 p-5 rounded-2xl"
                    style={{ minWidth: "140px" }}
                  >
                    <img
                      src={rep.photo}
                      alt={rep.name}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                      style={{ border: `3px solid ${rep.color}` }}
                    />
                    <div className="text-center">
                      <div className="font-black text-base text-slate-900 font-outfit">{rep.name}</div>
                      <div className="text-xs text-slate-500 leading-snug font-outfit">{rep.role}</div>
                      <div className="text-xs text-slate-400 font-outfit">{rep.region}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <span className="text-base font-normal font-outfit text-primary underline underline-offset-4 decoration-primary/50">
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
