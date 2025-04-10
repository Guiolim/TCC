import { z } from "zod";

const ProgressionSchema = z.object({
    data_progression: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Data da progressão inválida (formato esperado: YYYY-MM-DD)"
    }),
    peso: z.number().min(0, { message: "Peso deve ser um número positivo" }),
    percentual_gordura: z.number().min(0, { message: "Percentual de gordura inválido" }),
    observacoes: z.string().optional(),
    metas_alcancadas: z.string().optional(),
    foto_body: z.string().url({ message: "URL da foto inválida" }),
    imc_recente: z.number().min(0, { message: "IMC inválido" }),
});
const MyProgressionController = {
    async createProgression(req, res) {
        try {
            const payload = req.body;
            ProgressionSchema.parse(payload);
            return res.status(201).json({ message: 'Progressão registrada com sucesso', data: payload });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async updateProgression(req, res) {
        const { id } = req.params;
        try {
            const payload = req.body;
            const PartialProgressionSchema = ProgressionSchema.partial();
            PartialProgressionSchema.parse(payload);
            return res.status(200).json({ message: 'Progressão atualizada com sucesso', data: { id, ...payload } });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async deleteProgression(req, res) {
        try {
            const { id } = req.params;
            return res.status(200).json({ message: 'Progressão deletada com sucesso', data: { id } });
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
};

export default MyProgressionController;
