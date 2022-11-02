import Joi from 'joi';

export const templateSchema = Joi.object({
    http: Joi.object().keys({
        port: Joi.number()
            .integer().required()
    }),

    serviceEndpoints: Joi.object().pattern(Joi.string(), Joi.object({
        path: Joi.string().required(),
        protocol: Joi.string().required(),
        host: Joi.string().required(),
        changeOrigin: Joi.bool().required(),
        port: Joi.number()
    })).required(),

    policies: Joi.array().required(),
});