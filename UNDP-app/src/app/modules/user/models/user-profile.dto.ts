export class UserProfileDTO {
    id: number;
    firstName: string;
    lastName: string;
    mobile: string;
    jobTitle: string;
    email: string;
    userName: string;
    password: string;
    role: string;
    defaultLanguage: string = '';
    token: string;
    imageBase64: string;
    imageUrl: string;
    userTypeId: number;
    userType: string;
    deviceId: string;
}