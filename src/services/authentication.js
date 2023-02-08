import { auth } from "@/plugins/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  onAuthStateChanged,
  signOut,
  updateProfile,
  updatePhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
} from "firebase/auth";
import localStorage from "@/utils/localStorage";

export default {
  create: (email, password) => {
    console.log(email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  },
  signIn: async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  signOut: () => {
    return signOut(auth);
  },
  sendPasswordResetEmail: (email) => {
    return sendPasswordResetEmail(auth, email);
  },
  sendUpdatePhoneNumberCode: async (phoneNumber) => {
    const applicationVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
    const provider = new PhoneAuthProvider(auth);
    const verificationId = await provider.verifyPhoneNumber(
      `+55${phoneNumber}`,
      applicationVerifier
    );
    return verificationId;
  },
  confirmUpdatePhoneNumberCode: (verificationId, phoneCode) => {
    const phoneCredential = PhoneAuthProvider.credential(
      verificationId,
      phoneCode
    );
    return updatePhoneNumber(auth.currentUser, phoneCredential);
  },
  resetPassword: (submitCode, newPassword) => {
    return confirmPasswordReset(auth, submitCode, newPassword);
  },
  hasAuthenticatedUser: (callback) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.push("userUID", user.uid);
        if (callback) {
          callback("setProfileData", user);
        }
      } else {
        localStorage.push("userUID", null);
      }
    });
  },
  getCurrentUser: () => {
    return auth.currentUser;
  },
  updateUserProfile: async (newProfileData) => {
    return updateProfile(auth.currentUser, newProfileData).then(() => {});
  },
};
