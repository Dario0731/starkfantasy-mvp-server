import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { SoccerPoolRepository } from '../repository/pool.repository';
import { SoccerPool } from 'src/Soccer.schema';

@Injectable()
export class SoccerPoolService {
  constructor(private readonly poolRepo: SoccerPoolRepository) {}

  async create(entity: SoccerPool) {
    const team = new SoccerPool(entity.matchId, entity.id, entity.result);
    try {
      return await this.poolRepo.create(team);
    } catch (error) {
      if (error.code === '23505' || error.number === 2627) {
        throw new ConflictException('The pool ID already exists');
      }
      throw error;
    }
  }

  findAll() {
    return this.poolRepo.findAll();
  }

  async findOne(id: string) {
    const team = await this.poolRepo.findOne(id);
    if (!team) {
      throw new NotFoundException('pool not found');
    }
    return team;
  }

  async delete(id: string): Promise<void> {
    const team = await this.poolRepo.findOne(id);
    if (!team) {
      throw new NotFoundException('pool not found');
    }
    await this.poolRepo.delete(id);
  }

}
