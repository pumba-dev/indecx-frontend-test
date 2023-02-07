import localStorage from "@/utils/localStorage";

export default async (to) => {
  const authenticated = await localStorage.get("token");
  const isDashboardPath = to.path.match(/\/dashboard/);

  if (isDashboardPath && !authenticated) {
    return "login";
  }
};
