import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useSubmitLead } from "../hooks/useQueries";

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending, isError } = useSubmitLead();

  useEffect(() => {
    const seen = sessionStorage.getItem("lead_popup_seen");
    if (!seen) {
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("lead_popup_seen", "true");
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    try {
      await mutateAsync({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
      });
      setSubmitted(true);
      sessionStorage.setItem("lead_popup_seen", "true");
      setTimeout(() => setOpen(false), 2000);
    } catch {
      // error shown below
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleClose();
      }}
    >
      <DialogContent
        data-ocid="lead_popup.dialog"
        className="border border-primary/30 bg-card max-w-md shadow-gold"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <button
          type="button"
          onClick={handleClose}
          data-ocid="lead_popup.close_button"
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader className="text-center pb-2">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-0.5 gold-gradient" />
          </div>
          <DialogTitle className="font-display text-2xl text-foreground">
            Stay Updated
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1">
            Get notified about our latest insights and upcoming courses
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-6"
              data-ocid="lead_popup.success_state"
            >
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <p className="text-foreground font-medium">
                Thank you! We'll be in touch.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-4 mt-2"
            >
              <div className="space-y-1.5">
                <Label
                  htmlFor="popup-name"
                  className="text-foreground/80 text-sm"
                >
                  Full Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="popup-name"
                  data-ocid="lead_popup.name.input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="bg-secondary/50 border-border focus:border-primary"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="popup-phone"
                  className="text-foreground/80 text-sm"
                >
                  Phone Number <span className="text-primary">*</span>
                </Label>
                <Input
                  id="popup-phone"
                  data-ocid="lead_popup.phone.input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="bg-secondary/50 border-border focus:border-primary"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="popup-email"
                  className="text-foreground/80 text-sm"
                >
                  Email Address{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="popup-email"
                  data-ocid="lead_popup.email.input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-secondary/50 border-border focus:border-primary"
                />
              </div>

              {isError && (
                <p
                  className="text-destructive text-sm"
                  data-ocid="lead_popup.error_state"
                >
                  Something went wrong. Please try again.
                </p>
              )}

              <Button
                type="submit"
                data-ocid="lead_popup.submit_button"
                disabled={isPending || !name.trim() || !phone.trim()}
                className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {isPending ? "Submitting..." : "Notify Me"}
              </Button>

              <button
                type="button"
                onClick={handleClose}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Skip for now
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
