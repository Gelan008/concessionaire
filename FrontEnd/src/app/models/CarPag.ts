export interface CarPag<T>{
  data?: T[];
  current_page?: number;
  last_page_url?: string;
  next_page_url?: string;
  first_page_url?: string;
  from?: number;
  last_page?: number;
  total?: number;
  per_page?: number;
}
