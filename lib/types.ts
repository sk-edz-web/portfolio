// Portfolio Types

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
}

export interface PortfolioCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  categoryName?: string;
  link?: string;
  tags: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  title: string;
  bio: string;
  location: string;
  avatar: string;
  socials: {
    whatsapp?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
  };
}
