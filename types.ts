import React from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export enum ContentType {
  Lesson = 'Lesson',
  Lecture = 'Lecture',
  Speech = 'Speech',
  Benefit = 'Benefit',
  Book = 'Book',
  Article = 'Article',
  News = 'News'
}

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  category?: string;
  date: string;
  type: ContentType;
  imageUrl?: string;
  image?: string; // Backwards compatibility if needed
  downloadUrl?: string;
  mediaUrl?: string;
  videoUrl?: string;
  duration?: string;
  views?: number;
}

export interface StatItem {
  label: string;
  count: number;
  icon: React.ReactNode;
}

export interface Course {
  sys?: {
    id: string;
  };
  title: string;
  description?: string;
  videoUrl?: string;
  tag?: string;
  date?: string;
  image?: {
    url: string;
  };
}

export interface Book {
  sys?: {
    id: string;
  };
  title: string;
  description?: string;
  bookUrl?: string;
  tag?: string;
  date?: string;
  image?: {
    url: string;
    title?: string;
    description?: string;
    contentType?: string;
    fileName?: string;
    size?: number;
    width?: number;
    height?: number;
  };
}