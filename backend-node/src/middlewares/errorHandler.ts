import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack); // Log the error stack
  res.status(500).json({
    message: err.message || "Internal server error",
  });
};

export default errorHandler;
