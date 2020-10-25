import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { ProfileInterface } from '../models/profile.interface';
import { FileInterface } from '../models/file.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profilesCollection: AngularFirestoreCollection<ProfileInterface>;
  private filePath: any;
  private downloadURL: string;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private router: Router) {
    this.profilesCollection = afs.collection<ProfileInterface>('profiles');
  }

  public getAllProfiles(): Observable<ProfileInterface[]> {
    return this.profilesCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ProfileInterface;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getOneProfile(id: string): Observable<ProfileInterface> {
    return this.afs.doc<ProfileInterface>(`profiles/${id}`).valueChanges();
  }

  public deleteProfileById(profile: ProfileInterface) {
    return this.profilesCollection.doc(profile.id).delete();
  }

  public preAddAndUpdateProfile(profile: ProfileInterface, image: FileInterface): void {
    this.uploadImage(profile, image);
  }

  public editProfileById(profile: ProfileInterface, newImage?: FileInterface) {
    if (newImage) {
      this.uploadImage(profile, newImage);
    } else {
      return this.profilesCollection.doc(profile.id).update(profile);
    }
  }

  public saveProfile(profile: ProfileInterface, imageUrl?: string) {
    const profileObj = {
      uid: profile.uid,
      email: profile.email,
      password: profile.password || '',
      name: profile.name,
      alias: profile.alias,
      image: profile.image,
      imageUrl: imageUrl || profile.imageUrl,
      age: profile.age,
      address: profile.address,
      phone: profile.phone,
      description: profile.description,
      interest: profile.interest,
      languaje: profile.languaje,
      sex: profile.sex
    };
    this.router.navigate(['/']);
    if (profile.id) {
      return this.profilesCollection.doc(profile.id).update(profileObj);
    } else {
      setTimeout(()=> {
        location.reload();
      }, 1000);
      return this.profilesCollection.add(profileObj);
    }
  }

  private uploadImage(profile: ProfileInterface, image: FileInterface) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.saveProfile(profile, urlImage);
          });
        })
      ).subscribe();
  }

}
