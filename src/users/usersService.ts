import createError from 'http-errors';
import { User, UserFilters } from './user';
import { users } from './users';
import { getDistanceFromLatLonInKm, transformUser } from './utils';

interface Coordinates {
  lat: string;
  lng: string;
}

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

  public getUsers({
    emailContains,
    coordinate,
    radius,
    fields,
  }: UserFilters): any {
    if (!emailContains && !coordinate && !radius) {
      return users.map((user) => transformUser(user, fields));
    }

    if (radius && !coordinate) {
      const err = createError(400, 'Radius without coordinates');
      throw err;
    }

    if (radius && radius <= 0) {
      const err = createError(400, 'Incorrect radius value');
      throw err;
    }

    let filteredUsers: Set<User> = new Set();

    users.forEach((user) => {
      const {
        address: {
          geo: { lat: userLat, lng: userLng },
        },
        email,
      } = user;

      if (coordinate) {
        const [lat, lng] = coordinate;
        if (!lat || !lng) {
          const err = createError(400, 'Invalid Lat or Lng args');
          throw err;
        }

        if (
          areCoordsInRadius(
            { lat, lng },
            { lat: userLat, lng: userLng },
            radius
          )
        ) {
          filteredUsers.add(user);
        }
      }

      if (emailContains) {
        if (isParamOnEmail(email.toLowerCase(), emailContains)) {
          filteredUsers.add(user);
        }
      }
    });
    const responseFilteredUser = Array.from(filteredUsers);

    return responseFilteredUser.map((user) => transformUser(user, fields));
  }
}
/**
 * @param coords1 - Coordinates of first point
 * @param coords2 - Coordinates of second point
 * @param radius - Radius in Km
 * @returns `true` if the distance between `coords1` and `coords2` is inside the provided
 * `radius` in km or the default radius of 10km
 *
 */
export const areCoordsInRadius = (
  coords1: Coordinates,
  coords2: Coordinates,
  radius: number = 10
) => {
  const { lat: lat1, lng: lng1 } = coords1;
  const { lat: lat2, lng: lng2 } = coords2;
  const parsedLat = Number.parseFloat(lat1);
  const parsedLng = Number.parseFloat(lng1);
  const parsedUserLat = Number.parseFloat(lat2);
  const parsedUserLng = Number.parseFloat(lng2);
  const distance = getDistanceFromLatLonInKm(
    parsedLat,
    parsedLng,
    parsedUserLat,
    parsedUserLng
  );
  if (distance <= radius) {
    return true;
  } else return false;
};

/**
 * @param userEmail - Coordinates of first point
 * @param emailContainsParam - Coordinates of second point
 * @returns `true` if the provided `emailContainsParam` is inside the `userMail`
 *
 */
export const isParamOnEmail = (
  userEmail: string,
  emailContainsParam: string
) => {
  const emailContainesLower = emailContainsParam?.toLowerCase();
  if (userEmail.includes(emailContainesLower)) {
    return true;
  }
  return false;
};
