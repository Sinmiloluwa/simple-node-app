import express from 'express';
import cors from 'cors';
import authRoutes from './auth/auth.route';
import userRoutes from './users/user.route';
import spotifyRoutes from './spotify/spotify.route';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

app.use(authRoutes);
app.use('/api', userRoutes);
app.use('/api', spotifyRoutes);

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});