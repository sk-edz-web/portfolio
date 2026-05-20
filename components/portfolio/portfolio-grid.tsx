"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, FolderOpen } from "lucide-react";
import SearchBar from "./search-bar";
import CategoryFilter from "./category-filter";
import PortfolioCardComponent from "./portfolio-card";
import { getPortfolioCards, getCategories, searchCards } from "@/lib/firebase-services";
import type { PortfolioCard, Category } from "@/lib/types";

export default function PortfolioGrid() {
  const [cards, setCards] = useState<PortfolioCard[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedCards, fetchedCategories] = await Promise.all([
          getPortfolioCards(),
          getCategories(),
        ]);

        // Map category names to cards
        const cardsWithCategories = fetchedCards.map((card) => ({
          ...card,
          categoryName: fetchedCategories.find((c) => c.id === card.categoryId)?.name,
        }));

        setCards(cardsWithCategories);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter cards based on search and category
  const filteredCards = useMemo(() => {
    let result = cards;

    // Filter by category
    if (selectedCategory) {
      result = result.filter((card) => card.categoryId === selectedCategory);
    }

    // Filter by search
    if (searchTerm) {
      result = searchCards(result, searchTerm);
    }

    return result;
  }, [cards, selectedCategory, searchTerm]);

  return (
    <section id="portfolio" className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            My Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my latest projects and creative work across web development,
            design, and digital solutions.
          </p>
        </motion.div>

        {/* Search bar */}
        <div className="mb-8">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search projects, tags, categories..."
          />
        </div>

        {/* Category filter */}
        <div className="mb-12">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredCards.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <FolderOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No projects found
            </h3>
            <p className="text-muted-foreground max-w-sm">
              {searchTerm || selectedCategory
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Projects will appear here once they're added from the admin panel."}
            </p>
          </motion.div>
        )}

        {/* Portfolio grid */}
        <AnimatePresence mode="wait">
          {!loading && filteredCards.length > 0 && (
            <motion.div
              key={`${selectedCategory}-${searchTerm}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredCards.map((card, index) => (
                <PortfolioCardComponent key={card.id} card={card} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        {!loading && filteredCards.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            Showing {filteredCards.length} of {cards.length} projects
          </motion.p>
        )}
      </div>
    </section>
  );
}
