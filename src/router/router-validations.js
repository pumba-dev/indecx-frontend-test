import localStorage from "@/utils/localStorage";
import authService from "@/services/authentication";

export default async (to) => {
  authService.hasAuthenticatedUser();
  const authenticated = await localStorage.get("userUID");
  const isDashboardPath = to.path.match(/\/dashboard/);

  if (isDashboardPath && !authenticated) {
    return "login";
  }
};
