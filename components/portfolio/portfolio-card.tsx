"use client";

import { motion } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import type { PortfolioCard } from "@/lib/types";

interface PortfolioCardProps {
  card: PortfolioCard;
  index: number;
}

export default function PortfolioCardComponent({ card, index }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {card.imageUrl ? (
          <img
            src={card.imageUrl}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
            <Folder className="w-12 h-12 text-primary/30" />
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Featured badge */}
        {card.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            Featured
          </div>
        )}
        
        {/* Category badge */}
        {card.categoryName && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
            {card.categoryName}
          </div>
        )}
        
        {/* View project button */}
        {card.link && (
          <motion.a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {card.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {card.description}
        </p>
        
        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {card.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
            {card.tags.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium rounded-md bg-secondary text-muted-foreground">
                +{card.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
