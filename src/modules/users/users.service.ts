import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_INDEX, USER_REPOSITORY } from 'src/constants';
import { UsersRepository } from './users.repository';
import { SearchService } from '../search/search.service';
import { query } from 'express';

@Injectable()
export class UsersService {

    constructor(private readonly userRepository: UsersRepository,
        @Inject('opensearch-client') private readonly openSearchClient : SearchService) { }

    async create(user: UserDto): Promise<User> {
        // this.openSearchClient.addDocToIndex(USER_INDEX, user);
        return await this.userRepository.create(user);
    }

    async findOneByName(name: string): Promise<User> {
        // const query = {
        //         match: {
        //           name: name
        //         }
        //       }

        // this.openSearchClient.searchDoc(USER_INDEX, query);
        return await this.userRepository.findOneByName(name);
    }

    async findOneByEmail(email: string): Promise<User> {
        // const query = {
        //             match: {
        //               email: email
        //             }
        //           }
        // this.openSearchClient.searchDoc(USER_INDEX, query);
        return await this.userRepository.findOneByEmail(email);
    }

    async findOneById(id: number): Promise<User> {
        // const query = {
        //             match: {
        //               id: id
        //             }
        //           }

        // this.openSearchClient.searchDoc(USER_INDEX, query);
        return await this.userRepository.findOneById(id);
    }
}