// import localStorage from "@/utils/localStorage";
import authService from "@/services/authentication";

export default async (to) => {
  // const authenticated = await localStorage.get("token");
  const authenticated = authService.hasAuthenticatedUser();
  const isDashboardPath = to.path.match(/\/dashboard/);

  if (isDashboardPath && !authenticated) {
    return "login";
  }
};
