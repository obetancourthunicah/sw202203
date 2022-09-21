import { Request, Response, NextFunction } from "express";
const expressNotFound = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: "Not Found" });
}
export default expressNotFound;
