import { db } from "../../firebase"
import { getDoc, doc } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const req_payload = req.query

    let project = await fetchDatabaseProject(req_payload.id)

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
