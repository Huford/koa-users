import createError from 'http-errors';
import { User } from './user';
import { users } from './users';

export class UsersService {
  public get(id: number): User {
    const result = users.filter((a) => a.id === id);
    if (result.length && result.length > 0) {
      const [user] = result;
      return {
        ...user,
      };
    } else {
      const err = createError(404, 'User not found');
      throw err;
    }
  }
}
