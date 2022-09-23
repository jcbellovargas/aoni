import { useState } from "react";
import CategoriesTab from "../components/explorar/categories-tab";
import ProjectCard from "../components/explorar/project-card";

export default function Explorar(){
  const [selectedTag, setSelectedTag] = useState("Negocios");

  return(
    <>
      <CategoriesTab selectedTag={selectedTag} setSelectedTag={setSelectedTag}></CategoriesTab>
      <div className="grid grid-cols-3 mx-20 px-20 my-10 gap-y-20 place-items-center">
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
      </div>
    </>
  )
}