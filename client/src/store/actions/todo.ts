export function addItem(title: string) {
    return async (dispatch: any) => {
        try {
            const addTodoItem: any = await fetch('http://localhost:3001/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                })
            });

            const body = await addTodoItem.json();

            if (addTodoItem.status !== 200) {
                return dispatch({ type: 'ADD_ITEM_ERROR', message: body.message });
            }

            return dispatch({ type: 'ADD_ITEM_SUCCESS', item: body.todo });
        } catch (error) {
            return dispatch({ type: 'ADD_ITEM_ERROR', message: 'Something went wrong.' });
        }
    };
}

export function removeItem(item_id: string) {
    return async (dispatch: any) => {
        try {
            const removeItem: any = await fetch('http://localhost:3001/todo/' + item_id, {
                method: 'DELETE'
            });

            const body = await removeItem.json();

            if (removeItem.status !== 200) {
                return dispatch({ type: 'REMOVE_ITEM_ERROR', message: body.message });
            }

            return dispatch({ type: 'REMOVE_ITEM_SUCCESS', item_id: item_id });
        } catch (error) {
            return dispatch({ type: 'REMOVE_ITEM_ERROR', message: 'Something went wrong.' });
        }
    };
}

export function markItemAsDone(item_id: string){
    return async (dispatch: any) => {
        try{
            const toggleItemDone = await fetch('http://localhost:3001/todo/' + item_id, {
                method: 'PUT'
            })

            const body = await toggleItemDone.json()

            if(toggleItemDone.status !== 200){
                return dispatch({
                    type: 'MARK_ITEM_DONE_ERROR',
                    message: body.message
                })
            }

            return dispatch({
                type: 'MARK_ITEM_DONE_SUCCESS',
                item_id: item_id
            })

        }catch(err){
            return dispatch({
                type: 'MARK_ITEM_DONE_ERROR',
                message: 'Somethin went wrong'
            })
        }
    }
}

export function getTodos(){
    return async (dispatch: any) => {
        try {
            const todoList = await fetch('http://localhost:3001/todos', {
                method: 'GET'
            })

            const body =  await todoList.json()

            if(todoList.status !== 200){
                return dispatch({type: 'GET_TODOS_ERROR', message: body.message})
            }

            return dispatch({type: 'GET_TODOS_SUCCESS', items: body.data})

        } catch (error) {
            return dispatch({type: 'GET_TODOS_ERROR', message:'You are in error please check database'})
        }
    }
}