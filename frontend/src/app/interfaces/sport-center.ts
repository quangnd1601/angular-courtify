export interface SportCenter {
  _id: string;
  name: string;
  address: string;
  default_price: number;
  opening_time: string;
  closing_time: string;
  status: string;
  total_views: number;
  total_bookings: number;
  average_rating: number;
  total_reviews: number;
  sport_id: {
    _id: string;
    name: string;
  };
  owner_id: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  created_at: string;
}
