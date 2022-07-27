import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ResetPasswordComponent } from 'src/app/modules/authentication/components/reset-password/reset-password.component';
import { ResetPasswordDTO } from 'src/app/modules/authentication/models/reset-password-dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  edit: boolean;
  ischangePassword: boolean;
  resetPassDto: ResetPasswordDTO;
  @ViewChild(ResetPasswordComponent) resetPasswordComponent: ResetPasswordComponent;
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  EditProfile()
  {
    this.edit = true;
  }
  save(){
    this.edit = false;
  }
  changePassword(){
    this.ischangePassword = true;
  }
  ConfirmeChangePassword() {
    this.resetPasswordComponent.resetPassword;
  }
}
