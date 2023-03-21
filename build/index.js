"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const routeRoutes = require('./routes/routeRoutes');
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
//import helmet from 'helmet';
const path_1 = __importDefault(require("path"));
// Create Express app instance
const app = express();
app.use(express.static(path_1.default.join(__dirname, 'public')));
// Middleware
app.use(bodyParser.json());
app.use((0, cors_1.default)());
//app.use(helmet());
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
// Middleware to set the Content-Type header to application/javascript for .js files
app.use((req, res, next) => {
    const ext = path_1.default.extname(req.path);
    if (ext === '.js') {
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});
app.use(express.static(path_1.default.join(__dirname, 'public')));
app.use(routeRoutes);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
