import { db } from "../../firebase"
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const project = req.body

  const docRef = await addDoc(collection(db, "projects"), {
    name: project.name,
    description: project.description,
    fundingGoal: project.fundingGoal,
    tags: project.tags,
    wallet: project.wallet,
    deadline: project.deadline,
    image: project.image,
    createdAt: new Date(),
    status: "ACTIVE"
  });
  console.log("Document written with ID: ", docRef.id);

  res.status(200).json({ docRef })
}