import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from './firebase';
import type { Category, PortfolioCard } from './types';

// ============================================
// CATEGORY SERVICES
// ============================================

export async function getCategories(): Promise<Category[]> {
  const categoriesRef = collection(db, 'categories');
  const q = query(categoriesRef, orderBy('name', 'asc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as Category[];
}

export async function addCategory(name: string): Promise<string> {
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const categoriesRef = collection(db, 'categories');
  
  const docRef = await addDoc(categoriesRef, {
    name,
    slug,
    createdAt: serverTimestamp(),
  });
  
  return docRef.id;
}

export async function updateCategory(id: string, name: string): Promise<void> {
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const categoryRef = doc(db, 'categories', id);
  
  await updateDoc(categoryRef, {
    name,
    slug,
  });
}

export async function deleteCategory(id: string): Promise<void> {
  const categoryRef = doc(db, 'categories', id);
  await deleteDoc(categoryRef);
}

// ============================================
// PORTFOLIO CARD SERVICES
// ============================================

export async function getPortfolioCards(): Promise<PortfolioCard[]> {
  const cardsRef = collection(db, 'portfolioCards');
  const q = query(cardsRef, orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
  })) as PortfolioCard[];
}

export async function getPortfolioCardsByCategory(categoryId: string): Promise<PortfolioCard[]> {
  const cardsRef = collection(db, 'portfolioCards');
  const q = query(
    cardsRef,
    where('categoryId', '==', categoryId),
    orderBy('order', 'asc')
  );
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
  })) as PortfolioCard[];
}

export async function getPortfolioCard(id: string): Promise<PortfolioCard | null> {
  const cardRef = doc(db, 'portfolioCards', id);
  const snapshot = await getDoc(cardRef);
  
  if (!snapshot.exists()) return null;
  
  return {
    id: snapshot.id,
    ...snapshot.data(),
    createdAt: snapshot.data().createdAt?.toDate() || new Date(),
    updatedAt: snapshot.data().updatedAt?.toDate() || new Date(),
  } as PortfolioCard;
}

export async function addPortfolioCard(
  card: Omit<PortfolioCard, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const cardsRef = collection(db, 'portfolioCards');
  
  const docRef = await addDoc(cardsRef, {
    ...card,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  
  return docRef.id;
}

export async function updatePortfolioCard(
  id: string,
  card: Partial<Omit<PortfolioCard, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  const cardRef = doc(db, 'portfolioCards', id);
  
  await updateDoc(cardRef, {
    ...card,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePortfolioCard(id: string): Promise<void> {
  const cardRef = doc(db, 'portfolioCards', id);
  await deleteDoc(cardRef);
}

// ============================================
// IMAGE UPLOAD SERVICES
// ============================================

export async function uploadImage(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}

export async function deleteImage(url: string): Promise<void> {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

// ============================================
// SEARCH FUNCTION
// ============================================

export function searchCards(cards: PortfolioCard[], searchTerm: string): PortfolioCard[] {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return cards;
  
  return cards.filter(card => 
    card.title.toLowerCase().includes(term) ||
    card.description.toLowerCase().includes(term) ||
    card.tags.some(tag => tag.toLowerCase().includes(term)) ||
    (card.categoryName && card.categoryName.toLowerCase().includes(term))
  );
}
