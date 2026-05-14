import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Download } from "lucide-react";
import finzlyLogo from "../../assets/finzly-logo.png";

interface SessionEmailGateProps {
  onEmailCaptured: (email: string) => void;
  pendingDownloadId?: number | null;
}

export default function SessionEmailGate({ onEmailCaptured, pendingDownloadId }: SessionEmailGateProps) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const validate = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    const lead = { email, timestamp: new Date().toISOString(), source: "session-start" };
    const leads = JSON.parse(localStorage.getItem("finzly_leads") || "[]");
    leads.push(lead);
    localStorage.setItem("finzly_leads", JSON.stringify(leads));

    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).catch(() => { });
    }

    setSubmitted(true);
    onEmailCaptured(email);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-white px-6"
    >
      <img src={finzlyLogo} alt="Finzly" className="h-10 w-auto mb-8 opacity-90" />

      <h2 className="text-2xl font-black text-slate-900 font-satoshi tracking-tight mb-2 text-center">
        Welcome to Finzly Galaxy
      </h2>
      <p className="text-sm text-slate-500 font-satoshi text-center mb-8 leading-relaxed">
        {pendingDownloadId
          ? "Enter your official email to continue the application"
          : "Enter your official email to access the brochures."}
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
              <Download size={22} className="text-primary" />
            </div>
            <div className="text-base font-black text-slate-900 font-satoshi">You're all set!</div>
            <div className="text-sm text-slate-500 font-satoshi">
              {pendingDownloadId ? "Your download is starting…" : "Explore the Finzly Galaxy."}
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white focus-within:border-primary/50 transition-colors shadow-sm">
                <Mail size={16} className="text-slate-400 shrink-0" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="flex-1 text-sm text-slate-800 font-satoshi bg-transparent outline-none placeholder:text-slate-400"
                  autoFocus
                />
              </div>
              {error && <p className="text-xs text-red-500 font-satoshi pl-1">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-black font-satoshi text-sm py-3.5 px-4 rounded-xl hover:bg-primary/90 transition-colors"
            >
              {pendingDownloadId ? (
                <>
                  <Download size={16} />
                  Continue to Download
                </>
              ) : (
                <>
                  <Mail size={16} />
                  Get Started
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
