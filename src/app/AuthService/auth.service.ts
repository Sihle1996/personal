import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    if (!firebase.apps.length) {
      console.log('Initializing Firebase');
      firebase.initializeApp(environment.firebaseConfig);
    } else {
      console.log('Firebase already initialized');
      firebase.app();
    }
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      console.log('Attempting to sign in with Google');
      const credential = await this.afAuth.signInWithPopup(provider);
      console.log('Signed in successfully:', credential);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  }

  async signOut() {
    try {
      console.log('Signing out');
      await this.afAuth.signOut();
      console.log('Signed out successfully');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  }
}
