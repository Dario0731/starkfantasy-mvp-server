import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { SoccerTeamRepository } from '../repository/team.repository';
import { SoccerTeam } from 'src/Soccer.schema';

@Injectable()
export class SoccerTeamService {
  constructor(private readonly teamRepo: SoccerTeamRepository) {}

  async create(teamData: SoccerTeam) {
    const team = new SoccerTeam(teamData.id,teamData.leagueId ,teamData.name, teamData.image_path);
    try {
      return await this.teamRepo.create(team);
    } catch (error) {
      if (error.code === '23505' || error.number === 2627) {
        throw new ConflictException('The team ID already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<SoccerTeam[]> {
    return this.teamRepo.findAll();
  }

  async findOne(id: string): Promise<SoccerTeam | null> {
    const team = await this.teamRepo.findOne(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async update(id: string, teamData: Partial<SoccerTeam>): Promise<SoccerTeam> {
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
