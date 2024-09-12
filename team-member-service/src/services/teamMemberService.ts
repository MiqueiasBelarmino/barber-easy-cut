import TeamMemberRepository from '../repositories/teamMemberRepository';
import { TeamMember } from '../models/teamMember';
import errorHandler from '../helpers/errorHandler';

export default class TeamMemberService {
    private teamMemberRepository: TeamMemberRepository;

    constructor() {
        this.teamMemberRepository = new TeamMemberRepository();
    }

    async createTeamMember(data: Partial<TeamMember>): Promise<TeamMember> {
        try {
            return await this.teamMemberRepository.create(data);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getTeamMemberById(id: number): Promise<TeamMember | null> {
        try {
            return await this.teamMemberRepository.findById(id);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async updateTeamMember(id: number, data: Partial<TeamMember>): Promise<TeamMember> {
        try {
            return await this.teamMemberRepository.update(id, data);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async deleteTeamMember(id: number): Promise<TeamMember> {
        try {
            return await this.teamMemberRepository.delete(id);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getAllTeamMembers(): Promise<TeamMember[]> {
        try {
            return await this.teamMemberRepository.findMany();
        } catch (error) {
            throw errorHandler(error);
        }
    }
}
