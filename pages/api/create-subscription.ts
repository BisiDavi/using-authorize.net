// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import createSubscription from "../../request/createSubscription";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.body) {
    case "POST": {
      createSubscription()
    }
  }
}
