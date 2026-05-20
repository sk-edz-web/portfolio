"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { userProfile, formatPhone, getWhatsAppLink, getCallLink, getEmailLink } from "@/lib/profile-data";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileModal({ open, onClose }: ProfileModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full z-50"
          >
            <div className="bg-card rounded-2xl shadow-2xl overflow-hidden h-full md:h-auto">
              {/* Header with gradient */}
              <div className="relative h-32 bg-gradient-to-br from-primary/80 to-primary">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute top-3 right-3 text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
                
                {/* Avatar */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  <div className="w-24 h-24 rounded-full border-4 border-card bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center overflow-hidden shadow-lg">
                    {userProfile.avatar && userProfile.avatar !== "/placeholder-avatar.jpg" ? (
                      <img
                        src={userProfile.avatar}
                        alt={userProfile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-primary">
                        {userProfile.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-16 pb-6 px-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-1">
                    {userProfile.name}
                  </h2>
                  <p className="text-primary font-medium">{userProfile.title}</p>
                </div>

                <p className="text-muted-foreground text-center text-sm mb-6 leading-relaxed">
                  {userProfile.bio}
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{userProfile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">{formatPhone(userProfile.phone)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{userProfile.location}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={getEmailLink(userProfile.email, "Hello from your portfolio")}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Email</span>
                  </a>

                  <a
                    href={getCallLink(userProfile.phone)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-green-500/10 hover:bg-green-500/20 transition-colors group"
                  >
                    <Phone className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">Call</span>
                  </a>

                  <a
                    href={getWhatsAppLink(userProfile.socials.whatsapp || userProfile.phone, "Hi! I found you through your portfolio.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors group"
                  >
                    <svg
                      className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
