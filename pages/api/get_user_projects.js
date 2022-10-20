import { db } from "../../firebase"
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const req_payload = req.query

    let projects = await fetchDatabaseProjects(req_payload.user)
    
    projects.forEach((project) => {
      // TODO fetch blockchain data (current balance)
      project.currentBalance = mockCurrentBalance(project)
      project.fundingGoalProgress = mockfundingGoalProgress(project)
      project.remainingDays = mockRemainingDays(project)
      project.donationsAmount = mockDonationsAmount()
    })

    res.status(200).json({ projects })
  } catch (error){
    console.log(error)
    res.status(500).json({ error: "Failed to fetch projects" })
  }
}

const fetchDatabaseProjects = async (user) => {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, where("user", "==", user));
  const querySnapshot = await getDocs(q);

  let projects = []
  querySnapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data() })
  });

  return projects
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

const mockDonationsAmount = () => {
  return parseInt(randomNumber(5,38))
}

