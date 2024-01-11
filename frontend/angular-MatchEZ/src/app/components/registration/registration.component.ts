import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) { }

  myForm : FormGroup;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email:["",[
        Validators.required,
        Validators.email,
        Validators.minLength(4),
        Validators.maxLength(30)
      ]],
      firstName:["",[
        Validators.required,
        Validators.pattern('^[a-zA-Z]+'),
        Validators.maxLength(30)
      ]],
      lastName:["",[
        Validators.required,
        Validators.pattern('^[a-zA-Z]+'),
        Validators.maxLength(30)
      ]],
      password:["",[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]],
      confirmPassword:["",[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]],
      role:["",[
        Validators.required,
      ]]
    })
  }

  roles : String[] = ["Undergraduate Chair", "Instructor"];

  get email(){
    return this.myForm.get('email');
  }

  get firstName(){
    return this.myForm.get('firstName');
  }

  get lastName(){
    return this.myForm.get('lastName');
  }

  get password(){
    return this.myForm.get('password');
  }

  get confirmPassword(){
    return this.myForm.get('confirmPassword');
  }

  get role(){
    return this.myForm.get('role');
  }

  submit(){
    if(!this.myForm.invalid)
    {
      this.registerService.register(this.firstName.value, this.lastName.value, this.password.value, this.email.value, this.role.value).subscribe(data => {
        this.router.navigate(["login"]);
      },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.myForm.reset();
        alert(err.error.err);
      })
    }
  }
}
