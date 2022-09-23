export default function CategoriesItem(props) {

  const handleTagClick = () => {
    props.setSelectedTag(props.tag)
  }

  return(
    <>
      <a onClick={handleTagClick} className={props.tag == props.selectedTag ? "tab tab-lg tab-active" : "tab tab-lg"}>{props.tag}</a>
    </>
  )
}