import { LoginComponent } from './../user/login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLogued:boolean = false;
  public user;

  @ViewChild(LoginComponent)
  loginComponent: LoginComponent;

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
    if(this.user){
      this.isLogued = true;
    }
  }

  onLogout(){
    this.authService.logout();
    this.isLogued = false;
    this.router.navigate(['/']);
  }

}
