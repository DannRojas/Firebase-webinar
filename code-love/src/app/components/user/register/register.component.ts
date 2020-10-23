import { AuthService } from './../../../services/auth.service';
import { ProfileService } from './../../../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { ProfileInterface } from './../../../models/profile.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public hide: boolean = true;

  private image: any;
  public profile: ProfileInterface = {};

  constructor( private profileService: ProfileService, private authService: AuthService ) { }

  ngOnInit(): void {
  }

  onRegister(){
    this.authService.register(this.profile.email, this.profile.password).then(res => {
      this.profile.uid = res.user.uid;
      this.profileService.preAddAndUpdateProfile(this.profile, this.image);
    })
  }

  handleImage(event: any): void{
    this.image = event.target.files[0];
    this.profile.image = this.image.name;
  }

}
