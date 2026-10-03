export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password_hash: string | null;
  phone: string | null;
  is_verified: boolean;
  is_active: boolean;
  status: "active" | "banned" | "suspended";
  created_at: Date;
  updated_at: Date;
};

