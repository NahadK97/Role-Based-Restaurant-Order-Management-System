//importing libraries
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/order.js";
import tableRoutes from "./routes/table.js";
//express app
const app = express();
const port = 4000;
//middlewares
app.use(cors())
app.use(express.json())
app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})
//routes
app.use('/api/:id/orders',orderRoutes);
app.use('/api/:id/tables',tableRoutes);
app.use('/api/:id/menu',menuRoutes);
//connecting to db
mongoose.connect('mongodb+srv://basithcp7816:getmongo@cluster0.7o6zeif.mongodb.net/restaurantDB?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        app.listen(4000,() => {
            console.log(`listening to port ${port}`);
        })
    })
    .catch(err => {
        console.log(err);
    })
