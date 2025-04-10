export interface AboutData {
  name: string;
  details: string[];
}

export interface Position {
  title: string;
  period: string;
  department: string;
}

export interface CareerProject {
  team: string;
  title: string;
  tasks: string[];
}

export interface CareerData {
  company: string;
  positions: Position[];
  projects: CareerProject[];
}

export interface Project {
  id: string;
  title: string;
  skills: string[];
  link?: string;
  description: string;
  role: string[];
  result: string[];
  logo?: string;
  code?: string[];
  gif?: string;
  period?: string;
  image?: string;
  github?: string;
}

export interface PortfolioData {
  projects: Project[];
}

export interface SkillsData {
  languages: string[];
  frameworks: string[];
  tools: string[];
}