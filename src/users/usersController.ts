import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
// import { User } from './user.entity';
import { UserService } from './users.service';
import { User } from './schema/user.schema';
import { MongoIdDto } from './dtos/mongo-id.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async find(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Get(':id')
  async findOne(
    @Param('id' /*ParseIntPipe*/)
    id: MongoIdDto,
  ): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Post()
  async create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: MongoIdDto,
    @Body()
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: MongoIdDto): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
