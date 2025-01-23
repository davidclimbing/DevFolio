export interface Project {
  title: string;
  skills: string[];
  links?: Link[]
  link?: Link
}

export interface Link {
  label: string
  url: string
}
