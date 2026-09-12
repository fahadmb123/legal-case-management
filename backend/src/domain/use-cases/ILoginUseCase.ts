export interface LoginResult {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export interface ILoginUseCase {
  execute(email: string, password: string): Promise<LoginResult>;
}
