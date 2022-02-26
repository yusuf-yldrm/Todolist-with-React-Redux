import { motion } from "framer-motion";
import { Todo } from "../store/reducers/todo";

interface ListItemInterFace{
    item: Todo
    removeItemFromList: Function
    toggleItemDone: Function
}

function ListItem(props: ListItemInterFace){
    return(
        <motion.li 
            className="flex items-center p-2 opacity-0 -translate-y-1/2"
            animate={{opacity: 1, y: '0'}}
            exit={{opacity: 0}}
            transition= {{duration: 0.5}}

        >
            <input 
                type="checkbox" 
                checked={props.item.is_done}
                onChange={() => props.toggleItemDone(props.item._id) }
                className="h-4 w-4 mr-2 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
            />
            <p className={"w-full " + (props.item.is_done ? 'line-through' : '')}>
                {props.item.title}
            </p>
            <button 
                onClick={() => {
                    props.removeItemFromList(props.item._id)
                }}
                type="button" 
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                Remove
            </button>
        </motion.li>
    )
} 

export default ListItem