import { Formik, Form, Field } from "formik";

export default function CommentForm({ onSubmit }) {
    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
            <Formik
                initialValues={{ text: "" }}
                onSubmit={async (values, { resetForm, setSubmitting }) => {
                    await onSubmit(values.text);
                    resetForm();
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-5">
                        <h2 className="text-xl font-extrabold text-gray-800 mb-2 text-center tracking-tight">
                            Adicionar comentário
                        </h2>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="text"
                                className="text-sm font-semibold text-gray-700"
                            >
                                Comentário
                            </label>
                            <Field
                                as="textarea"
                                id="text"
                                name="text"
                                placeholder="Digite seu comentário..."
                                className="border border-gray-300 rounded-lg px-3 py-2 min-h-[70px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 mt-2 shadow hover:bg-blue-700 transition disabled:opacity-60 self-end"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Enviando..." : "Comentar"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
