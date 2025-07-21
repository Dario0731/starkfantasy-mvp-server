import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SportmonksSoccerService {
  private readonly baseUrl = 'https://api.sportmonks.com/v3/football/';
  private readonly apiToken = 'mznBIBP3vX9D2EDLHYOj5UM82R6HMysxGQsEWzqLiLq2rqL5RDDnMNIaMR0b';
  private readonly premierLeagueId=8;
  private readonly laLigaId = 564;

  constructor(
    private readonly httpService: HttpService,
  ) { }


private async getLatestPremierLeagueSeason(): Promise<number> {
  const url = `${this.baseUrl}/leagues/${this.premierLeagueId}?api_token=${this.apiToken}&include=currentSeason`;
  const response$ = this.httpService.get(url);
  const response = await lastValueFrom(response$);

  return response.data.data.currentseason.id;
}

async getPremierLeagueTeams(): Promise<any[]> {
  const seasonId = await this.getLatestPremierLeagueSeason();
  const url = `${this.baseUrl}/teams/seasons/${seasonId}?api_token=${this.apiToken}`;
  const response$ = this.httpService.get(url);
  const response = await lastValueFrom(response$);

  return response.data.data;
}


  //Obtener los partidos 
  async getPremierLeagueMatches(includeScore:boolean = false): Promise<any> {
    const seasonId = await this.getLatestPremierLeagueSeason();
    const url = `${this.baseUrl}/schedules/seasons/${seasonId}?api_token=${this.apiToken}'}`;
    const response$ = this.httpService.get(url);
    const response = await lastValueFrom(response$);
    return response.data.data;

  }

}
