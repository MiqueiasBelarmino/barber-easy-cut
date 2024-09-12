import { TeamMember } from '../models/teamMember';
import { GenericRepository } from './genericRepository';
import errorHandler from '../helpers/errorHandler';

export default class TeamMemberRepository {
    private genericRepository: GenericRepository<TeamMember>;

    constructor() {
        this.genericRepository = new GenericRepository<TeamMember>('teamMember');
    }

    async create(data: Partial<TeamMember>) {
        try {
            return await this.genericRepository.create(data);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async findById(teamMemberId: number) {
        try {
            return await this.genericRepository.findById(teamMemberId);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async update(teamMemberId: number, data: Partial<TeamMember>) {
        try {
            return await this.genericRepository.update(teamMemberId, data);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async delete(teamMemberId: number) {
        try {
            return await this.genericRepository.delete(teamMemberId);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async findMany() {
        try {
            return await this.genericRepository.findMany()
        } catch (error) {
            throw errorHandler(error);
        }
    }

}
