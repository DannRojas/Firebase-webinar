import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileInterface } from 'src/app/models/profile.interface';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  public profiles: ProfileInterface[] = [];
  private category: string;

  @ViewChild(ProfileModalComponent)
  profileModalComponent: ProfileModalComponent;

  constructor(private profileService: ProfileService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.category = this._activatedRoute.snapshot.params['cat'];
    // console.log(typeof(this.idCategory));
    this.getListsProfiles();
  }

  getListsProfiles(){
    this.profileService.getAllProfiles().subscribe((profiles:ProfileInterface[]) =>{
      profiles.map(profile => {
        if(profile.languaje==this.category){
          this.profiles.push(profile);
        }
      })
      console.log(this.profiles);
    })
  }

  onViewProfile(profile:ProfileInterface){
    this.profileModalComponent.onOpenModal(profile);
  }

}
