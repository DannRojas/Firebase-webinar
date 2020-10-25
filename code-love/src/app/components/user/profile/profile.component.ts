import { Component, OnInit } from '@angular/core';
import { ProfileInterface } from 'src/app/models/profile.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private image: any = null;
  private user;
  public profile: ProfileInterface = {};

  constructor(private profileService: ProfileService, private authService: AuthService) { }

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
    this.profile.uid = this.user.uid
    this.profile.email = this.user.email
    this.getProfile();
  }

  getProfile(){
    this.profileService.getAllProfiles().subscribe( profiles => {
      profiles.map(profile => {
        if(profile.uid === this.user.uid){
          this.profile = profile;
        }
      })
    })
  }

  onAddOrUpdate(){
    if(this.image === null){
      this.profileService.saveProfile(this.profile);
    }else{
      this.profileService.preAddAndUpdateProfile(this.profile, this.image);
    }
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
    this.profile.image = this.image.name;
  }


}
