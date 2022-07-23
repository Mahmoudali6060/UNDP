import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  private token: string;
  private email: string;
  fieldOldTextType: boolean;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  constructor(fb: FormBuilder, private _authService: AuthService, private _passConfValidator: PasswordConfirmationValidatorService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      oldpassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });

    this.resetPasswordForm.get('confirm')?.setValidators([Validators.required,
      this._passConfValidator.validateConfirmPassword(this.resetPasswordForm.value.get('password'))]);
      this.token = this._route.snapshot.queryParams['token'];
      this.email = this._route.snapshot.queryParams['email'];
  }
  toggleOldFieldTextType() {
    this.fieldOldTextType = !this.fieldOldTextType;
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
      oldpassword:resetPass.oldpassword,
      password: resetPass.password,
      confirmPassword: resetPass.confirm,
      token: this.token,
      email: this.email
    }

    this._authService.resetPassword('api/Authenticate/ResetPassword', resetPassDto)
      .subscribe(_ => {
        this.showSuccess = true;
        console.log("token", resetPassDto)
      },
        error => {
          this.showError = true;
          this.errorMessage = error;
        })
  }

}