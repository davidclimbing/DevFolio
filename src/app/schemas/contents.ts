export interface Contents {
  projects: Project[];
}

export interface Project {
  id: string;
  title: string;
  skills: string[];
  logo?: string;
  link?: string
  description?: string;
  role?: string[];
  result?: string[];
  gif?: string;
  code?: string[];
  detailed?: string;
}
