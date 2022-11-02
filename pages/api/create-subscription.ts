// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import createSubscription from "../../request/createSubscription";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data } = req.body;
  switch (req.method) {
    case "POST": {
      try {
        createSubscription(data ,res);
      } catch (error) {
        res.status(400).json({ status: `error occurred, ${error}` });
      }
    }
  }
}
