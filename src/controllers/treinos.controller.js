import { z } from "zod";

const TreinoSchema = z.object({
    user_id: z.number().int().min(1, { message: "ID do usuário inválido" }),
    data: z.string().datetime({ message: "Data do treino inválida (formato ISO esperado)" }),
    exercicio: z.string().min(1, { message: "Nome do exercício é obrigatório" }),
    carga: z.number().min(0, { message: "Carga deve ser um valor positivo" }),
    repeticiones: z.number().int().min(1, { message: "Repetições devem ser no mínimo 1" }),
    series: z.number().int().min(1, { message: "Séries devem ser no mínimo 1" }),
    observacoes: z.string().optional(),
});
const TreinoController = {
    async createTreino(req, res) {
        try {
            const payload = req.body;
            TreinoSchema.parse(payload);
            return res.status(201).json({ message: 'Treino registrado com sucesso', data: payload });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async updateTreino(req, res) {
        const { id } = req.params;
        try {
            const payload = req.body;
            const PartialTreinoSchema = TreinoSchema.partial();
            PartialTreinoSchema.parse(payload);
            return res.status(200).json({ message: 'Treino atualizado com sucesso', data: { id, ...payload } });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async deleteTreino(req, res) {
        try {
            const { id } = req.params;
            return res.status(200).json({ message: 'Treino deletado com sucesso', data: { id } });
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
};

export default TreinoController;
