import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {LoginService} from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  nameInput:string;
  passwordInput:string;

  nameBool: Boolean = false;
  passwordBool: Boolean = false;

  constructor(private fb: FormBuilder, private LoginService: LoginService) {
    
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
        //Checking authentication of user
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
