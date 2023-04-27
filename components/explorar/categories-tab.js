import CategoriesItem from "./categories-item";
export default function CategoriesTab(props){

  return(
    <>
      <div className="tabs tabs-boxed justify-center bg-base-100 py-10">
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Health"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Technology"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Fashion"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Business"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Games"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Art"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Emergency"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Food"></CategoriesItem>
        <CategoriesItem setSelectedTag={props.setSelectedTag} selectedTag={props.selectedTag} tag="Social Networks"></CategoriesItem>
      </div>
    </>
  )
}