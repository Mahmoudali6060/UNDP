export interface ResetPasswordDTO {
    oldpassword:string
    password: string;
    confirmPassword: string;
    email: string;
    token: string;
}