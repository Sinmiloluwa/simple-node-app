"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const user_route_1 = __importDefault(require("./users/user.route"));
const spotify_route_1 = __importDefault(require("./spotify/spotify.route"));
const todo_route_1 = __importDefault(require("./todo/todo.route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(auth_route_1.default);
app.use('/api/user', user_route_1.default);
app.use('/api/spotify', spotify_route_1.default);
app.use('/api/todo', todo_route_1.default);
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});
