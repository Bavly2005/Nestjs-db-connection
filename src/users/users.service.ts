import { Injectable, NotFoundException } from '@nestjs/common';
// import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { MongoIdDto } from './dtos/mongo-id.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  // constructor(
  //   @InjectRepository(User)
  //   private userRepository: Repository<User>,
  // ) {}

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUsers(): Promise<User[]> {
    // return await this.userRepository.find();
    const users = await this.userModel.find();
    return users;
  }

  async findUserById(id: /*number*/ MongoIdDto): Promise<User> {
    // const user = await this.userRepository.findOneBy({ id });
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`Not found user for this id: ${id}`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // const newUser = await this.userRepository.save(createUserDto);
    const newUser = await this.userModel.create(createUserDto);
    return newUser;
  }

  async updateUser(
    id: /*number*/ MongoIdDto,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    //   // 1) find user to update
    //   // const userToUpdate = await this.findUserById(id);
    //   const userToUpdate =  await this.findUserById(id);
    //   if (!userToUpdate) {
    //     throw new NotFoundException(`Not found user for this id: ${id}`);
    //   }

    //   // 2) update the element
    //   const updatedUser = { ...userToUpdate, ...updateUserDto };

    //   return this.userRepository.save(updatedUser);

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    return updatedUser;
  }

  async deleteUser(id: MongoIdDto): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }
}
