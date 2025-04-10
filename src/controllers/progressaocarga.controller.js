import { z } from "zod";

const ProgressaoCargaSchema = z.object({
    user_id: z.number().int().min(1, { message: "ID do usuário inválido" }),
    treino_id: z.number().int().min(1, { message: "ID do treino inválido" }),
    carga: z.number().min(0, { message: "Carga deve ser um número positivo" }),
    data: z.string().datetime({ message: "Data inválida (formato ISO esperado)" }),
});
const ProgressaoCargaController = {
    async createProgressao(req, res) {
        try {
            const payload = req.body;
            ProgressaoCargaSchema.parse(payload);
            return res.status(201).json({ message: 'Progressão de carga registrada com sucesso', data: payload });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async updateProgressao(req, res) {
        const { id } = req.params;
        try {
            const payload = req.body;
            const PartialSchema = ProgressaoCargaSchema.partial();
            PartialSchema.parse(payload);
            return res.status(200).json({ message: 'Progressão de carga atualizada com sucesso', data: { id, ...payload } });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async deleteProgressao(req, res) {
        try {
            const { id } = req.params;
            return res.status(200).json({ message: 'Progressão de carga deletada com sucesso', data: { id } });
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
};

export default ProgressaoCargaController;
