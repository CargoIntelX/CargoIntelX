export function getUserRedirect(
  emailVerified: boolean,
  onboardingState: string
) {
  if (!emailVerified) {
    return "/verify-email";
  }

  switch (onboardingState) {
    case "signup_pending":
      return "/verify-email";

    case "email_verified":
      return "/company";

    case "company_pending":
      return "/company";

    case "company_created":
      return "/domain";

    case "domain_pending":
      return "/domain";

    case "completed":
      return "/dashboard";

    default:
      return "/dashboard";
  }
}