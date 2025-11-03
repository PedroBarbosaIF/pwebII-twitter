import './style.css';

export default function PostPageCard(props) {
    return (
        <>
            <div
                className="post max-w-sm bg-white rounded-lg shadow-md p-6"
                id={props.htmlId ? "individual" : undefined}
            >
                <div className="text-xl font-bold mb-2">{props.title}</div>
                <div className="text-gray-600">{props.text}</div>
                <div className="text-sm text-gray-500 mt-2">Por {props.username}</div>
            </div>
        </>
    );
}
