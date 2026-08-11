import regulations from '@/content/docs/regulations-supervisors.json';
import introBook from '@/content/docs/intro-book.json';
import codeOfConduct from '@/content/docs/code-of-conduct.json';
import teamHierarchy from '@/content/docs/team-hierarchy.json';

export interface Doc {
  id: string;
  title: string;
  description: string;
  pdfPath: string;
  updated: string;
}

export const docs: Doc[] = [
  { id: 'regulations-supervisors', ...(regulations as Omit<Doc, 'id'>) },
  { id: 'intro-book', ...(introBook as Omit<Doc, 'id'>) },
  { id: 'code-of-conduct', ...(codeOfConduct as Omit<Doc, 'id'>) },
  { id: 'team-hierarchy', ...(teamHierarchy as Omit<Doc, 'id'>) },
];
