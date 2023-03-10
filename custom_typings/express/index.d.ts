declare namespace Express {
  type Request = {
    token: string;
    user: string | object;
  };
}

declare namespace DB {
  type connect = {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number | undefined;
  };
}
