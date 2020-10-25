import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData$: Observable<firebase.User>;

  constructor(
    private afAuth:AngularFireAuth,
    private router: Router
  ) {
    this.userData$ = afAuth.authState;
  }

  async loginFacebook(){
    try{
      const result = await this.afAuth.signInWithPopup( new auth.FacebookAuthProvider());
      this.router.navigate(['/']);
      setTimeout(()=>{
        location.reload();
      }, 500)
    }catch(error){
      console.log(error);
    }
  }

  async loginGoogle(){
    try{
      const result = await this.afAuth.signInWithPopup( new auth.GoogleAuthProvider() );
      this.router.navigate(['/']);
      setTimeout(()=>{
        location.reload();
      }, 500)
    }catch(error){
      console.log(error);
    }
  }

  async login(email: string, password: string){
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/']);
      setTimeout(()=>{
        location.reload();
      }, 500)
    }catch(error){
      console.log(error);
    }
  }

  async register(email: string, password: string){
    try{
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      // this.router.navigate(['/']);
      // setTimeout(()=>{
      //   location.reload();
      // }, 500)
      return result;
    }catch(error){
      console.log(error);
    }
  }

  async logout(){
    try{
      await this.afAuth.signOut();
      setTimeout(()=>{
        location.reload();
      }, 500)
    }catch(error){
      console.log(error);
    }
  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}
