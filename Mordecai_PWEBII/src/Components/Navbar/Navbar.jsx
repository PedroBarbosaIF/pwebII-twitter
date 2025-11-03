import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="w-full bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <Link
                            to="/"
                            className="text-xl font-bold text-indigo-600"
                        >
                            Mordecai
                        </Link>
                    </div>

                    <nav className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Home
                        </Link>

                        <Link
                            to="/createpost"
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Criar post
                        </Link>

                        <Link
                            to="/register"
                            className="px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                        >
                            Registrar
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
