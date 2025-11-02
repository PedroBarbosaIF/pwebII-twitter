export default function PostPageCardComment(props) {
    return (
        <div
            className="post max-w-sm bg-white rounded-lg shadow-md p-6"
            id={props.htmlId ? "individual" : undefined}
        >
            <div className="text-gray-600">{props.text}</div>
        </div>
    )
}