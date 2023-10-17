import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import JobApplyService from '@/service/jobApply';
import middleware from '../middleware';

const route = Router();

export default (app: Router) => {
  app.use('/job-apply', route);

  route.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');

      try {
        const result = await JobApplyService.getJobOpeningList();
        return res.status(200).json(result);
      } catch (e) {
        logger.error('error %o', e);
        return next(e);
      }
    }
  );

}