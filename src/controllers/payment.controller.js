import {z} from "zod";

const PaymentSchema = z.object({
    data: z.string().datetime({message: 'Data inválida'}),
    recibo: z.number({message: 'Recibo inválido'}).min(1, {message: 'Recibo inválido'}),
    valor: z.number({message: 'Valor inválido'}).min(0, {message: 'Valor inválido'}),
    observacao: z.string().optional(),
});

const PaymentController = {
    async createPayment(req, res) {
        try {
            const {data, recibo, valor, observacao} = req.body;
            PaymentSchema.parse({data, recibo, valor, observacao});
            return res.status(201).json({message:'Payment created', data: {data, recibo, valor, observacao}});
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({message: "Validation error", details: error.errors});
            }
            return res.status(500).json({message:'Internal server error'});
        }
    },
    
};

export default PaymentController;