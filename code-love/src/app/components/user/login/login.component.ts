import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public registerForm: FormGroup;
  public hide: boolean = true;

  @ViewChild('btnOpenLogin')
  btnOpenLogin: ElementRef;

  @ViewChild('formLogin')
  formLogin: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  validations() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onOpenModal(){
    this.registerForm.reset();
    this.formLogin.reset();
    this.btnOpenLogin.nativeElement.click();
  }

  ngOnInit(): void {
    this.validations();
  }

  onLogin() {
    if (this.registerForm.valid) {
      this.authService.login(
        this.registerForm.value.email,
        this.registerForm.value.password
      );
    }
  }

  onLoginFacebook(){
    this.authService.loginFacebook();
  }

  onLoginGoogle(){
    this.authService.loginGoogle();
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(
        this.registerForm.value.email,
        this.registerForm.value.password
      );
    }
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

}
