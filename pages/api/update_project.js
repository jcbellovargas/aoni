import { db } from "../../firebase"
import { doc, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const project = req.body
  const projectRef = doc(db, "projects", project.id)
  await setDoc(projectRef, { ...project }, { merge: true });
  res.status(200).json({ project })
}