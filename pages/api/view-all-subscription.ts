// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import viewAllSubscription from "../../request/viewAllSubscription";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      try {
        viewAllSubscription(res);
      } catch (error) {
        res.status(400).json({ status: `error occurred, ${error}` });
      }
    }
  }
}
