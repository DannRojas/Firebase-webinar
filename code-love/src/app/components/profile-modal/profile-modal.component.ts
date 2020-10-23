import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileInterface } from 'src/app/models/profile.interface';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {

  @ViewChild('buttonOpen')
  buttonOpen: ElementRef;

  constructor(private profileService: ProfileService) { }

  public profile: ProfileInterface;
  public whatsApp: string;

  ngOnInit(): void {
  }

  onOpenModal(profile: ProfileInterface){
    this.profile = profile;
    this.buttonOpen.nativeElement.click();
    this.sendMessage();
  }

  sendMessage(){
    this.whatsApp = `https://api.whatsapp.com/send?phone=${this.profile.phone}&text=Hola,%20v%C3%AD%20tu%20perfil%20de%20Code-Love%20Me%20gustar%C3%ADa%20conocerte`;
  }

}
