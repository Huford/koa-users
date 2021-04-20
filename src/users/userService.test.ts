import {
  NO_COORDINATES_ERROR_MSG,
  INCORRECT_RADIUS_VALUE_ERROR_MSG,
  USER_NOT_FOUND_ERROR_MSG,
  INVALID_LAT_LNG_ERROR_MSG,
} from './constants';
import { singleUser, allUsers, gmailUsers, gmailUsersEmails } from './fixtures';
import { UsersService } from './usersService';

describe('UserService Class', () => {
  const userService = new UsersService();
  describe('getUserById method', () => {
    it('should return one user', async () => {
      const user = await userService.getUserById(3);
      expect(user).toStrictEqual(singleUser);
    });
    it("should return 404 if the user doesn't exists", async () => {
      try {
        await userService.getUserById(50);
      } catch (e) {
        expect(e.statusCode).toBe(404);
        expect(e.message).toBe(USER_NOT_FOUND_ERROR_MSG);
      }
    });
  });
  describe('getUsers method', () => {
    it('should return all users', async () => {
      const user = await userService.getUsers({});
      expect(user).toStrictEqual(allUsers);
    });

    it('should return 400 error if a radius is provided without coordinates', async () => {
      try {
        await userService.getUsers({ radius: 10 });
      } catch (e) {
        expect(e.statusCode).toBe(400);
        expect(e.message).toBe(NO_COORDINATES_ERROR_MSG);
      }
    });

    it('should return 400 error if a radius is negative', async () => {
      try {
        await userService.getUsers({ radius: -10, coordinate: ['1', '1'] });
      } catch (e) {
        expect(e.statusCode).toBe(400);
        expect(e.message).toBe(INCORRECT_RADIUS_VALUE_ERROR_MSG);
      }
    });

    it('should return 400 error if coordinates are incomplete', async () => {
      try {
        await userService.getUsers({ radius: 22, coordinate: ['1'] });
      } catch (e) {
        expect(e.statusCode).toBe(400);
        expect(e.message).toBe(INVALID_LAT_LNG_ERROR_MSG);
      }
    });

    it('should return empty array if there is no email matching emailContains', async () => {
      const users = await userService.getUsers({
        emailContains: '123123123131',
      });
      expect(users).toStrictEqual([]);
    });

    it('should return all gmail users if emailContains is gmail', async () => {
      const users = await userService.getUsers({
        emailContains: 'gmail',
      });
      expect(users).toHaveLength(3);
      expect(users).toStrictEqual(gmailUsers);
    });

    it('should return users inside the radius based on coordinates', async () => {
      expect(
        await userService.getUsers({
          coordinate: ['-68.6102', '-47.0653'],
        })
      ).toStrictEqual([singleUser]);
    });

    it('should return users inside the radius based on coordinates and all gmails users', async () => {
      expect(
        await userService.getUsers({
          coordinate: ['29.4572', '-164.2990'],
          emailContains: 'gmail',
        })
      ).toStrictEqual(gmailUsers);
    });

    it('should return the emails of users inside the radius based on coordinates and all gmails users', async () => {
      expect(
        await userService.getUsers({
          coordinate: ['29.4572', '-164.2990'],
          emailContains: 'gmail',
          fields: ['email'],
        })
      ).toStrictEqual(gmailUsersEmails);
    });
  });
});
