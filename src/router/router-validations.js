import { auth } from "@/plugins/firebase";

export default (to) => {
  console.log(to);
  // Validations Constraints
  const authenticated = auth.currentUser != null;
  const isDashboardPath = to.path.match(/\/dashboard/);

  // VALIDATION BEGIN
  if (isDashboardPath && !authenticated) {
    return "login";
  }
};
