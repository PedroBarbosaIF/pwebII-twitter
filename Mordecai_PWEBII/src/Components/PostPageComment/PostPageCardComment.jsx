import './style.css'

export default function PostPageCardComment(props) {
    return (
        <div
            className="post max-w-sm bg-white rounded-lg shadow-md p-6 flex items-start justify-between gap-2"
            id={props.htmlId ? "individual" : undefined}
        >
            <div className=" flex-1">
                <div className="text-gray-600 texto">{props.text}</div>
            </div>
            <button
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={(e) => {
                    e.stopPropagation();
                    if (props.onRemove) props.onRemove(props.id);
                }}
                title="Remover comentário"
            >
                Remover
            </button>
        </div>
    );
}
