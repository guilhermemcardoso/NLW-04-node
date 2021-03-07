import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import createConnection from './database';
import { router } from './routes';
import { AppError } from './errors/AppError';


const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

createConnection();
const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NLW 04 - NPS Calculation API',
            description: 'This is a REST API application made with Express and Typescript to calculate a survey NPS.',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Guilherme Cardoso',
                url: 'https://www.gmcardoso.me',
            },
            version: '0.0.1',
        },
        basePath: '/v1',
        schemes: ['HTTP']
    },
    apis: ['./src/routes.ts']
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(router);
app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${error.message}`
    })
})

export { app };