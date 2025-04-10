import { z } from "zod";

const AlimentoSchema = z.object({
    nome: z.string().min(1, { message: "Nome do alimento é obrigatório" }),
    categoria: z.string().min(1, { message: "Categoria é obrigatória" }),
    calorias: z.number().min(0, { message: "Calorias devem ser um número positivo" }),
    proteinas: z.number().min(0, { message: "Proteínas devem ser um número positivo" }),
    carboidratos: z.number().min(0, { message: "Carboidratos devem ser um número positivo" }),
    gorduras: z.number().min(0, { message: "Gorduras devem ser um número positivo" }),
    fibra: z.number().min(0, { message: "Fibra deve ser um número positivo" }).optional(),
    imagem: z.string().url({ message: "Imagem deve ser uma URL válida" }).optional(),
});
const AlimentoController = {
    async createAlimento(req, res) {
        try {
            const payload = req.body;
            AlimentoSchema.parse(payload);
            return res.status(201).json({ message: 'Alimento cadastrado com sucesso', data: payload });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async updateAlimento(req, res) {
        const { id } = req.params;
        try {
            const payload = req.body;
            const PartialSchema = AlimentoSchema.partial();
            PartialSchema.parse(payload);
            return res.status(200).json({ message: 'Alimento atualizado com sucesso', data: { id, ...payload } });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async deleteAlimento(req, res) {
        try {
            const { id } = req.params;
            return res.status(200).json({ message: 'Alimento removido com sucesso', data: { id } });
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
};

export default AlimentoController;
