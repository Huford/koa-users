interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  [key: string]: any;
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  address?: UserAddress;
  phone?: string;
  website?: string;
  company?: Company;
}

export interface UserFilters {
  emailContains?: string;
  coordinate?: Array<string>;
  radius?: number;
  fields?: Array<string>;
}
