//Generisk type for alle api-responser, da dataen ligger nested i items
export interface ApiResponse<T> {
  cursor: string | null;
  items: T[];
  next_page: string | null;
}

export interface ApiGeneratedFields {
  _uuid: string;
  _created: number;
  _data_type: string;
  _is_deleted: boolean;
  _modified: number;
  _self_link: string;
  _user: string;
}

export interface UserPost {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface CVPost {
  userId: string;
  personalInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  skills?: string[];
  education?: Education[];
  certificates?: Certificate[];
  experience?: Experience[];
  references?: References[];
}

export interface Education {
  //id: string; ??
  institution: string;
  degree: string;
  startYear: number;
  endYear?: number;
}

export interface Certificate {
  //id: string; ??
  title: string;
  issuer: string;
  date: string;
  description?: string;
}
export interface Experience {
  //id: string; ??
  company: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface References {
  //id: string; ??
  name: string;
  contactInfo: string;
  relationship: string;
}

export type User = UserPost & ApiGeneratedFields;
export type CV = CVPost & ApiGeneratedFields;
