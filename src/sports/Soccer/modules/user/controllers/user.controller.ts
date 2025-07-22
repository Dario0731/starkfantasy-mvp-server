import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from '../service/team.service';
import { User } from 'src/Soccer.schema';

@Controller('user')
export class UserController {
  constructor(private readonly teamService: UserService) {}

  @Post()
  async create(@Body() teamData: User): Promise<User> {
    return this.teamService.create(teamData);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.teamService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() teamData: Partial<User>,
  ): Promise<User> {
    return this.teamService.update(id, teamData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.teamService.delete(id);
  }
}
