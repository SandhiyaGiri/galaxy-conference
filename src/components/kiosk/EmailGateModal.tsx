import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Mail } from "lucide-react";

interface EmailGateModalProps {
  pdfUrl: string;
  title?: string;
  onClose: () => void;
  dismissable?: boolean;
  source?: string;
  onEmailCaptured?: (email: string) => void;
}

export default function EmailGateModal({
  pdfUrl,
  title = "Finzly Brochure",
  onClose,
  dismissable = true,
  source = "unknown",
  onEmailCaptured,
}: EmailGateModalProps) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const validate = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    onEmailCaptured?.(email);

    const lead = { email, timestamp: new Date().toISOString(), source };

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

    window.open(pdfUrl, '_blank');

    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/70"
      onClick={dismissable ? onClose : undefined}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="kiosk-modal-shell w-full max-w-sm flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
              <Download size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 font-satoshi leading-none">Get the PDF</div>
              <div className="text-xs text-slate-400 font-satoshi mt-0.5">{title}</div>
            </div>
          </div>
          {dismissable && (
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors border border-black/5"
            >
              <X size={20} className="text-slate-400" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 bg-slate-50 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 py-4 text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                  <Download size={22} className="text-primary" />
                </div>
                <div className="text-base font-black text-slate-900 font-satoshi">Opening your PDF!</div>
                <div className="text-sm text-slate-500 font-satoshi">It's opening in a new tab.</div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <p className="text-sm text-slate-500 font-satoshi leading-relaxed">
                  Enter your official email to download the PDF.
                </p>
                <div className="flex flex-col gap-1.5">
                  <div className="glass-panel flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white focus-within:border-primary/50 transition-colors">
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
                  {error && (
                    <p className="text-xs text-red-500 font-satoshi pl-1">{error}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white font-black font-satoshi text-sm py-3.5 px-4 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <Download size={16} />
                  Download now
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
