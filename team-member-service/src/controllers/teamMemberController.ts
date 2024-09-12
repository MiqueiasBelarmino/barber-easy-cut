import { Request, Response } from 'express';
import TeamMemberService from '../services/teamMemberService';

export default class TeamMemberController {
    private teamMemberService: TeamMemberService;

    constructor() {
        this.teamMemberService = new TeamMemberService();
    }

    async create(req: Request, res: Response) {
        try {
            const teamMember = await this.teamMemberService.createTeamMember(req.body);
            res.status(201).json(teamMember);
        } catch (error) {
            res.status(500).json({ error: (error as any).message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.body;
            if (!id) {
                res.status(400).json({ message: 'Must provide valid id' });
            }
            const teamMember = await this.teamMemberService.updateTeamMember(id, req.body);
            res.status(201).json(teamMember);
        } catch (error) {
            res.status(500).json({ error: (error as any).message });
        }
    }



    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const service = await this.teamMemberService.getTeamMemberById(Number(req.params.id));
            if (!service) {
                res.status(404).json({ message: 'Team member not found' });
            } else {
                res.status(200).json(service);
            }
        } catch (error) {
            res.status(400).json({ error: (error as any).message });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.teamMemberService.deleteTeamMember(Number(req.params.id));
            res.status(200).json({ message: 'Team member deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: (error as any).message });
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const services = await this.teamMemberService.getAllTeamMembers();
            res.status(200).json(services);
        } catch (error) {
            res.status(400).json({ error: (error as any).message });
        }
    }

}
