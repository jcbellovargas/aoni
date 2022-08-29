export default function ProfileButtonItem(props){
    return (
        <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
        <span className="flex flex-col">
            <span>
                {props.name}
            </span>
        </span>
    </a>
    )
}