

export interface IService {
  servicesName: string;
  servicesDetails: string;
  serviceInfo: [string];
  img: string;
  status?: 'pending' | 'delete' | 'approved';
}


