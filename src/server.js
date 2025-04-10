import express from 'express';
const server = express();

// Importando todas as rotas
import routesUser from './routes/user.routes.js';
import routesPayment from './routes/payment.routes.js';
import routesMyProgression from './routes/myprogression.routes.js';
import routesTreinos from './routes/treinos.routes.js';
import routesProgressaoCarga from './routes/progressaocarga.routes.js';
import routesAvaliacoes from './routes/avaliacoes.routes.js';
import routesPersonalTrainer from './routes/personaltrainers.routes.js';
import routesAlimentos from './routes/alimentos.routes.js';
import routesAlimentosConsumidos from './routes/alimentosconsumidos.routes.js';

const PORT = process.env.PORT || 3000;

server.use(express.json());

// Registrando rotas com o prefixo /api
server.use("/api", routesUser);
server.use("/api", routesPayment);
server.use("/api", routesMyProgression);
server.use("/api", routesTreinos);
server.use("/api", routesProgressaoCarga);
server.use("/api", routesAvaliacoes);
server.use("/api", routesPersonalTrainer);
server.use("/api", routesAlimentos);
server.use("/api", routesAlimentosConsumidos);

server.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
