import { Entity, PrimaryColumn,PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// ======================
// SoccerTeam Entity
// ======================
@Entity('soccer_team')
export class SoccerTeam {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  leagueId: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  image_path: string;

  @OneToMany(() => SoccerMatch, match => match.homeTeam)
  homeMatches: SoccerMatch[];

  @OneToMany(() => SoccerMatch, match => match.awayTeam)
  awayMatches: SoccerMatch[];

  @OneToMany(() => SoccerMatch, match => match.winner)
  matchesWon: SoccerMatch[];

    constructor(id: string, idLeague, name: string, image_path: string) {
    this.id = id;
    this.leagueId= idLeague;
    this.name = name;
    this.image_path = image_path;
  }
}

// ======================
// SoccerMatch Entity
// ======================
@Entity('soccer_match')
export class SoccerMatch {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @ManyToOne(() => SoccerTeam, team => team.homeMatches, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'homeTeamId' })
  homeTeam: SoccerTeam;

  @Column({ type: 'varchar', length: 100, nullable: true })
  homeTeamId: string;

  @ManyToOne(() => SoccerTeam, team => team.awayMatches, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'awayTeamId' })
  awayTeam: SoccerTeam;

  @Column({ type: 'varchar', length: 100, nullable: true })
  awayTeamId: string;

  @ManyToOne(() => SoccerTeam, team => team.matchesWon, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'winnerId' })
  winner: SoccerTeam;

  @Column({ type: 'varchar', length: 100, nullable: true })
  winnerId: string;

  @Column({ type: 'datetime' })
  matchDate: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  result: string;

  @OneToMany(() => SoccerPool, pool => pool.match)
  pools: SoccerPool[];

    constructor(
    id: string,
    homeTeamId: string,
    awayTeamId: string,
    matchDate: Date,
  ) {
    this.id = id;
    this.homeTeamId = homeTeamId;
    this.awayTeamId = awayTeamId;
    this.matchDate = matchDate;
    this.winnerId= "null";
    this.result= "null";
  }
}

// ======================
// SoccerPool Entity
// ======================
@Entity('soccer_pool')
export class SoccerPool {

  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;
  @ManyToOne(() => SoccerMatch, match => match.pools, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'matchId' })
  match: SoccerMatch;

  @Column({ type: 'varchar', length: 100 })
  matchId: string;

  @Column({ type: 'varchar', length: 150 })
  userId: string;

  @Column({ type: 'int' })
  isFinalized: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  result: string;

    constructor(matchId: string, userId : string, result: string) {
      this.matchId = matchId;
      this.isFinalized = 0;
      this.result = result; // Default result
      this.userId = userId; // Default result
    }

    
}
@Entity('user')
export class User {

  @PrimaryColumn({ type: 'varchar', length: 150 })
  contract_address: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 150 })
  profile_url: string;

  @Column({ type: 'int' })
  is_deleted: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  constructor(
    contract_address: string,
    username: string,
    email: string,
    profile_url: string
  ) {
    this.contract_address = contract_address;
    this.username = username;
    this.email = email;
    this.profile_url = profile_url;
    this.is_deleted = 0; 
  }
    }
