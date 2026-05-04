import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Users, 
  Building2, 
  Globe, 
  Sparkles, 
  Settings, 
  TrendingUp, 
  Coins 
} from "lucide-react";
import LegoBackground from "./components/kiosk/LegoBackground";
import LegoBrick, { type BrickColor } from "./components/kiosk/LegoBrick";
import BlueprintCard from "./components/kiosk/BlueprintCard";
import finzlyLogo from "./assets/finzly-logo.png";

const COLORS: Record<string, { color: BrickColor; label: string }> = {
  payment: { color: "green", label: "Payment Galaxy" },
  account: { color: "blue", label: "Account Galaxy" },
  trade: { color: "orange", label: "Trade Galaxy" },
  digital: { color: "purple", label: "Digital Galaxy" },
  token: { color: "yellow", label: "Token Galaxy" },
};

const LEVERS = [
  {
    id: 1, icon: <Zap size={48} />, title: "Embedded Banking",
    color: "blue" as BrickColor,
    benefit: "New non-interest revenue from your payment infrastructure",
    blocks: ["payment", "account"],
    description: "Monetize payment infrastructure by embedding it directly into the software your customers already use — ERP, AR/AP, or as API-as-a-Service. Account Galaxy adds accounts and ledger capabilities to the embedded stack.",
    howBanksUse: "Regional banks can embed Payment Galaxy's unified API into ERP platforms like SAP and NetSuite, enabling their business customers to initiate ACH, RTP, and Fedwire payments without leaving their workflow. Banks can also offer pay-by-bank embedded banking APIs for merchants and platforms — enabling direct account-to-account payments at checkout. Others license the stack as API-as-a-Service to fintechs for recurring fee revenue, with Account Galaxy providing the embedded accounts and ledger layer.",
    lego: [
      { galaxy: "payment", label: "Unified API", sub: "All rails, one connection" },
      { galaxy: "account", label: "Accounts & Ledger", sub: "Embedded account infrastructure" },
    ],
    outcomes: ["New non-interest revenue from API licensing", "Pay-by-bank APIs for merchants and platforms", "Deeper ERP/AR-AP integrations for sticky customers", "Attract SMB and mid-market segments"],
  },
  {
    id: 2, icon: <Users size={48} />, title: "Partner Banking",
    color: "purple" as BrickColor,
    benefit: "Power the fintech ecosystem under your brand — no middleware, no BaaS platform cost",
    blocks: ["payment", "account", "digital"],
    description: "Give your fintech partners a complete toolkit — unified payment rails, virtual accounts, and a white-label VAM portal — all directly connected, with no middleware or BaaS platform sitting in between.",
    howBanksUse: "Sponsor banks can use this stack to onboard embedded finance partners 10x faster. Payment Galaxy provides multi-rail access, Account Galaxy spins up thousands of virtual accounts for partner sub-ledgers, and Digital Galaxy delivers the branded VAM portal for managing virtual accounts, transactions, and recon — all under the bank's regulatory umbrella, without the cost and complexity of a BaaS middleware layer.",
    lego: [
      { galaxy: "payment", label: "Unified API", sub: "Partner payment rails" },
      { galaxy: "account", label: "Virtual Accounts", sub: "Fintech sub-ledgers" },
      { galaxy: "digital", label: "VAM Portal", sub: "White-label recon UX" },
    ],
    outcomes: ["Launch fintech partnerships in weeks not months", "Earn fee income on every partner transaction", "No middleware or BaaS platform cost", "Real-time reconciliation for all partners"],
  },
  {
    id: 3, icon: <Building2 size={48} />, title: "Specialty Deposits",
    color: "green" as BrickColor,
    benefit: "Launch vertical-specific deposit products in days",
    blocks: ["account", "token"],
    description: "Account Galaxy's composable deposit accounts cover every specialty structure. Token Galaxy extends this to tokenized deposit accounts — all on a unified ledger.",
    howBanksUse: "Banks can use Account Galaxy's composable deposit accounts to launch IOLTA, escrow, class action, and fintech accounts in days. Combined with virtual accounts, they enable automated collections and payment workflows with full reconciliation for corporate treasury clients. POBO/COBO services allow payments and collections on behalf of clients. Token Galaxy extends the stack to tokenized deposit accounts for institutional and digital asset clients.",
    lego: [
      { galaxy: "account", label: "Specialty Deposit Accounts", sub: "IOLTA · Escrow · Class Action Settlements" },
      { galaxy: "token", label: "Tokenized Deposit Account", sub: "Digital asset deposits" },
    ],
    outcomes: ["Launch IOLTA, escrow, class action, fintech accounts in days", "POBO/COBO service — payments and collections on behalf of clients", "Collections + payment automation with reconciliation", "Tokenized deposit accounts for institutional clients via Token Galaxy"],
  },
  {
    id: 4, icon: <Globe size={48} />, title: "FX & International",
    color: "orange" as BrickColor,
    benefit: "Compete with money-center banks on FX revenue",
    blocks: ["trade", "payment"],
    description: "FX STAR and FX STAR+ from Trade Galaxy are the gold standard for FX revenue, combined with Payment Galaxy for full multi-rail execution across all international payment channels.",
    howBanksUse: "Community and regional banks can start with FX STAR — our legendary FX platform — for multi-currency accounts and international wire execution. As they grow, they snap on FX STAR+ (FX on BankOS) to offer spot, forward, futures, and swap trading to commercial clients. Payment Galaxy ties it together with all-rails execution for international payments, competing directly with money-center banks.",
    lego: [
      { galaxy: "trade", label: "FX STAR", sub: "Our legendary FX platform" },
      { galaxy: "trade", label: "FX STAR+", sub: "FX on BankOS — Spot, Fwd, Futures, Swaps" },
      { galaxy: "payment", label: "Payment Galaxy", sub: "All rails — intl execution" },
    ],
    outcomes: ["New FX fee revenue from commercial clients", "Multi-currency accounts for international businesses", "Advanced FX instruments — compete with money-center banks", "Full international rails execution via Payment Galaxy"],
  },
  {
    id: 5, icon: <Sparkles size={48} />, title: "Digital Experiences",
    color: "red" as BrickColor,
    benefit: "Enterprise-grade business banking UX, ready to plug into your existing stack",
    blocks: ["digital"],
    description: "Digital Galaxy delivers four independently deployable experiences. Already in the ecosystem of many digital banking providers including Q2 — easily plug into experiences already in your bank.",
    howBanksUse: "Banks can embed Digital Galaxy's components to leapfrog competitors. We are already in the ecosystem of many digital banking providers including Q2, making it easy to plug in without disruption. The white-label partner experience gives fintechs a branded VAM portal. The SMB banking suite brings sophisticated positive pay, beneficiary management, and scheduled payments. Pay-by-bank enables account-to-account payments with no card rails. Consumer payments covers wires and instant payments for retail.",
    lego: [
      { galaxy: "digital", label: "SMB Banking", sub: "Positive pay, beneficiary mgmt, scheduled payments" },
      { galaxy: "digital", label: "Partner Experience", sub: "White-label VAM portal — virtual accounts, txns & recon" },
      { galaxy: "digital", label: "Pay-by-Bank", sub: "Account-to-account payment experiences" },
      { galaxy: "digital", label: "Consumer Payments", sub: "Wires and instant payments" },
    ],
    outcomes: ["Match the largest bank digital experiences", "Already in the Q2 and broader digital banking ecosystem", "Pay-by-bank — no card rails, lower cost", "White-label partner VAM portal for fintechs under your brand"],
  },
  {
    id: 6, icon: <Settings size={48} />, title: "Payment Modernization",
    color: "blue" as BrickColor,
    benefit: "Modernize at your pace — modular transformation, rail by rail",
    blocks: ["payment"],
    description: "Payment Galaxy is the award-winning unified orchestration engine. Each rail is an independent building block — adopt one, combine all, or use purely for orchestration.",
    howBanksUse: "Banks can take three paths: modular transformation and surround-and-shrink (replace legacy rails one by one while the old core runs in parallel), full unification of all rails under one engine, or pure payment orchestration — routing across existing processors to optimize cost and speed without ripping out legacy. The orchestration layer is also the perfect on-ramp for incumbents looking to modernize without disruption.",
    lego: [
      { galaxy: "payment", label: "Fedwire", sub: "High-value wire processing" },
      { galaxy: "payment", label: "ACH", sub: "Batch payment processing" },
      { galaxy: "payment", label: "RTP + FedNow", sub: "Real-time rails" },
      { galaxy: "payment", label: "SWIFT", sub: "International messaging" },
      { galaxy: "payment", label: "Tokenized Rails", sub: "On-chain payment execution" },
      { galaxy: "payment", label: "Payment Orchestration", sub: "Route across all rails" },
    ],
    outcomes: ["Modular transformation — surround and shrink legacy core", "Unify all rails under one engine", "Pure orchestration for incumbents — no rip and replace", "Award-winning reliability — $50B+ processed"],
  },
  {
    id: 7, icon: <TrendingUp size={48} />, title: "Trade Finance & Swaps",
    color: "orange" as BrickColor,
    benefit: "Retain complex deals you'd previously refer out",
    blocks: ["trade"],
    description: "EXIM STAR and Swap STAR from Trade Galaxy let you offer letters of credit, bank guarantees, and derivative products — revenue streams previously only available to large banks.",
    howBanksUse: "Mid-size banks can use EXIM STAR to offer import/export financing (LCs, guarantees, collections) to their business clients for the first time. Swap STAR opens derivative revenue — interest rate swaps, credit default swaps, and structured products — to banks that previously had to refer those deals to larger competitors.",
    lego: [
      { galaxy: "trade", label: "EXIM STAR", sub: "LCs, guarantees, collections" },
      { galaxy: "trade", label: "Swap STAR", sub: "IRS, CDS, structured products" },
    ],
    outcomes: ["Offer letters of credit and bank guarantees to importers/exporters", "Earn swap fee income — retain deals you'd previously refer out", "Interest rate swaps for commercial loan hedging", "Compete with regional and money-center banks for complex deals"],
  },
  {
    id: 8, icon: <Coins size={48} />, title: "Tokenized Deposits",
    color: "yellow" as BrickColor,
    benefit: "Future-proof your deposit strategy for the digital economy",
    blocks: ["payment", "account", "token"],
    description: "Token Galaxy is the value orchestration layer where blockchain is invisible plumbing. Payment Galaxy processes unified fiat and tokenized rails. Account Galaxy provides the unified ledger for fiat and tokenized assets.",
    howBanksUse: "Banks can use Token Galaxy to issue tokenized deposit products for institutional clients — enabling programmable payments, instant settlement, and 24/7 liquidity. The unified ledger eliminates the need for separate systems for digital and traditional assets, while on-chain rails open access to DeFi liquidity pools and stablecoin settlement networks. Blockchain is invisible to end users — it's simply the plumbing underneath.",
    lego: [
      { galaxy: "payment", label: "Payment Galaxy", sub: "Unified fiat + tokenized rails processing" },
      { galaxy: "account", label: "Account Galaxy", sub: "Unified ledger for fiat and tokenized assets" },
      { galaxy: "token", label: "Token Galaxy", sub: "Value orchestration — blockchain as invisible plumbing" },
    ],
    outcomes: ["Easily join a consortium with confidence", "Issue tokenized deposits with complete ledger and settlement control", "Provide wallet experience for digital assets", "Unified ledger — no separate systems for digital assets"],
  },
];

export default function App() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const activeLever = LEVERS.find(l => l.id === activeId);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col font-sans">
      <LegoBackground />

      {/* Brand Logo */}
      <div className="absolute top-10 left-10 z-20">
        <img 
          src={finzlyLogo} 
          alt="Finzly Logo" 
          className="h-10 w-auto opacity-90"
        />
      </div>

      {/* Kiosk Header */}
      <header className="pt-24 pb-10 text-center relative z-10">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl font-black tracking-tighter text-slate-900 uppercase mb-4 drop-shadow-sm font-outfit"
        >
          Build Your Bank
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl text-slate-500 font-bold uppercase tracking-widest font-outfit"
        >
          Select a capability to explore the architecture
        </motion.p>
      </header>

      {/* 3D Lego Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-10 pb-20 overflow-y-auto custom-scrollbar relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20 pt-10">
          {LEVERS.map((lever, index) => (
            <motion.div
              key={lever.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center"
              onClick={() => setActiveId(lever.id)}
            >
              <LegoBrick
                color={lever.color}
                width={220}
                height={100}
                studsX={4}
                label={lever.title}
                isHovered={true}
                className="cursor-pointer"
              />
              <div className="mt-8 text-center px-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{lever.benefit.split(" ").slice(0, 3).join(" ")}...</p>
                <div className="h-1 w-12 bg-black/5 mx-auto rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Detail View Overlay */}
      <AnimatePresence>
        {activeLever && (
          <BlueprintCard 
            lever={activeLever} 
            onClose={() => setActiveId(null)} 
          />
        )}
      </AnimatePresence>

      {/* Footer / System Status */}
      <footer className="p-8 border-t border-black/5 bg-white/60 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            {Object.entries(COLORS).map(([name, data]) => (
               <div key={name} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 border border-black/5">
                 <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: `hsl(var(--lego-${data.color}))` }} />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{data.label}</span>
               </div>
            ))}
          </div>
          <div className="text-right">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Galaxy Orchestration Engine v4.0.2</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
