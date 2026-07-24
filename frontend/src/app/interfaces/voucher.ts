export interface Voucher {
  _id: string;
  code: string;
  discount_type: 'PERCENTAGE' | 'FIXED';
  discount_value: number;
  min_order_value: number;
  max_discount_amount: number;
  start_date: string;
  end_date: string;
  usage_limit: number;
  used_count: number;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
  created_at: string;
}
