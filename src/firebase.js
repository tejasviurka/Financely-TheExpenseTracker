import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Initialize Firebase Authentication
const auth = getAuth();

// Usage examples
const signUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('User signed up:', user);
    })
    .catch((error) => {
      console.error('Error signing up:', error);
    });
};

const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('User signed in:', user);
    })
    .catch((error) => {
      console.error('Error signing in:', error);
    });
};
