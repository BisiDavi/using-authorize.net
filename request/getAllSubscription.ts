import axios from "axios";

export default async function getAllSubscription() {
  return await axios.get("/api/view-all-subscription");
}
