import { SiInstagram, SiWhatsapp, SiYoutube } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-background border-t border-border py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/Gemini_Generated_Image_o0xt2bo0xt2bo0xt-1.png"
              alt="The Legal Diplomat"
              className="h-10 w-10 object-contain"
            />
            <div>
              <p className="font-display font-bold text-gold text-sm tracking-wider">
                THE LEGAL DIPLOMAT
              </p>
              <p className="text-xs text-muted-foreground">
                Decoding the World's Legal Landscape
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/the_legal_diplomat"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.instagram.link"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <SiInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com/@thelegaldiplomat"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.youtube.link"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <SiYoutube className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/919334287787"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.whatsapp.link"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="WhatsApp"
            >
              <SiWhatsapp className="h-5 w-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-center">
            © {year} The Legal Diplomat. Built with{" "}
            <span className="text-primary">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
