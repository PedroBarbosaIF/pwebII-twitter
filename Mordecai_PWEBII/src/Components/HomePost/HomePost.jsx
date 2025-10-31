import './style.css'

export default function HomePost(props) {
    return (
        <div
            className="post max-w-sm bg-white rounded-lg shadow-md p-6"
            id={props.htmlId ? "individual" : undefined}
            onClick={props.onClick ? () => props.onClick(props.id) : undefined}
        >
            <div className="text-xl font-bold mb-2">{props.title}</div>
            <div className="text-gray-600">{props.text}</div>
        </div>
    );
}