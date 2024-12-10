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
  institution: string;
  degree: string;
  startYear: string; //"YYY-MM-DD"
  endYear?: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string; //"YYY-MM-DD"
  description?: string;
}
export interface Experience {
  company: string;
  jobTitle: string;
  startDate: string; //"YYY-MM-DD"
  endDate?: string;
  description?: string;
}

export interface References {
  name: string;
  contactInfo: string;
  relationship: string;
}

export type User = UserPost & ApiGeneratedFields;
export type CV = CVPost & ApiGeneratedFields;
