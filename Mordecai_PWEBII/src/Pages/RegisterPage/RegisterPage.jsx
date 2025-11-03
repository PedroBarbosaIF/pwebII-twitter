import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../Components/Navbar/Navbar";

export default function RegisterPage() {
    const navigate = useNavigate();

    const schema = Yup.object({
        username: Yup.string()
            .min(3, "Mínimo 3 caracteres")
            .required("Obrigatório"),
        password: Yup.string()
            .min(6, "Mínimo 6 caracteres")
            .required("Obrigatório"),
    });

    return (
        <>
        <Navbar />
        <div className="flex flex-row justify-center my-30">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center">
                    Criar conta
                </h1>

                <Formik
                    initialValues={{ username: "", password: "" }}
                    validationSchema={schema}
                    onSubmit={async (userRegistry) => {
                        try {
                            await api.post("/users", userRegistry);
                            // redireciona para a home após registro
                            navigate("/");
                        } catch (err) {
                            alert("Erro ao criar usuário");
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form
                            className="flex flex-col gap-3"
                            autocomplete="off"
                        >
                            <div>
                                <label className="text-sm font-medium">
                                    Usuário
                                </label>
                                <Field
                                    name="username"
                                    placeholder="Nome de usuário"
                                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                                <ErrorMessage name="username">
                                    {(msg) => (
                                        <div className="text-sm text-red-600 mt-1">
                                            {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Senha
                                </label>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Senha"
                                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    autocomplete="off"
                                />
                                <ErrorMessage name="password">
                                    {(msg) => (
                                        <div className="text-sm text-red-600 mt-1">
                                            {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>

                            <button
                                type="submit"
                                className="mt-2 bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700 disabled:opacity-60"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Criando..." : "Criar conta"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
        </>
    );
}
