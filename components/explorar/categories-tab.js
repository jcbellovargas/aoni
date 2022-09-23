import CategoriesItem from "./categories-item";
export default function CategoriesTab(props){

  return(
    <>
      <div className="tabs tabs-boxed justify-center bg-base-100 py-10">
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Salud"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Tecnologia"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Moda"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Negocios"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Juegos"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Arte"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Emergencia"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Comida"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Redes Sociales"></CategoriesItem>
      </div>
    </>
  )
}