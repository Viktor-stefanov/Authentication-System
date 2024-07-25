import { ZodError } from "zod";
export const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (e) {
        if (e instanceof ZodError)
            return res.status(400).json(e.errors);
        next(e);
    }
};
