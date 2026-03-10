import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../../shared/config/swagger';
import { userRoutes } from './routes/userRoutes';
import { authRoutes } from './routes/authRoutes';
import { documentRoutes } from './routes/documentRoutes';
import { internRoutes } from './routes/internRoutes';
import { regionRoutes } from './routes/regionRoutes';
import { subprojectRoutes } from './routes/subprojectRoutes';
import { socialFacilitatorRoutes } from './routes/socialFacilitatorRoutes';
import { coordinatorRoutes } from './routes/coordinatorRoutes';
import { archiveRoutes } from './routes/archiveRoutes';
import { reportRoutes } from './routes/reportRoutes';
import { formatRoutes } from './routes/formatRoutes';
import { trainingRoutes } from './routes/trainingRoutes';
import { trainingProgressRoutes } from './routes/trainingProgressRoutes';
import { photoRoutes } from './routes/photoRoutes';
import { eventRoutes } from './routes/eventRoutes';
import { eventPhotoRoutes } from './routes/eventPhotoRoutes';
import { successStoryRoutes } from './routes/successStoryRoutes';
import { createRateLimitMiddleware } from './middlewares/rateLimitMiddleware';

dotenv.config();

const app = express();

const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const globalLimiter = createRateLimitMiddleware({
  windowMs: parseNumber(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
  maxRequests: parseNumber(process.env.RATE_LIMIT_MAX_REQUESTS, 120),
  message: 'Demasiadas peticiones. Intenta nuevamente en un momento.',
});

const authLimiter = createRateLimitMiddleware({
  windowMs: parseNumber(process.env.AUTH_RATE_LIMIT_WINDOW_MS, 60_000),
  maxRequests: parseNumber(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS, 8),
  message: 'Demasiados intentos de inicio de sesión. Intenta nuevamente en un momento.',
});

const corsOptions: cors.CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', globalLimiter);

// Swagger Documentation
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
//   customCss: '.swagger-ui .topbar { display: none }',
//   customSiteTitle: 'Portal API Documentation',
// }));

// Swagger JSON endpoint
// app.get('/api-docs.json', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(swaggerSpec);
// });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/interns', internRoutes);
app.use('/api/regions', regionRoutes);
app.use('/api/subprojects', subprojectRoutes);
app.use('/api/social-facilitators', socialFacilitatorRoutes);
app.use('/api/coordinators', coordinatorRoutes);
app.use('/api/archives', archiveRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/formats', formatRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/training-progress', trainingProgressRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/event-photos', eventPhotoRoutes);
app.use('/api/success-stories', successStoryRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

export { app };