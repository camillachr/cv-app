export interface User extends UserPost {
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
  role?: string;
}

//Generisk type for alle api-responser, da dataen ligger nested i items
export interface ApiResponse<T> {
  cursor: string | null;
  items: T[];
  next_page: string | null;
}
