import { useEffect, useState } from "react";
import CategoriesTab from "../components/explorar/categories-tab";
import ProjectCard from "../components/explorar/project-card";
import { getData } from "/utils/fetch-utils"

export default function Explorar(){
  const [selectedTag, setSelectedTag] = useState("Negocios");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const get_projects_by_tag = async () => {
      try {
        const response = await getData('/api/get_tag_projects', {
          tag: selectedTag
        })
        if (response.error){
          console.log(error);
        }
        setProjects(response.projects)
      } catch(error) {
        console.log(error);
      }
    }
    get_projects_by_tag()
  },[selectedTag])

  return(
    <>
      <CategoriesTab selectedTag={selectedTag} setSelectedTag={setSelectedTag}></CategoriesTab>
      <div className="grid grid-cols-3 mx-20 px-20 my-10 gap-y-20 place-items-center">
        {projects.map((project) => {
          return (<ProjectCard key={project} project={project}/>)
        })}
      </div>
    </>
  )
}