import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isOpen: boolean = true;
  type: string;
  email: string;
  constructor(private LoginService: LoginService) { }

  ngOnInit(): void {
    this.getUserType();
    this.getEmail();
  }

  setNav(): void{
    this.isOpen = !this.isOpen;
  }

  getUserType(){
    this.type = localStorage.getItem('type');
  }

  signOut(){
    this.LoginService.signOut();
  }

  getEmail(){
    this.email = localStorage.getItem('email');
  }
}
