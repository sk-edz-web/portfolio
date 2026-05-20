"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/types";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
    >
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <FilterButton
          active={selectedCategory === null}
          onClick={() => onSelectCategory(null)}
        >
          All
        </FilterButton>
        
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <FilterButton
              active={selectedCategory === category.id}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name}
            </FilterButton>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
        active
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
          : "bg-transparent hover:bg-accent border-border"
      }`}
    >
      {children}
    </Button>
  );
}
