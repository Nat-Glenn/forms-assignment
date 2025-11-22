import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export async function logout() {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out: ", error);
  }}