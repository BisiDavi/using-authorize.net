// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const ApiContracts = require("authorizenet").APIContracts;
const ApiControllers = require("authorizenet").APIControllers;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  res.status(200).json({ name: "John Doe" });
}
