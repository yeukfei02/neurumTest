import { Request, Response } from 'express';

export const getMain = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    message: 'neurumTest api',
  });
};
