const UserSchema = z.object({
    nome: z.string().min(1, { message: "Nome é obrigatório" }),
    sobrenome: z.string().min(1, { message: "Sobrenome é obrigatório" }),
    email: z.string().email({ message: "E-mail inválido" }),
    senha: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    data_criacao: z.string().datetime({ message: "Data de criação inválida" }),
    data_ultima_atualizacao: z.string().datetime({ message: "Data de atualização inválida" }),
    estado: z.boolean({ message: "Estado deve ser verdadeiro ou falso" }),
    papel: z.enum(["profissional da área", "aluno"], {
        errorMap: () => ({ message: "Papel deve ser 'profissional da área' ou 'aluno'" }),
    }),
    data_nascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Data de nascimento inválida (YYYY-MM-DD)" }),
    genero: z.string().min(1, { message: "Gênero é obrigatório" }),
    telefone: z.string().min(1, { message: "Telefone é obrigatório" }),
    endereco: z.string().min(1, { message: "Endereço é obrigatório" }),
    avatar: z.string().url({ message: "Avatar deve ser uma URL válida" }),
    ultima_ip_login: z.string().min(1, { message: "IP de login inválido" }),
    tentativas_falhas_login: z.number().int().min(0, { message: "Tentativas de login deve ser um número positivo" }),
});

const UserController = {
    async createUser(req, res) {
        try {
            const payload = req.body;
            UserSchema.parse(payload);
            return res.status(201).json({ message: 'Usuário criado com sucesso', data: payload });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async updateUser(req, res) {
        const { id } = req.params;
        try {
            const payload = req.body;
            // Permitir atualização parcial dos campos
            const PartialUserSchema = UserSchema.partial();
            PartialUserSchema.parse(payload);
            return res.status(200).json({ message: 'Usuário atualizado com sucesso', data: { id, ...payload } });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", details: error.errors });
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            return res.status(200).json({ message: 'Usuário deletado com sucesso', data: { id } });
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
};

export default UserController;
