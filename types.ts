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
  downloadUrl?: string;
  mediaUrl?: string;
}

export interface StatItem {
  label: string;
  count: number;
  icon: React.ReactNode;
}