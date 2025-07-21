import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { SoccerMatchRepository } from '../repository/match.repository';
import { SoccerMatch } from 'src/Soccer.schema';

@Injectable()
export class SoccerMatchService {
  constructor(private readonly matchRepo: SoccerMatchRepository) {}

  async create(entity: SoccerMatch) {
    const match = new SoccerMatch(
      entity.id,
      entity.homeTeamId,
      entity.awayTeamId,
      entity.matchDate
    );
    try {
      return await this.matchRepo.create(match);
    } catch (error) {
      if (error.code === '23505' || error.number === 2627) {
        throw new ConflictException('The game ID already exists.');
      }
      throw error;
    }
  }

  findAll() {
    return this.matchRepo.findAll();
  }

   findByWeek (){
    return this.matchRepo.findByWeekRange();
   }
   
  async findOne(id: string) {
    const match = await this.matchRepo.findOne(id);
    if (!match) {
      throw new NotFoundException('Game hasn´t been found');
    }
    return match;
  }

  async delete(id: string): Promise<void> {
    const match = await this.matchRepo.findOne(id);
    if (!match) {
      throw new NotFoundException('Game hasn´t been found');
    }
    await this.matchRepo.delete(id);
  }
}
