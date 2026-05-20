"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { userProfile } from "@/lib/profile-data";
import ProfileModal from "./profile-modal";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass bg-background/80 border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / Profile Section */}
            <motion.button
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                {userProfile.avatar && userProfile.avatar !== "/placeholder-avatar.jpg" ? (
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="font-semibold text-foreground text-sm md:text-base leading-tight group-hover:text-primary transition-colors">
                  {userProfile.name}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                  {userProfile.email}
                </p>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink href="#portfolio">Portfolio</NavLink>
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </nav>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Theme Switch */}
              <motion.div
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/50"
                whileHover={{ scale: 1.05 }}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-primary"
                />
                <Moon className="w-4 h-4 text-blue-400" />
              </motion.div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-border/50 bg-background/95 glass"
            >
              <nav className="flex flex-col p-4 gap-2">
                <MobileNavLink href="#portfolio" onClick={() => setMobileMenuOpen(false)}>
                  Portfolio
                </MobileNavLink>
                <MobileNavLink href="#services" onClick={() => setMobileMenuOpen(false)}>
                  Services
                </MobileNavLink>
                <MobileNavLink href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </MobileNavLink>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Profile Modal */}
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
      whileHover={{ y: -2 }}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
    </motion.a>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="px-4 py-3 rounded-lg text-foreground font-medium hover:bg-accent transition-colors"
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
}
