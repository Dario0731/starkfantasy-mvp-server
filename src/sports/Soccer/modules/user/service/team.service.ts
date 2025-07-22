import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from 'src/Soccer.schema';

@Injectable()
export class UserService {
  constructor(private readonly teamRepo: UserRepository) {}

  async create(teamData: User) {
    const team = new User(teamData.contract_address,teamData.username ,teamData.email, teamData.profile_url);
    try {
      return await this.teamRepo.create(team);
    } catch (error) {
      if (error.code === '23505' || error.number === 2627) {
        throw new ConflictException('The team ID already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.teamRepo.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    const team = await this.teamRepo.findOne(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async update(id: string, teamData: Partial<User>): Promise<User> {
    const existingTeam = await this.teamRepo.findOne(id);
    if (!existingTeam) {
      throw new NotFoundException('Team not found');
    }
    const updatedTeam = Object.assign(existingTeam, teamData);
    try {
      return await this.teamRepo.update(id, updatedTeam);
    } catch (error) {
      if (error.code === '23505' || error.number === 2627) {
        throw new ConflictException('The team ID already exists');
      }
      throw error;
    }
  }


  async delete(id: string): Promise<void> {
    const team = await this.teamRepo.findOne(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    await this.teamRepo.delete(id);
  }
}
