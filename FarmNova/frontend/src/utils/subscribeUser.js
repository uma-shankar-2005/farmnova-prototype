import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Subscribe a user to the newsletter.
 * @param {string} email - The user's email address.
 * @returns {Promise<void>} Resolves on success, throws on error.
 */
export async function subscribeUser(email) {
  await addDoc(collection(db, "subscribers"), {
    email,
    timestamp: serverTimestamp(),
  });
}
