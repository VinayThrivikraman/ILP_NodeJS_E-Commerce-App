import sequelize from './config/sequelize-config';
import EcSuppliers from './models/ec_suppliers';
import express, {Express, Request, Response, response} from 'express';
import indexRoutes from "./routes/index"
import supplierRoutes from "./routes/supplierRoutes"

const app:Express = express();

app.use(express.json());
app.use(indexRoutes);
app.use('/api/v1', supplierRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on PORT:",PORT);
});

sequelize.sync({ force: false })
    .then( () => {
        console.log("Database Synced");
    })
    .catch((error:any) => {
        console.error("Error Syncing Database:", error);
    })