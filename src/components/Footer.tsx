import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t py-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-4 text-muted-foreground text-sm justify-between">
        <p>@{new Date().getFullYear()} SkyCast by Ehsan Ahmed</p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/royalblaster"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/ehsan-ahmed-515663250/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="mailto:ehsanahmed99@gmail.com"
            className="hover:text-foreground transition"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
