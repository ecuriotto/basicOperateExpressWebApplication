const express = require('express');
const routeRoutes = require('./routes/routeRoutes');
import { NextFunction, Request, Response, Router } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
//import helmet from 'helmet';
import path from 'path';

// Create Express app instance
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.json());
app.use(cors());

//app.use(helmet());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to set the Content-Type header to application/javascript for .js files
app.use((req: Request, res: Response, next: NextFunction) => {
  const ext = path.extname(req.path);
  if (ext === '.js') {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(routeRoutes);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
