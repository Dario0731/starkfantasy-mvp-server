import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SoccerPoolService } from '../service/pool.service';
import { SoccerPool } from 'src/Soccer.schema';

@Controller('soccer-pool')
export class SoccerPoolController {
  constructor(private readonly poolService: SoccerPoolService) {}

  @Post()
  create(@Body() dto: SoccerPool) {
    return this.poolService.create(dto);
  }

  @Get()
  findAll() {
    return this.poolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poolService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.poolService.delete(id);
  }
}
