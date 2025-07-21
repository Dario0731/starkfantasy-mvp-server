import { Injectable, ConflictException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { SoccerTeam } from "src/Soccer.schema";

@Injectable()
export class SoccerTeamRepository {
  constructor(
    @InjectRepository(SoccerTeam)
    private readonly repo: Repository<SoccerTeam>,
  ) {}

  async create(teamData: SoccerTeam): Promise<SoccerTeam> {
    const existing = await this.repo.findOne({ where: { id: teamData.id } });
    if (existing) {
      throw new ConflictException('The team ID already exists');
    }
    return this.repo.save(teamData);
  }

  async findAll(): Promise<SoccerTeam[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<SoccerTeam | null> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, teamData: Partial<SoccerTeam>): Promise<SoccerTeam> {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) {
      throw new ConflictException('The team ID does not exist');
    }

    Object.assign(existing, teamData);
    return this.repo.save(existing);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
