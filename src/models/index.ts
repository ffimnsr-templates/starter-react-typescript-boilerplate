export type ServiceType = {
  id: number;
  currency: string;
  duration: string;
  name: string;
  price: number;
}

export type BarberType = {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  services: ServiceType[];
}
