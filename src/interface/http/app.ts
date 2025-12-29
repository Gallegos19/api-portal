import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
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
import { photoRoutes } from './routes/photoRoutes';
import { eventRoutes } from './routes/eventRoutes';
import { eventPhotoRoutes } from './routes/eventPhotoRoutes';
import { successStoryRoutes } from './routes/successStoryRoutes';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Portal API Documentation',
}));

// Swagger JSON endpoint
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
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