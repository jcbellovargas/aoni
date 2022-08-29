export default function Navitem(props) {
    return(
        <a className="text-l dark:text-white  hover:text-indigo-700 dark:hover:text-white px-3 py-2 rounded-md text-sl font-medium" href="/#">
            {props.name}
        </a>
    )
}