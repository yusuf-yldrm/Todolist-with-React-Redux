export interface Todo {
    _id: string,
    title: string,
    is_done: boolean
}

export interface TodoReducerInterface{
    todo_list: Todo[]
    error: ''
}

const INITIAL_STATE: TodoReducerInterface = {
    todo_list: [],
    error: ''
}

const todoReducer = (state = INITIAL_STATE, action: any) => {
    switch(action.type){
        case 'ADD_ITEM_SUCCESS':
            return{
                ...state,
                todo_list: [
                    ...state.todo_list,
                    action.item
                ],
            }
        case 'ADD_ITEM_ERROR':
            return{
                ...state,
                error: action.message
            }
        case "REMOVE_ITEM_SUCCESS":
            const removeItemIndex = state.todo_list.findIndex(
                (item: any) => item._id === action.item_id
            );

            if (removeItemIndex < 0) {
                return state;
            }

            return {
                ...state,
                todo_list: [
                    ...state.todo_list.slice(0, removeItemIndex),
                    ...state.todo_list.slice(removeItemIndex + 1),
                ],
            }
        case "REMOVE_ITEM_ERROR":
            return {
                ...state,
                error: action.message,
            }
        case 'MARK_ITEM_DONE_SUCCESS':
            const doneItemIndex = state.todo_list.findIndex(
                (item: any) => item._id === action.item_id
            )

            if(doneItemIndex < 0 ){
                return state
            }
            
            return {
                ...state,
                todo_list: [
                    ...state.todo_list.slice(0, doneItemIndex),
                    {
                        ...state.todo_list[doneItemIndex],
                        is_done: !state.todo_list[doneItemIndex].is_done
                    },
                    ...state.todo_list.slice(doneItemIndex + 1),
                ]
            }
        case 'MARK_ITEM_DONE_ERROR':
            return {
                ...state,
                error: action.message
            }
        case 'GET_TODOS_ERROR':
            return {
                ...state, 
                todo_list: [],
                error: action.message
            }
        case 'GET_TODOS_SUCCESS':
            return {
                ...state,
                todo_list: action.items,
                error: ''
            }
        default: 
            return state        
    }
}

export default todoReducer