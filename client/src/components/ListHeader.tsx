interface ListHeaderInterface{
    addItemToList: Function,
    title: string,
    setTitle: Function
}

function ListHeader(props: ListHeaderInterface){
    return(
        <div className="flex items-center gap-10 p-8">
            <form className="w-full group relative" onSubmit={(e) => {e.preventDefault()}}>
                <input
                    value={props.title}
                    onChange={(e) => props.setTitle(e.target.value)}
                    className="focus:ring-2 focus:ring-blue-500
                        focus:outline-none w-full text-sm leading-6
                        text-gray-900 placeholder-gray-400
                        rounded-md py-2 px-4 ring-1 ring-gray-200 shadow-sm"
                    type="text"
                    aria-label="Add to list"
                    placeholder="Add to list"
                />
            </form>
            <button
                onClick={() => props.addItemToList()}
                type="button"
                className="whitespace-nowrap bg-indigo-500 text-white text-sm leading-6 font-medium py-2 px-4 ml-2 rounded-lg"
            >
                + Add
            </button>
        </div>
    )
}


export default ListHeader