import { Injectable } from "@nestjs/common";
import { Repository, Between } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { SoccerMatch } from "src/Soccer.schema";

@Injectable()
export class SoccerMatchRepository {
  constructor(
    @InjectRepository(SoccerMatch)
    private readonly repo: Repository<SoccerMatch>,
  ) {}

  create(match: SoccerMatch) {
    return this.repo.insert(match);
  }

  findAll() {
    return this.repo.find({
      relations: ['homeTeam', 'awayTeam']
    });
  }

  delete(id: string) {
    return this.repo.delete(id);
  }

  findOne(id: string) {
    return this.repo.findOne({ 
      where: { id },
      relations: ['homeTeam', 'awayTeam']
    });
  }

  async findByWeekRange() {
   const { startDate, endDate } = this.getWeekRange();
 
   return this.repo.find({
     where: {
       matchDate: Between(startDate, endDate) 
     },
     relations: ['homeTeam', 'awayTeam']
   });
 }
 

  private getWeekRange(): { startDate: Date, endDate: Date } {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = (dayOfWeek + 6) % 7;

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - diffToMonday);
    startDate.setHours(0, 0, 0, 0); 

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);
    endDate.setHours(0, 0, 0, 0); 

    return { startDate, endDate };
  }
}
