import express from 'express';
import authRoutes from './auth/auth.route';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});