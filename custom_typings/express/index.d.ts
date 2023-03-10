declare namespace Express {
  type Request = {
    token: string;
    user: string | object;
  };
}