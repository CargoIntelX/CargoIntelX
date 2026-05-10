export type OnboardingState =
  | "signup_pending"
  | "email_verified"
  | "company_pending"
  | "company_created"
  | "domain_pending"
  | "domain_verified"
  | "completed";

export interface UserData {
  uid: string;

  fullName: string;

  email: string;

  emailVerified: boolean;

  onboardingState: OnboardingState;

  companyId?: string | null;

  createdAt: Date;
}