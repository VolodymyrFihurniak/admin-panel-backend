import { connectPGDB as db } from '../utils/queries';

class UserContollerAPI {
  public getUsers = async () => {
    const client = await db();
    const result = await client.query('SELECT * FROM users');
    return result.rows;
  };

  public getUserById = async (id: number) => {
    const client = await db();
    const result = await client.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    client.release();
    return result.rows;
  };
  public getUserByUsername = async (username: string) => {
    const client = await db();
    const result = await client.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    client.release();
    return result.rows;
  };
}

export default UserContollerAPI;
