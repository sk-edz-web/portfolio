"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { userProfile, getWhatsAppLink, getCallLink, getEmailLink } from "@/lib/profile-data";

export default function ContactSection() {
  const contactOptions = [
    {
      icon: Mail,
      label: "Email",
      value: userProfile.email,
      href: getEmailLink(userProfile.email, "Hello from your portfolio"),
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Phone,
      label: "Call",
      value: `+91 ${userProfile.phone}`,
      href: getCallLink(userProfile.phone),
      color: "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20",
      iconColor: "text-green-500",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Send a message",
      href: getWhatsAppLink(userProfile.phone, "Hi! I found you through your portfolio and would like to discuss a project."),
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20",
      iconColor: "text-emerald-500",
      isExternal: true,
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
            Choose your preferred way to connect.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {contactOptions.map((option, index) => (
            <motion.a
              key={option.label}
              href={option.href}
              target={option.isExternal ? "_blank" : undefined}
              rel={option.isExternal ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative group flex flex-col items-center p-6 md:p-8 rounded-2xl border border-border transition-all duration-300 ${option.color}`}
            >
              <div className={`w-14 h-14 rounded-full bg-card flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow`}>
                <option.icon className={`w-6 h-6 ${option.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {option.label}
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                {option.value}
              </p>
              
              {/* Hover indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-current opacity-0 group-hover:opacity-30 transition-opacity" />
            </motion.a>
          ))}
        </div>

        {/* Additional message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            Typically respond within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
