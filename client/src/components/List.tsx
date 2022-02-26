import { AnimatePresence } from "framer-motion"
import {Todo} from "../store/reducers/todo"
import ListItem from "./ListItem"

interface ListInterface{
    list: Todo[],
    removeItemFromList: Function
    toggleItemDone: Function
}

function List(props: ListInterface) {
    return(
        <ul className="p-8 pt-0 divide-y list-none max-h-96 overflow-y-auto">
            <AnimatePresence>
                {props.list.length > 1 && props.list.map((todo_item: Todo, el: Number) =>  
                    <ListItem 
                        key={todo_item._id}
                        item={todo_item}
                        removeItemFromList={props.removeItemFromList}
                        toggleItemDone={props.toggleItemDone}
                    />
                )}
            </AnimatePresence>
       
            {props.list.length < 1 && (
                <h1>Your todo is empty please add some new tasks</h1>
            ) }
        </ul>
    )
}

export default List