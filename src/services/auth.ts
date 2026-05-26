import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const loginWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email.trim(), password);

export const registerWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email.trim(), password);

export const logout = () => signOut(auth);

export const deleteCurrentAccount = async (): Promise<void> => {
  const user = auth.currentUser;
  if (!user) return;
  await deleteUser(user);
};
