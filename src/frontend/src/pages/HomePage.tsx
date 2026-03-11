import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  ExternalLink,
  Globe,
  Phone,
  Play,
  Scale,
} from "lucide-react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiInstagram, SiWhatsapp, SiYoutube } from "react-icons/si";
import { useSubmitLead } from "../hooks/useQueries";

const VIDEO_PLACEHOLDERS = [
  {
    id: "video-1",
    title: "India's Stand on the Russia-Ukraine War: A Legal Analysis",
    url: "https://youtube.com/@thelegaldiplomat",
  },
  {
    id: "video-2",
    title: "UNCLOS Explained: Maritime Disputes in the Indo-Pacific",
    url: "https://youtube.com/@thelegaldiplomat",
  },
  {
    id: "video-3",
    title: "The ICJ & Its Role in International Law Enforcement",
    url: "https://youtube.com/@thelegaldiplomat",
  },
];

export default function HomePage() {
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
  const { mutateAsync, isPending, isError } = useSubmitLead();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) return;
    try {
      await mutateAsync({
        name: contactName.trim(),
        phone: contactPhone.trim(),
        email: contactEmail.trim(),
      });
      setContactSuccess(true);
      setContactName("");
      setContactPhone("");
      setContactEmail("");
    } catch {
      // error shown below
    }
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 grid-bg" />

        <div className="relative container mx-auto px-4 md:px-6 text-center pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <img
              src="/assets/uploads/Gemini_Generated_Image_o0xt2bo0xt2bo0xt-1.png"
              alt="The Legal Diplomat"
              className="h-28 w-28 md:h-36 md:w-36 object-contain drop-shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-primary tracking-[0.3em] uppercase text-xs font-semibold mb-3">
              Geopolitics & International Law
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-4"
          >
            The Legal <span className="text-gold italic">Diplomat</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Decoding the World's Legal &amp; Geopolitical Landscape
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              data-ocid="hero.youtube.primary_button"
              className="gold-gradient text-primary-foreground font-semibold px-8 hover:opacity-90"
            >
              <a
                href="https://youtube.com/@thelegaldiplomat"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play className="h-4 w-4 mr-2" />
                Explore Our Channel
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              data-ocid="hero.courses.secondary_button"
              onClick={scrollToContact}
              className="border-primary/40 text-primary hover:bg-primary/10"
            >
              Get Notified
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mt-16 pt-10 border-t border-primary/20"
          >
            {[
              {
                icon: Globe,
                label: "Geopolitical Events",
                value: "Expert Analysis",
              },
              {
                icon: Scale,
                label: "International Law",
                value: "In-Depth Insights",
              },
              { icon: BookOpen, label: "Courses", value: "Coming Soon" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="h-5 w-5 text-primary mb-1" />
                <p className="text-foreground font-semibold text-sm">{value}</p>
                <p className="text-muted-foreground text-xs">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ─── ABOUT ────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary tracking-[0.3em] uppercase text-xs font-semibold mb-4">
                Who We Are
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Expert Analysis for a{" "}
                <span className="text-gold italic">Complex World</span>
              </h2>
              <div className="w-16 h-0.5 gold-gradient mx-auto mb-8" />
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                The Legal Diplomat offers expert analysis of global geopolitical
                events and in-depth interpretation of major international laws.
                Our commentary bridges the gap between complex legal frameworks
                and real-world political events.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Follow us on YouTube for insights, commentary, and legal
                perspectives on the issues shaping our world — from territorial
                disputes and treaty interpretations to sanctions regimes and
                international justice.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mt-10"
            >
              {[
                "International Law",
                "Geopolitics",
                "Diplomacy",
                "Treaty Analysis",
                "Foreign Policy",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── YOUTUBE ──────────────────────────────────────── */}
      <section id="youtube" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-xs font-semibold mb-4">
              On YouTube
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Watch Our <span className="text-gold italic">Channel</span>
            </h2>
            <div className="w-16 h-0.5 gold-gradient mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Subscribe to The Legal Diplomat on YouTube for regular insights on
              geopolitics and international law.
            </p>
          </motion.div>

          {/* Channel CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-primary/20 rounded-lg px-6 py-5 mb-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                <SiYoutube className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-display font-bold text-foreground">
                  @thelegaldiplomat
                </p>
                <p className="text-muted-foreground text-sm">
                  Geopolitics & International Law
                </p>
              </div>
            </div>
            <Button
              asChild
              data-ocid="youtube.visit.primary_button"
              className="gold-gradient text-primary-foreground font-semibold"
            >
              <a
                href="https://youtube.com/@thelegaldiplomat"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Our Channel
              </a>
            </Button>
          </motion.div>

          {/* Video cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEO_PLACEHOLDERS.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                data-ocid={`youtube.video.item.${i + 1}`}
              >
                <Card className="bg-card border-border hover:border-primary/40 transition-colors group overflow-hidden">
                  <div className="relative aspect-video bg-secondary grid-bg flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Play className="h-6 w-6 text-primary ml-0.5" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-foreground text-sm font-medium leading-snug mb-3 line-clamp-2">
                      {video.title}
                    </p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid={`youtube.video.link.${i + 1}`}
                      className="inline-flex items-center gap-1.5 text-primary text-xs hover:text-accent transition-colors font-medium"
                    >
                      Watch on YouTube
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COURSES ──────────────────────────────────────── */}
      <section id="courses" className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-xs font-semibold mb-4">
              Learn With Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our <span className="text-gold italic">Courses</span>
            </h2>
            <div className="w-16 h-0.5 gold-gradient mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-lg mx-auto"
            data-ocid="courses.item.1"
          >
            <Card className="bg-background border-primary/30 shadow-gold overflow-hidden">
              <div className="h-2 gold-gradient" />
              <CardHeader className="pt-6">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="font-display text-xl text-foreground leading-snug">
                    History of Indian Diplomacy
                  </CardTitle>
                  <Badge className="gold-gradient text-primary-foreground text-xs px-2 py-0.5 flex-shrink-0">
                    Coming Soon
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  A comprehensive exploration of India's diplomatic journey from
                  ancient civilizations to the modern era. Understand the key
                  treaties, alliances, and foreign policy decisions that shaped
                  the nation.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "Ancient History",
                    "Modern Diplomacy",
                    "Treaties",
                    "Foreign Policy",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-sm bg-secondary text-muted-foreground text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={scrollToContact}
                  data-ocid="courses.notify.primary_button"
                  className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90"
                >
                  Notify Me When Available
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-xs font-semibold mb-4">
              Get In Touch
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Contact <span className="text-gold italic">Us</span>
            </h2>
            <div className="w-16 h-0.5 gold-gradient mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                Reach Us Directly
              </h3>

              <a
                href="tel:+919334287787"
                data-ocid="contact.phone.link"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-foreground font-medium hover:text-primary transition-colors">
                    +91 9334287787
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/919334287787"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.whatsapp.link"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <SiWhatsapp className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                  <p className="text-foreground font-medium hover:text-primary transition-colors">
                    +91 9334287787
                  </p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/the_legal_diplomat"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.instagram.link"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <SiInstagram className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Instagram</p>
                  <p className="text-foreground font-medium hover:text-primary transition-colors">
                    @the_legal_diplomat
                  </p>
                </div>
              </a>

              <a
                href="https://youtube.com/@thelegaldiplomat"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.youtube.link"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <SiYoutube className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">YouTube</p>
                  <p className="text-foreground font-medium hover:text-primary transition-colors">
                    @thelegaldiplomat
                  </p>
                </div>
              </a>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                Send Us a Message
              </h3>

              {contactSuccess ? (
                <div
                  data-ocid="contact.success_state"
                  className="flex flex-col items-center justify-center gap-3 py-12 text-center"
                >
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                  <p className="text-foreground font-medium">
                    Thank you! We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-name"
                      className="text-foreground/80 text-sm"
                    >
                      Full Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      data-ocid="contact.name.input"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="bg-card border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-phone"
                      className="text-foreground/80 text-sm"
                    >
                      Phone Number <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="contact-phone"
                      data-ocid="contact.phone.input"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className="bg-card border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-email"
                      className="text-foreground/80 text-sm"
                    >
                      Email{" "}
                      <span className="text-muted-foreground text-xs">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="contact-email"
                      data-ocid="contact.email.input"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="bg-card border-border focus:border-primary"
                    />
                  </div>

                  {isError && (
                    <p
                      className="text-destructive text-sm"
                      data-ocid="contact.error_state"
                    >
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <Button
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={
                      isPending || !contactName.trim() || !contactPhone.trim()
                    }
                    className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90"
                  >
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
