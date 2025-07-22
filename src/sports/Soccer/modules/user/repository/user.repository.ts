import { Injectable, ConflictException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "src/Soccer.schema";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(teamData: User): Promise<User> {
    const existing = await this.repo.findOne({ where: { contract_address: teamData.contract_address } });
    if (existing) {
      throw new ConflictException('The user ID already exists');
    }
    return this.repo.save(teamData);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(contract_address: string): Promise<User | null> {
    return this.repo.findOne({ where: { contract_address } });
  }

  async update(contract_address: string, teamData: Partial<User>): Promise<User> {
    const existing = await this.repo.findOne({ where: { contract_address } });
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
