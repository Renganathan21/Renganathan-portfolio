export interface SocialMedia {
  name: string;
  url: string;
  icon: string; // we will use string identifier to map to lucide-react or custom SVG
  navbar: boolean;
}

export interface Contact {
  email: string;
  tel: string;
  social: {
    GitHub: SocialMedia;
    LinkedIn: SocialMedia;
    email: SocialMedia;
    googleDrive: SocialMedia;
  };
}

export interface WorkExperience {
  company: string;
  href: string;
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string;
  badges?: string[];
}

export interface Education {
  school: string;
  href: string;
  degree: string;
  start: string;
  end: string;
  logoUrl?: string;
}

export interface ProjectLink {
  type: string;
  href: string;
  icon: string;
}

export interface Project {
  title: string;
  href?: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: string[];
  links?: ProjectLink[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface PortfolioData {
  url: string;
  name: string;
  initials: string;
  location: string;
  locationLink: string;
  description: string;
  summary: string;
  avatarUrl: string;
  skills: string[];
  contact: Contact;
  work: WorkExperience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
