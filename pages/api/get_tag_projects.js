import { db } from "../../firebase"
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const req_payload = req.query

    let projects = await fetchDatabaseProjects(req_payload.tag)

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

