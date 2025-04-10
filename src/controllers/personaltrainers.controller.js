import { z } from "zod";

const PersonalTrainerSchema = z.object({
    user_id: z.number().int().min(1, { message: "ID do usuário inválido" }),
    especialidade: z.string().min(1, { message: "Especialidade é obrigatória" }),
    anos_experiencia: z.number().int().min(0, { message: "Anos de experiência inválido" }),
    certificacao: z.string().min(1, { message: "Certificação é obrigatória" }),
    disponibilidade: z.string().min(1, { message: "Disponibilidade é obrigatória" }),
    bio: z.string().optional(),
    foto_avatar: z.string().url({ message: "Foto do avatar deve ser uma URL válida" }).optional(),
    rating: z.number().min(0).max(5).optional(),
});

const PersonalTrainerController = {
    async createTrainer(req, res) {
        try {
            const payload = req.body;
            PersonalTrainerSchema.parse(payload);
            return res.status(201).json({ message: 'Personal trainer cadastrado com sucesso', data: payload });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async updateTrainer(req, res) {
        const { id } = req.params;
        try {
            const payload = req.body;
            const PartialSchema = PersonalTrainerSchema.partial();
            PartialSchema.parse(payload);
            return res.status(200).json({ message: 'Personal trainer atualizado com sucesso', data: { id, ...payload } });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async deleteTrainer(req, res) {
        try {
            const { id } = req.params;
            return res.status(200).json({ message: 'Personal trainer removido com sucesso', data: { id } });
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
};

export default PersonalTrainerController;
