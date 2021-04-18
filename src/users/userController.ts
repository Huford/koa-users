import { Controller, Get, Path, Route, Security } from 'tsoa';
import { User } from './user';
import { UsersService } from './usersService';

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  @Security('api_key')
  public async getUser(@Path() userId: number): Promise<User | void> {
    return new UsersService().get(userId);
  }
}
