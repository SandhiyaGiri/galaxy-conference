import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToggleRight } from "lucide-react";
import LegoBackground from "./components/kiosk/LegoBackground";
import LegoBrick, { type BrickColor } from "./components/kiosk/LegoBrick";
import BlueprintCard from "./components/kiosk/BlueprintCard";
import AttractScreen from "./components/kiosk/AttractScreen";
import EmailGateModal from "./components/kiosk/EmailGateModal";
import SessionEmailGate from "./components/kiosk/SessionEmailGate";
import { playCardOpen } from "./lib/sounds";
import { useIdleTimer } from "./hooks/useIdleTimer";
import finzlyLogo from "./assets/finzly-logo.png";
const BROCHURE_FX_URL = import.meta.env.VITE_BROCHURE_FX_URL ||
  "https://9127127.fs1.hubspotusercontent-na1.net/hubfs/9127127/2025/Case%20Studies/Umpqua%20Bank%20Case%20Study.pdf";
const BROCHURE_TRADE_URL = import.meta.env.VITE_BROCHURE_TRADE_URL ||
  "https://9127127.fs1.hubspotusercontent-na1.net/hubfs/9127127/2025/Case%20Studies/Arvest%20Case%20study.pdf";

const COLORS: Record<string, { color: BrickColor; label: string; textColor?: string }> = {
  payment: { color: "green", label: "Payment Galaxy", textColor: "hsl(145, 80%, 22%)" },
  account: { color: "blue", label: "Account Galaxy" },
  trade: { color: "orange", label: "Trade Galaxy" },
  digital: { color: "purple", label: "Digital Galaxy" },
  token: { color: "red", label: "Token Galaxy" },
};

const LEVERS = [
  {
    id: 1, icon: <ToggleRight size={48} />, title: "Embedded Banking",
    color: "blue" as BrickColor,
    benefit: "New non-interest revenue from your payment infrastructure",
    blocks: ["payment", "account"],
    description: "Monetize payment infrastructure by embedding it directly into the software your customers already use — ERP, AR/AP, or as API-as-a-Service. Go further by integrating Account Galaxy into their receivable and payable accounts.",
    howBanksUse: "Banks can allow their treasury customers to embed the unified payments API into ERP platforms like SAP and NetSuite, enabling their business customers to initiate ACH, RTP, and Fedwire payments without leaving their workflow. Banks can also offer pay-by-bank embedded banking APIs for merchants and platforms - enabling direct account-to-account payments at checkout. Some banks also choose to license the stack as API-as-a-Service to fintechs for recurring fee revenue, with Account Galaxy providing the embedded accounts and ledger layer.",
    lego: [
      { galaxy: "payment", label: "Unified API", sub: "All rails, one connection" },
      { galaxy: "account", label: "Accounts & Ledger", sub: "Embedded account infrastructure" },
    ],
    outcomes: ["New non-interest revenue from API licensing", "Pay-by-bank APIs for merchants and platforms", "Deeper ERP/AR-AP integrations for sticky customers", "Attract SMB and mid-market segments"],
    reps: ["steve"],
    brochure: { url: "https://9127127.fs1.hubspotusercontent-na1.net/hubfs/9127127/Embedded%20Banking%20-%20Finzly.pdf", name: "Embedded Banking - Finzly.pdf" },
  },
  {
    id: 2, icon: <ToggleRight size={48} />, title: "Partner Banking",
    color: "purple" as BrickColor,
    benefit: "Power the fintech ecosystem under your brand — no middleware, no BaaS platform cost",
    blocks: ["payment", "account", "digital"],
    description: "Give your fintech partners a complete toolkit — unified payment rails, virtual accounts, and a white-label VAM portal — all directly connected, with no middleware or BaaS platform sitting in between.",
    howBanksUse: "Sponsor banks can use this stack to onboard fintech partners much faster, cutting timelines from months to weeks with streamlined onboarding and partner management experience. Payment Galaxy provides multi-rail access, Account Galaxy spins up thousands of virtual accounts for partner sub-ledgers, and Digital Galaxy delivers the branded VAM portal for managing virtual accounts, transactions, and recon — all under the bank's regulatory umbrella, without the cost and complexity of a BaaS middleware layer.",
    lego: [
      { galaxy: "payment", label: "Unified API", sub: "Partner payment rails" },
      { galaxy: "account", label: "Virtual Accounts", sub: "Fintech sub-ledgers" },
      { galaxy: "digital", label: "VAM Portal", sub: "White-label recon UX" },
    ],
    outcomes: ["Launch fintech partnerships in weeks not months", "Earn fee income on every partner transaction", "No middleware or BaaS platform cost", "Real-time reconciliation for all partners"],
    reps: ["steve", "christian"],
    brochure: { url: "https://9127127.fs1.hubspotusercontent-na1.net/hubfs/9127127/Partner%20Banking%20-%20Finzly.pdf", name: "Partner Banking - Finzly.pdf" },
  },
  {
    id: 3, icon: <ToggleRight size={48} />, title: "Specialty Deposits",
    color: "green" as BrickColor,
    benefit: "Launch vertical-specific deposit products in days",
    blocks: ["account", "token"],
    description: "Account Galaxy's composable deposit accounts cover every specialty structure. Token Galaxy extends this to tokenized deposit accounts — all on a unified ledger.",
    howBanksUse: "Banks can use Account Galaxy's composable deposit accounts to launch IOLTA, escrow, class action, and fintech accounts in days. POBO/COBO services enable banks to manage payments and collections on behalf of their corporate and treasury clients. POBO/COBO services allow payments and collections on behalf of clients. Token Galaxy extends the stack to tokenized deposit accounts for institutional and digital asset clients.",
    lego: [
      { galaxy: "account", label: "Specialty Deposit Accounts", sub: "IOLTA · Escrow · Class Action Settlements" },
      { galaxy: "token", label: "Tokenized Deposit Account", sub: "Digital asset deposits" },
    ],
    outcomes: ["Launch IOLTA, escrow, class action, fintech accounts in days", "POBO/COBO service — payments and collections on behalf of clients", "Collections + payment automation with reconciliation", "Tokenized deposit accounts for institutional clients via Token Galaxy"],
    reps: ["sam", "scott", "melissa", "chris"],
    brochure: { url: "https://9127127.fs1.hubspotusercontent-na1.net/hubfs/9127127/Specialty%20deposits%20-%20Finzly.pdf", name: "Specialty deposits - Finzly.pdf" },
  },
  {
    id: 4, icon: <ToggleRight size={48} />, title: "FX & International",
    color: "orange" as BrickColor,
    benefit: "Compete with money-center banks on FX revenue",
    blocks: ["trade", "payment"],
    description: "FX STAR and FX STAR+ from Trade Galaxy represent the gold standard for FX revenue generation. When combined with Payment Galaxy, they enable an ideal end-to-end solution for FX and payments delivered from a single platform with full multi-rail execution across all international payment channels.",
    howBanksUse: "Banks can adopt FX STAR, the trusted and widely used flagship FX platform, delivering end-to-end functionality from multi-currency accounts and international wire execution to spot, forward, futures, and swap trading, alongside full front-, middle-, and back-office capabilities. For extended capability, FX STAR+ (FX on BankOS) integrates with Payment Galaxy for all-rails international payments, supporting seamless global execution and competitiveness with money-center banks.",
    lego: [
      { galaxy: "trade", label: "FX STAR", sub: "Our legendary FX platform" },
      { galaxy: "trade", label: "FX STAR+", sub: "FX on BankOS — Spot, Fwd, Futures, Swaps" },
      { galaxy: "payment", label: "Payment Galaxy", sub: "All rails — intl execution" },
    ],
    outcomes: ["New FX fee revenue from commercial clients", "Multi-currency accounts for international businesses", "Advanced FX instruments — compete with money-center banks", "Full international rails execution via Payment Galaxy"],
    reps: ["brian"],
    brochure: { url: BROCHURE_FX_URL, name: "Umpqua Bank Case Study.pdf" },
  },
  {
    id: 5, icon: <ToggleRight size={48} />, title: "Digital Experiences",
    color: "red" as BrickColor,
    benefit: "Enterprise-grade business banking UX, ready to plug into your existing stack",
    blocks: ["digital"],
    description: "To deliver modern, market-leading digital experiences, banks don’t need to rebuild from scratch or wait on vendor timelines. With Digital Galaxy, you can plug modular components into your existing platform and move faster without disruption. Easily deliver tailored experiences for SMBs, enterprises, fintech partners, and merchants, including pay-by-bank, using our flexible digital banking suite.",
    howBanksUse: "Banks can embed Digital Galaxy's components to leapfrog competitors. We are already in the ecosystem of many digital banking providers including Q2, making it easy to plug in without disruption. The white-label partner experience gives fintechs a branded VAM portal. The SMB banking suite brings sophisticated positive pay, beneficiary management, and scheduled payments. Pay-by-bank enables account-to-account payments with no card rails. Consumer payments covers wires and instant payments for retail.",
    lego: [
      { galaxy: "digital", label: "SMB Banking", sub: "Positive pay, beneficiary mgmt, scheduled payments" },
      { galaxy: "digital", label: "Partner Experience", sub: "White-label VAM portal — virtual accounts, txns & recon" },
      { galaxy: "digital", label: "Pay-by-Bank", sub: "Account-to-account payment experiences" },
      { galaxy: "digital", label: "Consumer Payments", sub: "Wires and instant payments" },
    ],
    outcomes: ["Match the largest bank digital experiences", "Already in the Q2 and broader digital banking ecosystem", "Pay-by-bank — no card rails, lower cost", "White-label partner VAM portal for fintechs under your brand"],
    reps: ["karuna", "christian"],
    brochure: { url: "https://9127127.fs1.hubspotusercontent-na1.net/hubfs/9127127/Integrated%20payables%20-%20Finzly.pdf", name: "Digital Galaxy - Finzly.pdf" },
  },
  {
    id: 6, icon: <ToggleRight size={48} />, title: "Payment Modernization",
    color: "blue" as BrickColor,
    benefit: "Modernize at your pace — modular transformation, rail by rail",
    blocks: ["payment"],
    description: "More than a hub, Payment Galaxy is a modular, end-to-end payments processing platform, delivering unified orchestration across both fiat and tokenized rails. Each rail is an independent building block: adopt one, combine many, or use it purely for orchestration. It’s an award-winning engine at the core of modern payments.",
    howBanksUse: "Banks can take three paths: modular transformation and surround-and-shrink (replace legacy rails one by one while the old core runs in parallel), full unification of all rails under one engine, or pure payment orchestration — routing across existing processors to optimize cost and speed without ripping out legacy. The orchestration layer is also the perfect on-ramp for incumbents looking to modernize without disruption.",
    lego: [
      { galaxy: "payment", label: "Fedwire", sub: "High-value wire processing" },
      { galaxy: "payment", label: "ACH", sub: "Batch payment processing" },
      { galaxy: "payment", label: "RTP + FedNow", sub: "Real-time rails" },
      { galaxy: "payment", label: "SWIFT", sub: "International payments" },
      { galaxy: "payment", label: "Tokenized Rails", sub: "On-chain payment execution" },
      { galaxy: "payment", label: "Payment Orchestration", sub: "Route across all rails" },
    ],
    outcomes: ["Modular transformation — surround and shrink legacy core", "Unify all rails under one engine", "Pure orchestration for incumbents — no rip and replace", "Battle-tested scalability for high-volume, mission-critical payment processing"],
    reps: ["brian", "sam", "scott", "melissa", "chris", "steve", "karuna", "christian"],
    brochure: { url: "https://9127127.fs1.hubspotusercontent-na1.net/hubfs/9127127/Payment%20Galaxy%20-%20Finzly.pdf", name: "Payment Galaxy - Finzly.pdf" },
  },
  {
    id: 7, icon: <ToggleRight size={48} />, title: "Trade Finance & Swaps",
    color: "orange" as BrickColor,
    benefit: "Retain complex deals you'd previously refer out",
    blocks: ["trade"],
    description: "EXIM STAR and SWAP STAR from Trade Galaxy let you offer letters of credit, bank guarantees, and derivative products — revenue streams previously only available to large banks.",
    howBanksUse: "Mid-size banks can use EXIM STAR to offer import/export financing (LCs, guarantees, collections) to their business clients for the first time. Swap STAR opens derivative revenue — interest rate swaps, credit default swaps, and structured products — to banks that previously had to refer those deals to larger competitors.",
    lego: [
      { galaxy: "trade", label: "EXIM STAR", sub: "LCs, guarantees, collections" },
      { galaxy: "trade", label: "SWAP STAR", sub: "IRS, CDS, structured products" },
    ],
    outcomes: ["Offer letters of credit and bank guarantees to importers/exporters", "Earn swap fee income — retain deals you'd previously refer out", "Interest rate swaps for commercial loan hedging", "Compete with large banks for complex deals"],
    reps: ["brian"],
    brochure: { url: BROCHURE_TRADE_URL, name: "Arvest Case study.pdf" },
  },
  {
    id: 8, icon: <ToggleRight size={48} />, title: "Tokenized Deposits",
    color: "red" as BrickColor,
    benefit: "Future-proof your deposit strategy for the digital economy",
    blocks: ["payment", "account", "token"],
    description: "Token Galaxy enables banks to actively participate in the tokenized economy. It leverages components of Payment Galaxy to orchestrate unified fiat and tokenized rails, while Account Galaxy provides a single, unified ledger for both fiat and tokenized assets. Together, they deliver the orchestration and infrastructure required to issue, move, and manage tokenized money at scale",
    howBanksUse: "Banks can use Token Galaxy to participate in industry consortia, issue their own tokenized deposits, or support commercial stablecoins. It provides future-proof infrastructure that adapts to evolving standards and market structures without locking institutions into a single model or ecosystem. This allows banks to innovate confidently while maintaining control, compliance, and interoperability across emerging digital asset networks.",
    lego: [
      { galaxy: "payment", label: "Payment Galaxy", sub: "Unified fiat + tokenized payment processing" },
      { galaxy: "account", label: "Account Galaxy", sub: "Unified ledger for fiat and tokenized assets" },
      { galaxy: "token", label: "Token Galaxy", sub: "Value orchestration — blockchain as invisible plumbing" },
    ],
    outcomes: ["Easily join a consortium with confidence", "Issue tokenized deposits with complete ledger and settlement control", "Provide wallet experience for digital assets", "Unified ledger — no separate systems for digital assets"],
    reps: ["steve"],
    brochure: { url: "https://9127127.fs1.hubspotusercontent-na1.net/hubfs/9127127/Token%20Galaxy%20-%20Finzly.pdf", name: "Token Galaxy - Finzly.pdf" },
  },
];

function recordDownload(email: string, leverTitle: string, brochureName: string, source: string) {
  const downloads = JSON.parse(localStorage.getItem("finzly_downloads") || "[]");
  const record = { email, leverTitle, brochureName, timestamp: new Date().toISOString(), source };
  downloads.push(record);
  localStorage.setItem("finzly_downloads", JSON.stringify(downloads));
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    }).catch(() => {});
  }
}

export default function App() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const activeLever = LEVERS.find(l => l.id === activeId);
  const [headerCycle, setHeaderCycle] = useState(0);
  const [entryKey, setEntryKey] = useState(0);
  const [showDownloadGate, setShowDownloadGate] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string>(() => sessionStorage.getItem("finzly_session_email") ?? "");
  const [pendingDownloadId, setPendingDownloadId] = useState<number | null>(null);
  const isIdle = useIdleTimer(120_000);
  const isMobile = window.innerWidth < 768;
  const wasIdle = useRef(false);

  const handleDownload = (pdfUrl: string, leverTitle: string, brochureName: string, source: string) => {
    window.open(pdfUrl, '_blank');
    recordDownload(sessionEmail, leverTitle, brochureName, source);
  };

  useEffect(() => {
    const id = setInterval(() => setHeaderCycle(c => c + 1), 5_000);
    return () => clearInterval(id);
  }, []);

  // When attract screen dismisses, replay card + header entrance animations
  // with a delay so they start appearing as the attract screen fades out.
  useEffect(() => {
    if (isIdle) {
      wasIdle.current = true;
    } else if (wasIdle.current) {
      wasIdle.current = false;
      const t = setTimeout(() => {
        setEntryKey(k => k + 1);
        setHeaderCycle(c => c + 1);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [isIdle]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const downloadParam = params.get("download");
    if (!downloadParam) return;
    const leverId = parseInt(downloadParam, 10);
    const lever = LEVERS.find(l => l.id === leverId);
    if (!lever) return;

    const storedEmail = sessionStorage.getItem("finzly_session_email");
    if (storedEmail) {
      window.open(lever.brochure.url, '_blank');
      recordDownload(storedEmail, lever.title, lever.brochure.name, "qr-scan");
      window.history.replaceState({}, "", window.location.pathname);
    } else if (isMobile) {
      setPendingDownloadId(leverId);
    } else {
      setShowDownloadGate(true);
      setPendingDownloadId(leverId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden md:overflow-hidden flex flex-col font-sans">
      <LegoBackground />

      {/* Mobile session email gate — one-time capture on first mobile load */}
      <AnimatePresence>
        {isMobile && !sessionEmail && (
          <SessionEmailGate
            onEmailCaptured={(email) => {
              setSessionEmail(email);
              sessionStorage.setItem("finzly_session_email", email);
              if (pendingDownloadId) {
                const lever = LEVERS.find(l => l.id === pendingDownloadId)!;
                handleDownload(lever.brochure.url, lever.title, lever.brochure.name, "qr-scan");
                setPendingDownloadId(null);
                window.history.replaceState({}, "", window.location.pathname);
              }
            }}
            pendingDownloadId={pendingDownloadId}
          />
        )}
      </AnimatePresence>

      {/* Desktop QR scan download gate */}
      <AnimatePresence>
        {showDownloadGate && pendingDownloadId && (() => {
          const lever = LEVERS.find(l => l.id === pendingDownloadId)!;
          return (
            <EmailGateModal
              pdfUrl={lever.brochure.url}
              title={lever.title}
              onClose={() => {
                setShowDownloadGate(false);
                setPendingDownloadId(null);
                window.history.replaceState({}, "", window.location.pathname);
              }}
              onEmailCaptured={(email) => {
                setSessionEmail(email);
                sessionStorage.setItem("finzly_session_email", email);
              }}
              dismissable={false}
              source="qr-scan"
            />
          );
        })()}
      </AnimatePresence>

      {/* Attract screen — shows on app load and after idle */}
      <AnimatePresence>
        {isIdle && !isMobile && <AttractScreen />}
      </AnimatePresence>

      {/* Brand Logo — desktop absolute */}
      <div className="absolute top-10 left-10 z-20 hidden md:block">
        <img src={finzlyLogo} alt="Finzly Logo" className="h-10 w-auto opacity-90" />
      </div>

      {/* Kiosk Header */}
      <header className="pt-6 md:pt-14 pb-4 md:pb-6 text-center relative z-10 px-4">
        {/* Mobile logo — in-flow, centered */}
        <div className="flex justify-center md:hidden mb-4">
          <img src={finzlyLogo} alt="Finzly Logo" className="h-8 w-auto opacity-90" />
        </div>
        {/* Keyed fragment — remounts every 10s to replay animations */}
        <div key={headerCycle}>
          {/* Title — each word punches up individually */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 uppercase mb-3 drop-shadow-sm font-outfit flex flex-wrap justify-center gap-x-[0.22em]">
            {["Mix.", "Match.", "Launch."].map((word, i) => (
              <motion.span
                key={word}
                className="inline-block"
                initial={{ opacity: 0, y: 52, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: i * 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "bottom center", display: "inline-block" }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle — slides up with blur clear */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.62, duration: 0.55, ease: "easeOut" }}
            className="text-sm md:text-lg text-slate-500 font-bold uppercase tracking-widest font-outfit mb-1"
          >
            Build your bank's future — one galaxy at a time.
          </motion.p>

          {/* Question — springs in */}
          <motion.p
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.88, duration: 0.5, type: "spring", stiffness: 260, damping: 18 }}
            className="text-base md:text-xl text-primary font-bold font-satoshi tracking-wide mb-2"
          >
            What's your next growth play?
          </motion.p>
        </div>
      </header>

      {/* 3D Lego Grid */}
      <main className="flex-1 max-w-[1500px] mx-auto w-full px-4 md:px-10 pb-10 md:overflow-y-auto custom-scrollbar relative z-10">
        <div key={entryKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-y-14 pt-4 md:pt-6">
          {LEVERS.map((lever, index) => (
            <motion.div
              key={lever.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="relative cursor-pointer flex flex-col"
              style={{ paddingTop: '44px' }}
              onClick={() => { playCardOpen(); setActiveId(lever.id); }}
            >
              {/* Title brick — static */}
              <div
                className="absolute z-10"
                style={{ top: '8px', left: '16px' }}
              >
                <LegoBrick
                  color={lever.color}
                  width={170}
                  height={72}
                  studsX={4}
                  label={lever.title}
                />
              </div>

              {/* Card body — flex-1 so all cards in a row share the same height */}
              <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-2xl px-5 pb-5" style={{ paddingTop: '40px' }}>
                <p className="flex-1 text-sm text-slate-600 leading-relaxed font-medium font-outfit mb-4">
                  {lever.benefit}
                </p>

                {/* Pill tags */}
                <div className="flex flex-wrap gap-2">
                  {lever.blocks.map(block => (
                    <span
                      key={block}
                      className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider font-outfit uppercase"
                      style={{
                        backgroundColor: `hsl(var(--lego-${COLORS[block].color}) / 0.12)`,
                        color: COLORS[block].textColor ?? `hsl(var(--lego-${COLORS[block].color}))`,
                      }}
                    >
                      {COLORS[block].label}
                    </span>
                  ))}
                </div>
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
            sessionEmail={sessionEmail}
            onDownload={(leverTitle, brochureName, source) => {
              const lever = LEVERS.find(l => l.title === leverTitle)!;
              handleDownload(lever.brochure.url, leverTitle, brochureName, source);
            }}
            onEmailCaptured={(email) => {
              setSessionEmail(email);
              sessionStorage.setItem("finzly_session_email", email);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
