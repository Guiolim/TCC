import { z } from "zod";

const AvaliacaoSchema = z.object({
    user_id: z.number().int().min(1, { message: "ID do aluno inválido" }),
    trainer_id: z.number().int().min(1, { message: "ID do personal trainer inválido" }),
    data: z.string().datetime({ message: "Data inválida (formato ISO esperado)" }),
    tipo: z.string().min(1, { message: "Tipo de avaliação é obrigatório" }),
    nota: z.number().int().min(1, { message: "Nota mínima é 1" }).max(5, { message: "Nota máxima é 5" }).optional(),
    comentarios: z.string().optional(),
    peso: z.number().min(0, { message: "Peso inválido" }).optional(),
    percentual_gordura: z.number().min(0, { message: "Percentual de gordura inválido" }).optional(),
    imc: z.number().min(0, { message: "IMC inválido" }).optional(),
    treino_id: z.number().int().min(1, { message: "ID do treino inválido" }).optional(),
    observacoes_trainer: z.string().optional(),
});
const AvaliacaoController = {
    async createAvaliacao(req, res) {
        try {
            const payload = req.body;
            AvaliacaoSchema.parse(payload);
            return res.status(201).json({ message: 'Avaliação criada com sucesso', data: payload });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async updateAvaliacao(req, res) {
        const { id } = req.params;
        try {
            const payload = req.body;
            const PartialAvaliacaoSchema = AvaliacaoSchema.partial();
            PartialAvaliacaoSchema.parse(payload);
            return res.status(200).json({ message: 'Avaliação atualizada com sucesso', data: { id, ...payload } });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async deleteAvaliacao(req, res) {
        try {
            const { id } = req.params;
            return res.status(200).json({ message: 'Avaliação deletada com sucesso', data: { id } });
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
};

export default AvaliacaoController;
