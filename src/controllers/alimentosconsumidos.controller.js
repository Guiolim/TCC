import { z } from "zod";

const AlimentoConsumidoSchema = z.object({
    user_id: z.number().int().min(1, { message: "ID do usuário é obrigatório" }),
    alimento_id: z.number().int().min(1, { message: "ID do alimento é obrigatório" }),
    data_consumo: z.string().date({ message: "Data de consumo inválida" }),
    quantidade_gramas: z.number().min(0.1, { message: "Quantidade deve ser maior que zero" }),
    refeicao: z.string().min(1, { message: "Refeição é obrigatória" }),
    observacoes: z.string().optional(),
});
const AlimentoConsumidoController = {
    async createRegistro(req, res) {
        try {
            const payload = req.body;
            AlimentoConsumidoSchema.parse(payload);
            return res.status(201).json({ message: 'Registro de alimento consumido criado com sucesso', data: payload });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async updateRegistro(req, res) {
        const { id } = req.params;
        try {
            const payload = req.body;
            const PartialSchema = AlimentoConsumidoSchema.partial();
            PartialSchema.parse(payload);
            return res.status(200).json({ message: 'Registro de alimento consumido atualizado', data: { id, ...payload } });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async deleteRegistro(req, res) {
        try {
            const { id } = req.params;
            return res.status(200).json({ message: 'Registro de alimento consumido removido', data: { id } });
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
};

export default AlimentoConsumidoController;
