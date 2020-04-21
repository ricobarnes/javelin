export interface Project {
  id?: number;
  name: string;
  number: string;
  description: string;
  publicationDate: string;
  author: string;
  reviewer: string;
  books: string[];
  articles: string[];
  type: string;
  category: string;
  tags: string[];
  notes: string[];
  phase: string;
  status: string;
  action: string;
}
