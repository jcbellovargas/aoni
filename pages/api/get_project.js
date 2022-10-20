import { db } from "../../firebase"
import { collection, query, where, getDoc, doc } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const req_payload = req.query

    let project = await fetchDatabaseProject(req_payload.id)
    

    project.currentBalance = mockCurrentBalance(project)
    project.fundingGoalProgress = mockfundingGoalProgress(project)
    project.remainingDays = mockRemainingDays(project)

    res.status(200).json({ project })
  } catch (error){
    console.log(error)
    res.status(500).json({ error: "Failed to fetch project" })
  }
}

const fetchDatabaseProject = async (id) => {
  const projectRef = doc(db, "projects", id);
  const projectSnap = await getDoc(projectRef);

  let project = {};
  if (projectSnap.exists()) {
    console.log("Document data:", projectSnap.data());
    project = {id: projectSnap.id, ...projectSnap.data()}
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  return project;
}

/////////////////// MOCK FUNCTIONS
const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
}

const mockCurrentBalance = (project) => {
  const amount = parseInt(project.fundingGoal.amount * randomNumber(0.1, 0.9))
  return { token: "USDT", amount: amount }
}

const mockfundingGoalProgress = (project) => {
  return parseInt((project.currentBalance.amount / project.fundingGoal.amount) * 100)
}

const mockRemainingDays = (project) => {
  const now = new Date()
  const deadline = new Date(project.deadline)
  const timeRemaining = deadline.getTime() - now.getTime();
  const daysRemaining = timeRemaining / (1000 * 3600 * 24);
  return parseInt(daysRemaining)

}

