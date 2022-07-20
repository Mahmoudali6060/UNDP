export class UserProfileDTO {
    id: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    userName: string | undefined;
    password: string | undefined;
    role: string | undefined;
    defaultLanguage: string = '';
    token: string | undefined;
    imageBase64: string | undefined;
    imageUrl: string | undefined;
}