import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SoccerMatchService } from '../service/match.service';
import { SoccerMatch } from "src/Soccer.schema";


@Controller('soccer-match')
export class SoccerMatchController{
    constructor (private readonly matchService: SoccerMatchService){}

@Post()
create (@Body() dto: SoccerMatch){
    return this.matchService.create(dto);
}

@Get()
findAll(){
    return this.matchService.findAll();
}


@Get('/week-matchs')
findByWeek(){
    return this.matchService.findByWeek();
}


@Get (':id')
findOne(@Param ('id') id:string){
    return this.matchService.findOne(id);
}

@Delete (':id')
delete (@Param('id') id:string){
return this.matchService.delete(id);
}
}

