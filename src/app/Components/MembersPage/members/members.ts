import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login-service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-members',
  imports: [NgForOf],
  templateUrl: './members.html',
  styleUrl: './members.scss',
})
export class Members{

  membersData: any[] = [];

  constructor(private _loginService: LoginService){

  }

  ngOnInit(){
    this.getAllMembers();
  }

  getAllMembers(){
    this._loginService.getMembers().subscribe({
      next: (response) => {
        console.log(response)
        this.membersData = response.data;
      }, error: (err) => {
        console.error("Error fetching members", err);
      }
    })
  }
}
