"use client";

import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Globe, Zap, Users } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies for optimal performance.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that enhance user experience and drive engagement.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Responsive designs that work flawlessly across all devices and screen sizes.",
  },
  {
    icon: Code,
    title: "Frontend Development",
    description: "Clean, maintainable code using React, Next.js, and other modern frameworks.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Fast-loading websites optimized for the best user experience and SEO.",
  },
  {
    icon: Users,
    title: "Consultation",
    description: "Expert guidance on digital strategy, technology choices, and project planning.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Services I Offer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment, I provide comprehensive solutions to bring your
            digital vision to life.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
