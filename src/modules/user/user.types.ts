export type UserType = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  user_name: string | null;
  email: string;
  password_hash: string | null;
  phone: string | null;
  refresh_token: string | null;
  email_verification_token: string;
  email_verification_expires_at: Date;
  is_verified: boolean;
  is_active: boolean;
  status: "active" | "banned" | "suspended";
  created_at: Date;
  updated_at: Date;
};
