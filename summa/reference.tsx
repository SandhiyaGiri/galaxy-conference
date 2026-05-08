import { useState } from "react";

const COLORS = {
    payment: { bg: "#1D9E75", light: "#E1F5EE", dark: "#085041", label: "Payment Galaxy" },
    account: { bg: "#378ADD", light: "#E6F1FB", dark: "#0C447C", label: "Account Galaxy" },
    trade: { bg: "#D85A30", light: "#FAECE7", dark: "#712B13", label: "Trade Galaxy" },
    digital: { bg: "#7F77DD", light: "#EEEDFE", dark: "#3C3489", label: "Digital Galaxy" },
    token: { bg: "#BA7517", light: "#FAEEDA", dark: "#633806", label: "Token Galaxy" },
};

const ALL_REPS = {
    brian: { name: "Brian", role: "FX & Trade Specialist", region: "Global", initials: "BK", color: "#1D9E75" },
    sam: { name: "Sam", role: "Enterprise Banking", region: "Northeast", initials: "SC", color: "#378ADD" },
    scott: { name: "Scott", role: "Payments Lead", region: "Midwest", initials: "SM", color: "#7F77DD" },
    melissa: { name: "Melissa", role: "Digital Experiences", region: "South", initials: "MR", color: "#D85A30" },
    chris: { name: "Chris", role: "Partner Banking", region: "West", initials: "CJ", color: "#BA7517" },
    steve: { name: "Steve T", role: "Token & Digital Assets", region: "Global", initials: "ST", color: "#993556" },
};

const LEVERS = [
    {
        id: 1, icon: "⚡", title: "Embedded Banking",
        benefit: "New non-interest revenue from your payment infrastructure",
        blocks: ["payment", "account"],
        description: "Monetize payment infrastructure by embedding it directly into the software your customers already use — ERP, AR/AP, or as API-as-a-Service. Go further by integrating Account Galaxy into their receivable and payable accounts.",
        howBanksUse: "Banks can allow their treasury customers to embed the unified payments API into ERP platforms like SAP and NetSuite, enabling their business customers to initiate ACH, RTP, and Fedwire payments without leaving their workflow. Banks can also offer pay-by-bank embedded banking APIs for merchants and platforms - enabling direct account-to-account payments at checkout. Some banks also choose to license the stack as API-as-a-Service to fintechs for recurring fee revenue, with Account Galaxy providing the embedded accounts and ledger layer.",
        lego: [
            { galaxy: "payment", label: "Unified API", sub: "All rails, one connection" },
            { galaxy: "account", label: "Accounts & Ledger", sub: "Embedded account infrastructure" },
        ],
        outcomes: ["New non-interest revenue from API licensing", "Pay-by-bank APIs for merchants and platforms", "Deeper ERP/AR-AP integrations for sticky customers", "Attract SMB and mid-market segments"],
        reps: ["sam", "scott", "melissa", "chris"],
    },
    {
        id: 2, icon: "🤝", title: "Partner Banking",
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
        reps: ["steve"],
    },
    {
        id: 3, icon: "🏗️", title: "Specialty Deposits",
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
    },
    {
        id: 4, icon: "🌍", title: "FX & International",
        benefit: "Compete with money-center banks on FX revenue",
        blocks: ["trade", "payment"],
        description: "FX STAR and FX STAR+ from Trade Galaxy represent the gold standard for FX revenue generation. When combined with Payment Galaxy, they enable an ideal end-to-end solution for FX and payments delivered from a single platform with full multi-rail execution across all international payment channels.",
        howBanksUse: "Banks can adopt FX STAR, the trusted and widely used flagship FX platform, delivering end-to-end functionality from multi-currency accounts and international wire execution to spot, forward, futures, and swap trading, alongside full front-, middle-, and back-office capabilities.
For extended capability, FX STAR+ (FX on BankOS) integrates with Payment Galaxy for all - rails international payments, supporting seamless global execution and competitiveness with money - center banks.",
lego: [
    { galaxy: "trade", label: "FX STAR", sub: "Our legendary FX platform" },
    { galaxy: "trade", label: "FX STAR+", sub: "FX on BankOS — Spot, Fwd, Futures, Swaps" },
    { galaxy: "payment", label: "Payment Galaxy", sub: "All rails — intl execution" },
],
    outcomes: ["New FX fee revenue from commercial clients", "Multi-currency accounts for international businesses", "Advanced FX instruments — compete with money-center banks", "Full international rails execution via Payment Galaxy"],
        reps: ["brian"],
    },
{
    id: 5, icon: "✨", title: "Digital Experiences",
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
                                reps: ["melissa", "sam"],
    },
{
    id: 6, icon: "⚙️", title: "Payment Modernization",
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
                                reps: ["scott", "sam"],
    },
{
    id: 7, icon: "📈", title: "Trade Finance & Swaps",
        benefit: "Retain complex deals you'd previously refer out",
            blocks: ["trade"],
                description: "EXIM STAR and Swap STAR from Trade Galaxy let you offer letters of credit, bank guarantees, and derivative products — revenue streams previously only available to large banks.",
                    howBanksUse: "Mid-size banks can use EXIM STAR to offer import/export financing (LCs, guarantees, collections) to their business clients for the first time. Swap STAR opens derivative revenue — interest rate swaps, credit default swaps, and structured products — to banks that previously had to refer those deals to larger competitors.",
                        lego: [
                            { galaxy: "trade", label: "EXIM STAR", sub: "LCs, guarantees, collections" },
                            { galaxy: "trade", label: "Swap STAR", sub: "IRS, CDS, structured products" },
                        ],
                            outcomes: ["Offer letters of credit and bank guarantees to importers/exporters", "Earn swap fee income — retain deals you'd previously refer out", "Interest rate swaps for commercial loan hedging", "Compete with large banks for complex deals"],
                                reps: ["brian"],
    },
{
    id: 8, icon: "🪙", title: "Tokenized Deposits",
        benefit: "Future-proof your deposit strategy for the digital economy",
            blocks: ["payment", "account", "token"],
                description: "Token Galaxy enables banks to actively participate in the tokenized economy. It leverages components of Payment Galaxy to orchestrate unified fiat and tokenized rails, while Account Galaxy provides a single, unified ledger for both fiat and tokenized assets. Together, they deliver the orchestration and infrastructure required to issue, move, and manage tokenized money at scale",
                    howBanksUse: "Banks can use Token Galaxy to participate in industry consortia, issue their own tokenized deposits, or support commercial stablecoins. It provides future-proof infrastructure that adapts to evolving standards and market structures without locking institutions into a single model or ecosystem. This allows banks to innovate confidently while maintaining control, compliance, and interoperability across emerging digital asset networks.",
                        lego: [
                            { galaxy: "payment", label: "Payment Galaxy", sub: "Unified fiat + tokenized rails processing" },
                            { galaxy: "account", label: "Account Galaxy", sub: "Unified ledger for fiat and tokenized assets" },
                            { galaxy: "token", label: "Token Galaxy", sub: "Value orchestration — blockchain as invisible plumbing" },
                        ],
                            outcomes: ["Easily join a consortium with confidence", "Issue tokenized deposits with complete ledger and settlement control", "Provide wallet experience for digital assets", "Unified ledger — no separate systems for digital assets"],
                                reps: ["steve"],
    },
];

function DetailLegoBrick({ galaxy, label, sub }) {
    const c = COLORS[galaxy];
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: 5, paddingLeft: 8 }}>
                <div style={{ width: 9, height: 5, borderRadius: "50%", background: c.bg, opacity: 0.75 }} />
                <div style={{ width: 9, height: 5, borderRadius: "50%", background: c.bg, opacity: 0.75 }} />
            </div>
            <div style={{ background: c.bg, border: `2px solid ${c.dark}`, borderRadius: 7, padding: "10px 14px", minWidth: 120, maxWidth: 165 }}>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 9, letterSpacing: "0.04em", marginBottom: 3 }}>{c.label}</div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 12, lineHeight: 1.3 }}>{label}</div>
                {sub && <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 10, marginTop: 3, lineHeight: 1.3 }}>{sub}</div>}
            </div>
        </div>
    );
}

function RepCard({ rep }) {
    return (
        <div style={{
            background: "var(--color-background-primary)",
            border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: 10, padding: "10px 8px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
            minWidth: 90,
        }}>
            <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: rep.color + "18", border: `2px solid ${rep.color}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 500, fontSize: 13, color: rep.color,
            }}>{rep.initials}</div>
            <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "var(--color-text-primary)" }}>{rep.name}</div>
                <div style={{ fontSize: 10, color: "var(--color-text-secondary)", lineHeight: 1.4 }}>{rep.role}</div>
                <div style={{ fontSize: 10, color: "var(--color-text-secondary)" }}>{rep.region}</div>
            </div>
            <button style={{
                fontSize: 10, padding: "3px 10px", borderRadius: 20,
                background: rep.color + "12", border: `1px solid ${rep.color}`,
                color: rep.color, cursor: "pointer", fontWeight: 500,
            }}>Speak to me</button>
        </div>
    );
}

function DetailPanel({ lever, onClose }) {
    const [tab, setTab] = useState("blocks");
    const c = COLORS[lever.blocks[0]];
    const isSolo = lever.lego[0]?.solo;
    const reps = lever.reps.map(k => ALL_REPS[k]);

    return (
        <div style={{ background: "var(--color-background-primary)", border: `1.5px solid ${c.bg}`, borderRadius: 14, marginTop: 10, overflow: "hidden" }}>
            <div style={{ padding: "16px 18px 12px", background: c.light + "55", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: "var(--color-text-primary)" }}>{lever.title}</div>
                        <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 2 }}>{lever.benefit}</div>
                    </div>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--color-text-secondary)", padding: "0 2px", lineHeight: 1 }}>×</button>
                </div>
                <div style={{ display: "flex", gap: 0, marginTop: 14, background: "var(--color-background-primary)", borderRadius: 8, padding: 3, border: "0.5px solid var(--color-border-tertiary)" }}>
                    {["blocks", "use-case", "outcomes", "team"].map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{
                            flex: 1, padding: "7px 4px",
                            background: tab === t ? c.bg : "transparent",
                            border: "none", borderRadius: 6,
                            color: tab === t ? "#fff" : "var(--color-text-secondary)",
                            fontSize: 11, fontWeight: tab === t ? 700 : 400, cursor: "pointer",
                        }}>
                            {t === "blocks" ? "Building Blocks" : t === "use-case" ? "How Banks Can Use It" : t === "outcomes" ? "Business Outcomes" : "Speak to Sales"}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ padding: "18px" }}>
                {tab === "blocks" && (
                    <div>
                        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>{lever.description}</p>
                        <div>
                            <div style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                                {lever.lego.map((block, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <DetailLegoBrick galaxy={block.galaxy} label={block.label} sub={block.sub} />
                                        {i < lever.lego.length - 1 && <span style={{ color: "#bbb", fontSize: 18 }}>+</span>}
                                    </div>
                                ))}
                            </div>
                            {lever.lego.length > 1 && (
                                <div style={{ marginTop: 14 }}>
                                    <span style={{ fontSize: 11, padding: "4px 14px", borderRadius: 20, background: c.light, color: c.dark, fontWeight: 500 }}>Snaps together seamlessly</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {tab === "use-case" && (
                    <div style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: 16, borderLeft: `4px solid ${c.bg}` }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: c.dark, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>How banks can use this</div>
                        <p style={{ fontSize: 13, color: "var(--color-text-primary)", lineHeight: 1.7, margin: 0 }}>{lever.howBanksUse}</p>
                    </div>
                )}

                {tab === "outcomes" && (
                    <div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                            {lever.outcomes.map((o, i) => (
                                <div key={i} style={{
                                    background: "var(--color-background-secondary)", borderRadius: 8,
                                    padding: "12px 14px", borderLeft: `3px solid ${c.bg}`,
                                    fontSize: 13, color: "var(--color-text-primary)", lineHeight: 1.5,
                                }}>
                                    <span style={{ color: c.bg, fontWeight: 700, marginRight: 6 }}>✓</span>{o}
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 14, padding: 14, borderRadius: 10, background: c.light, display: "flex", alignItems: "center", gap: 12, border: `1px solid ${c.bg}33` }}>
                            <span style={{ fontSize: 20 }}>📱</span>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: c.dark }}>Download the brochure</div>
                                <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>Scan QR or ask your sales rep</div>
                            </div>
                            <div style={{ marginLeft: "auto", width: 48, height: 48, background: "#fff", borderRadius: 6, border: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="36" height="36" viewBox="0 0 40 40">
                                    <rect x="2" y="2" width="16" height="16" rx="2" fill="none" stroke={c.bg} strokeWidth="2" />
                                    <rect x="6" y="6" width="8" height="8" fill={c.bg} />
                                    <rect x="22" y="2" width="16" height="16" rx="2" fill="none" stroke={c.bg} strokeWidth="2" />
                                    <rect x="26" y="6" width="8" height="8" fill={c.bg} />
                                    <rect x="2" y="22" width="16" height="16" rx="2" fill="none" stroke={c.bg} strokeWidth="2" />
                                    <rect x="6" y="26" width="8" height="8" fill={c.bg} />
                                    <rect x="22" y="22" width="4" height="4" fill={c.bg} />
                                    <rect x="28" y="22" width="4" height="4" fill={c.bg} />
                                    <rect x="34" y="22" width="4" height="4" fill={c.bg} />
                                    <rect x="22" y="28" width="4" height="4" fill={c.bg} />
                                    <rect x="28" y="34" width="4" height="4" fill={c.bg} />
                                    <rect x="34" y="34" width="4" height="4" fill={c.bg} />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}

                {tab === "team" && (
                    <div>
                        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 14 }}>
                            Ready to explore {lever.title} for your bank? Our team will build your custom roadmap.
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                            {reps.map(rep => <RepCard key={rep.name} rep={rep} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function App() {
    const [activeId, setActiveId] = useState(null);
    const activeLever = LEVERS.find(l => l.id === activeId);

    return (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 0 48px" }}>
            <div style={{ textAlign: "center", padding: "36px 24px 28px", borderBottom: "0.5px solid var(--color-border-tertiary)", marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 18 }}>
                    {Object.entries(COLORS).map(([k, c]) => (
                        <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <div style={{ display: "flex", gap: 5, paddingLeft: 5 }}>
                                <div style={{ width: 8, height: 5, borderRadius: "50%", background: c.bg, opacity: 0.75 }} />
                                <div style={{ width: 8, height: 5, borderRadius: "50%", background: c.bg, opacity: 0.75 }} />
                            </div>
                            <div style={{ width: 38, height: 22, borderRadius: 5, background: c.bg, border: `2px solid ${c.dark}` }} />
                        </div>
                    ))}
                </div>
                <h1 style={{ fontSize: 30, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 10px", letterSpacing: "-0.5px" }}>Mix. Match. Launch.</h1>
                <p style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 14px" }}>Build your bank's future — one block at a time.</p>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 auto 20px", maxWidth: 480, lineHeight: 1.7 }}>
                    Just like LEGO bricks snap together to create anything imaginable, our Galaxy capabilities let you assemble powerful banking capabilities — piece by piece, your way. Welcome to composable banking.
                </p>
                <div style={{ display: "inline-block", background: "var(--color-background-secondary)", borderRadius: 10, padding: "10px 22px", border: "0.5px solid var(--color-border-tertiary)" }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)" }}>What's your next growth play? 👇</span>
                </div>
            </div>

            <div style={{ padding: "0 12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: activeId ? 10 : 0 }}>
                    {LEVERS.map(lever => {
                        const c = COLORS[lever.blocks[0]];
                        const isActive = activeId === lever.id;
                        return (
                            <div
                                key={lever.id}
                                onClick={() => setActiveId(isActive ? null : lever.id)}
                                style={{
                                    background: isActive ? c.light : "var(--color-background-primary)",
                                    border: isActive ? `2px solid ${c.bg}` : "0.5px solid var(--color-border-tertiary)",
                                    borderRadius: 12, padding: "14px 14px 12px",
                                    cursor: "pointer", transition: "all 0.15s",
                                }}
                            >
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 10 }}>
                                    <div style={{ display: "flex", gap: 4, paddingLeft: 5 }}>
                                        <div style={{ width: 7, height: 4, borderRadius: "50%", background: c.bg, opacity: 0.75 }} />
                                        <div style={{ width: 7, height: 4, borderRadius: "50%", background: c.bg, opacity: 0.75 }} />
                                    </div>
                                    <div style={{ background: c.bg, border: `2px solid ${c.dark}`, borderRadius: 7, padding: "7px 11px", display: "flex", alignItems: "center", gap: 6 }}>
                                        <span style={{ fontSize: 14 }}>{lever.icon}</span>
                                        <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{lever.title}</span>
                                    </div>
                                </div>
                                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: 10 }}>{lever.benefit}</div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                    {lever.blocks.map(b => (
                                        <span key={b} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: COLORS[b].light, color: COLORS[b].dark, fontWeight: 500 }}>{COLORS[b].label}</span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {activeLever && <DetailPanel lever={activeLever} onClose={() => setActiveId(null)} />}
            </div>
        </div>
    );
}
