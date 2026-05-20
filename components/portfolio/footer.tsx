"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { userProfile } from "@/lib/profile-data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground text-center md:text-left"
          >
            &copy; {currentYear} {userProfile.name}. All rights reserved.
          </motion.p>

          {/* Made with love */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1 text-sm text-muted-foreground"
          >
            Made with{" "}
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{" "}
            in {userProfile.location}
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
