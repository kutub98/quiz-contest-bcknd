export interface IOffer {
  OfferName: string;
  OfferDetails: string;
  OfferInfo: [string];
  img: string;
  status?: 'pending' | 'delete' | 'approved';
}
