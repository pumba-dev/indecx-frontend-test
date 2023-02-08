export default function parseUserProfileDataByAPI(profileAPIData) {
  console.log("Parse API Profile Data", profileAPIData);
  return {
    displayName: profileAPIData.displayName
      ? profileAPIData.displayName
      : "Sem Nome de Exibição",
    email: profileAPIData.email,
    photoURL: profileAPIData.photoURL,
    phoneNumber: profileAPIData.phoneNumber,
  };
}
