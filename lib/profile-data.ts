import type { UserProfile } from './types';

// ============================================
// USER PROFILE DATA
// ============================================
// Update this with your personal information
// ============================================

export const userProfile: UserProfile = {
  // ⚠️ UPDATE THESE VALUES WITH YOUR INFO ⚠️
  name: "Your Name",
  email: "info.skedz@gmail.com",
  phone: "9345306573",
  title: "Full Stack Developer & Designer",
  bio: "Passionate about creating beautiful, functional digital experiences. I specialize in web development, UI/UX design, and building products that make a difference.",
  location: "India",
  avatar: "/placeholder-avatar.jpg", // Update with your image path
  socials: {
    whatsapp: "9345306573",
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
  },
};

// Format phone number for display
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '+91 $1 $2 $3');
}

// Get WhatsApp link
export function getWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const fullPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${fullPhone}${encodedMessage}`;
}

// Get call link
export function getCallLink(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  return `tel:+91${cleanPhone}`;
}

// Get email link
export function getEmailLink(email: string, subject?: string): string {
  const encodedSubject = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${email}${encodedSubject}`;
}
