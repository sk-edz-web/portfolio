"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search projects..." }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto"
    >
      <div
        className={`relative flex items-center rounded-full border-2 transition-all duration-300 bg-card ${
          isFocused
            ? "border-primary shadow-lg shadow-primary/10"
            : "border-border hover:border-primary/50"
        }`}
      >
        <div className="flex items-center justify-center w-12 h-12">
          <Search className={`w-5 h-5 transition-colors ${isFocused ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/70 h-12 px-0"
        />

        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChange("")}
            className="mr-2 h-8 w-8 rounded-full hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search suggestions hint */}
      {isFocused && !value && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-muted-foreground text-center mt-2"
        >
          Try searching for &quot;web&quot;, &quot;design&quot;, or &quot;mobile&quot;
        </motion.p>
      )}
    </motion.div>
  );
}
