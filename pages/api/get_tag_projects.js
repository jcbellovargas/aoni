import { db } from "../../firebase"
import { collection, query, where, getDocs } from "firebase/firestore";
import { mockCurrentBalance, mockfundingGoalProgress, mockRemainingDays, mockDonationsAmount } from "/utils/project-service";

export default async function handler(req, res) {
  try {
    const req_payload = req.query

    let projects = await fetchDatabaseProjects(req_payload.tag)
    
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

const fetchDatabaseProjects = async (tag) => {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, where('tags', 'array-contains-any', [tag]));
  const querySnapshot = await getDocs(q);
  let projects = []
  querySnapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data() })
  });
  console.log(projects)
  return projects
}

