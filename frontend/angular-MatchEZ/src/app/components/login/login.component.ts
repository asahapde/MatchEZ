import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(private fb: FormBuilder, private LoginService: LoginService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      username:["",[
        Validators.required,
        Validators.email,
      ]],
      password:["",[
        Validators.required
      ]]
    })
  }

  signIn(){
    if((this.form.valid)){ //Stuff valid? We good
      this.LoginService.login(this.form.get("username").value, this.form.get("password").value).subscribe(data=>{
        localStorage.setItem('type', data.type)
        localStorage.setItem('token', data.token )
        this.router.navigate(["appdashboard"]);
      },
      (err: HttpErrorResponse) => {
        this.form.reset();
        alert(err.error.err);
      })
    }
  }

  get username(){
    return this.form.get("username");
  }

  get password(){
    return this.form.get("password");
  }
}
