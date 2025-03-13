import express from 'express';      //import express
import dotenv from 'dotenv';      //import dotenv
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';
import customerRouter from './routes/customerRoutes';
import itemRouter from './routes/itemRoutes';
import orderRouter from './routes/orderRoutes';


const app = express();//create express app

dotenv.config();
app.use(express.json());


app.get("/", (req, res) => {
    res.status(201).send("server is running");
});



app.use("/users", userRouter)
app.use("/customers", customerRouter)
app.use("/items", itemRouter)
app.use("/orders", orderRouter)



// @ts-ignore
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("database is connected"))
    .catch((err) => console.log("mongodb connection error", err));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server is running on port", PORT);
})