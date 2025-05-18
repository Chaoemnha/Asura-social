import { NextFunction, RequestHandler } from "express";
import {validate, ValidationError} from 'class-validator';
import { plainToInstance } from "class-transformer";
import { logger } from '@core/utils';
import { HttpException } from "@core/exceptions";

const validatorMiddleware = (type: any, skipMissingProperties = false): RequestHandler => {
    return (req, res, next) => {
      validate(plainToInstance(type, req.body), { skipMissingProperties })
        .then((errors: ValidationError[]) => {
          if (errors.length > 0) {
            logger.error(errors);
            const messages = errors.map((error: ValidationError) => {
              return Object.values(error.constraints!);
            }).join(', ');
            next(new HttpException(400, messages));
          } else {
            next();
          }
        })
        .catch((err) => {
          next(err);
        });
    };
  };
  
export default validatorMiddleware;//Middleware nay duoc su dung trong dtos.route