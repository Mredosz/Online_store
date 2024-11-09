import { Form, Formik } from "formik";

export default function FormAdmin({
  validation,
  initialValues,
  onSubmit,
  text,
  isSuccess,
  isSuccessText,
  children,
  buttonText,
  isProduct,
}) {
  return (
    <div className="flex justify-center mt-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
      >
        {({ handleSubmit, values }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-form min-w-96 border border-formBorder p-4 rounded-md my-3"
          >
            <h1 className="flex justify-center text-3xl text-gray-500 mb-4 uppercase font-semibold">
              {text}
            </h1>
            {isSuccess && (
              <h2 className="text-center text-green-600 text-xl font-semibold">
                {isSuccessText}
              </h2>
            )}
            {isProduct ? children({ values }) : children}
            <button
              type="submit"
              className="w-full mt-5 py-2 bg-green-400 hover:bg-green-600 rounded-md"
            >
              {buttonText}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
