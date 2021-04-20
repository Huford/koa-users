import createError from 'http-errors';
import {
  NO_COORDINATES_ERROR_MSG,
  INCORRECT_RADIUS_VALUE_ERROR_MSG,
  USER_NOT_FOUND_ERROR_MSG,
  INVALID_LAT_LNG_ERROR_MSG,
} from './constants';
import { User, UserFilters } from './user';
import { queryUsers, users } from './dbUsers';
import { transformUser } from './utils';

export class UsersService {
  public async getUserById(id: number): Promise<User> {
    const result = users.filter((a) => a.id === id);
    if (result.length && result.length > 0) {
      const [user] = result;
      return {
        ...user,
      };
    } else {
      const err = createError(404, USER_NOT_FOUND_ERROR_MSG);
      throw err;
    }
  }

  public async getUsers({
    emailContains,
    coordinate,
    radius,
    fields,
  }: UserFilters): Promise<User[]> {
    if (!emailContains && !coordinate && !radius) {
      return users.map((user) => transformUser(user, fields));
    }

    if (radius && !coordinate) {
      const err = createError(400, NO_COORDINATES_ERROR_MSG);
      throw err;
    }

    if (radius && radius <= 0) {
      const err = createError(400, INCORRECT_RADIUS_VALUE_ERROR_MSG);
      throw err;
    }

    if (coordinate && coordinate?.length) {
      const [lat, lng] = coordinate;

      if (!lat || !lng) {
        const err = createError(400, INVALID_LAT_LNG_ERROR_MSG);
        throw err;
      }
    }

    const filteredUsers = queryUsers(coordinate, radius, emailContains);

    return filteredUsers.map((user) => transformUser(user, fields));
  }
}
