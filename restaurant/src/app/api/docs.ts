// pages/api/docs.ts
import { swaggerSpec } from '@/lib/swagger';
import { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(swaggerSpec);
}
