import { Controller, Get, Query, Route, Security } from 'tsoa';
import { User } from './user';
import { UsersService } from './usersService';

@Route('users')
export class UsersController extends Controller {
  @Get()
  @Security('api_key')
  public async getUsers(
    @Query() emailContains?: string,
    @Query() coordinate?: Array<string>,
    @Query() radius?: number,
    @Query() fields?: Array<string>
  ): Promise<User | void> {
    return await new UsersService().getUsers({
      emailContains,
      coordinate,
      fields,
      radius,
    });
  }
}
