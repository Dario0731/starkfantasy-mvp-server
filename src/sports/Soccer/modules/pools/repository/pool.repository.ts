import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { SoccerPool } from "src/Soccer.schema";

@Injectable()
export class SoccerPoolRepository {
   constructor(
      @InjectRepository(SoccerPool)
      private readonly repo: Repository<SoccerPool>,
   ) { }

   async create(pool: SoccerPool) {
      // validate matched Id is not registered already
      if (!pool.matchId) {
         throw new Error('Cricket Match ID is required');
      }
      if (!pool.id) {
         throw new Error('Pool ID is required');
      }
      // check if the pool already exists
      let existing = await this.repo.findOne({ where: { matchId: pool.matchId } });
      if (existing) {
         throw new Error('Pool for this match already exists');
      }
      return this.repo.insert(pool);
   }

   findAll() {
      return this.repo.find({
         relations: ['match'],
      });
   }
   delete(id: string) {
      return this.repo.delete(id);
   }
   findOne(id: string) {
      return this.repo.findOne({ where: { id } });
   }
   update(pool: SoccerPool) {
      return this.repo.save(pool);
   }
}