export interface ConsentSignUpRequest {
    userName: string | undefined;
    password: string | undefined;
    confirmPassword:string | undefined;
    phoneNumber:string | undefined;
    oTP:string | undefined;
    consentId:string | undefined;
  }