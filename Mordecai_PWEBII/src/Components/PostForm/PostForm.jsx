import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function PostForm({ onPostCreated }) {

    const navigate = useNavigate()
    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
            <Formik
                initialValues={{ title: "", text: "" }}
                onSubmit={async (values, { resetForm, setSubmitting }) => {
                    try {
                        await api.post("/posts", values);
                        if (onPostCreated) {
                            onPostCreated();
                        }
                        resetForm();
                        navigate('/');
                    } catch (err) {
                        alert("Erro ao criar post");
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-5">
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-2 text-center tracking-tight">
                            Criar novo post
                        </h2>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="title"
                                className="text-sm font-semibold text-gray-700"
                            >
                                Título
                            </label>
                            <Field
                                id="title"
                                name="title"
                                placeholder="Digite o título do post"
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="text"
                                className="text-sm font-semibold text-gray-700"
                            >
                                Texto
                            </label>
                            <Field
                                as="textarea"
                                id="text"
                                name="text"
                                placeholder="Digite o conteúdo do post"
                                className="border border-gray-300 rounded-lg px-3 py-2 min-h-[90px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 mt-2 shadow hover:bg-blue-700 transition disabled:opacity-60"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Enviando..." : "Publicar"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
