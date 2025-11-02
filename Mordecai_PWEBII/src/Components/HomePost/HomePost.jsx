import "./style.css";

export default function HomePost(props) {
    return (
        <div
            className="post max-w-sm min-w-100 bg-white rounded-lg shadow-md p-6 flex items-start justify-between gap-2"
            id={props.htmlId ? "individual" : undefined}
        >
            <div
                className="flex-1 cursor-pointer"
                onClick={
                    props.onClick ? () => props.onClick(props.id) : undefined
                }
            >
                <div className="text-xl font-bold mb-2">{props.title}</div>
                <div className="text-gray-600">{props.text}</div>
            </div>
            <button
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    if (props.onRemove) props.onRemove(props.id);
                }}
                title="Remover post"
            >
                Remover
            </button>
        </div>
    );
}
