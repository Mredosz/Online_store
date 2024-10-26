import { FieldArray, Form, Formik } from "formik";
import Input from "./Input.jsx";

export default function FormAdmin({
  validation,
  initialValues,
  onSubmit,
  text,
  isSuccess,
  isSuccessText,
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
            <Input label="name" id="name" type="text" />
            <Input label="price" id="price" type="number" />
            <Input label="short description" id="shortDescription" textarea />
            <Input
              label="available quantity"
              id="availableQuantity"
              type="number"
            />
            <Input label="delivery price" id="deliveryPrice" type="number" />
            <Input label="image" id="image" type="text" />
            <FieldArray name={"specifications"}>
              {({ push, remove }) => (
                <div className="mt-2">
                  <h4 className="text-2xl font-semibold text-center">
                    Specification
                  </h4>
                  {values.specifications.map((specification, index) => (
                    <div key={index} className="mt-5">
                      <div className="flex">
                        <Input
                          id={`specifications[${index}].key`}
                          label="key"
                          type="text"
                          className="mr-3"
                        />
                        <Input
                          id={`specifications[${index}].value`}
                          label="value"
                          type="text"
                        />
                      </div>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-600 mt-2 py-1 rounded-md w-full"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-yellow-500 hover:bg-yellow-600 mt-2 py-1 rounded-md w-full"
                    onClick={() => push({ key: "", value: "" })}
                  >
                    Add
                  </button>
                </div>
              )}
            </FieldArray>
            <button
              type="submit"
              className="w-full mt-5 py-2 bg-green-400 hover:bg-green-600 rounded-md"
            >
              Add product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
