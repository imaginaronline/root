export interface AuthRequestData {
    emailOrUserName: string;
    password: string;
  }

  export interface AuthResponseData {
    status: boolean;
    statusMessage: string;
    data: {
      access_token: string;
      expires_at: string; // This should be parsed into a Date or timestamp in your code
    };
  }