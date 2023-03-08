export type Order = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  profession?: string;
};

export type APIResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export type OrderSuccessResponse = {
  invoice_url: string;
};
