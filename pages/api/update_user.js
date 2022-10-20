// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../firebase"
import { doc, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const user = req.body
  const userRef = doc(db, "users", user.id)
  await setDoc(userRef, { ...user }, { merge: true });
  res.status(200).json({ user })
}
