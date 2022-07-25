import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageItems } from 'src/app/shared/constants/local-storage-items';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ResetPasswordDTO } from '../../models/reset-password-dto';
import { AuthService } from '../../services/auth.service';
import { PasswordConfirmationValidatorService } from '../Customvalidators/password-confirmation-validator.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;
  token: string;
  email: string;
  oldfieldTextType: boolean;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  constructor(fb: FormBuilder, private _authService: AuthService, private _passConfValidator: PasswordConfirmationValidatorService,
    private localStorageService: LocalStorageService,
    private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      //oldPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required])
    });

    // this.resetPasswordForm.get('confirm')?.setValidators([Validators.required,
    //   this._passConfValidator.validateConfirmPassword(this.resetPasswordForm.value.get('password'))]);

      this.token =  this.localStorageService.getItem(LocalStorageItems.token)
      this.email = this.localStorageService.getItem(LocalStorageItems.email)
      if(this.token === null && this.email === null){
      this.token = this._route.snapshot.queryParams['token'];
      this.email = this._route.snapshot.queryParams['email'];
      }

  }
  toggleOldFieldTextType() {
    this.oldfieldTextType = !this.oldfieldTextType;
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.controls[controlName].invalid && this.resetPasswordForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.controls[controlName].hasError(errorName)
  }

  public resetPassword = (resetPasswordFormValue: any) => {
    this.showError = this.showSuccess = false;

    const resetPass = { ...resetPasswordFormValue };
    const resetPassDto: ResetPasswordDTO = {
     // oldPassword:resetPass.oldPassword,
      password: resetPass.password,
      confirmPassword: resetPass.confirm,
      token: this.token,
      email: this.email
    }

    this._authService.resetPassword('Account/ResetPassword', resetPassDto)
      .subscribe(_ => {
        this.showSuccess = true;
      },
        error => {
          this.showError = true;
          this.errorMessage = error;
        })
  }

}