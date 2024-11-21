import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button } from "react-bootstrap";

const DynamicForm = ({ fields, validationSchema, onSubmit }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field.initialValue || "";
    return acc;
  }, {});

  const handleImageUpload = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("productDetails", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        onSubmit(values);
      }}
    >
      {({ handleSubmit, setFieldValue }) => (
        <BootstrapForm onSubmit={handleSubmit}>
          {fields.map((field) => (
            <BootstrapForm.Group key={field.name} className="mb-3" controlId={field.controlId}>
              <BootstrapForm.Label>{field.label}</BootstrapForm.Label>
              {field.type === "image" ? (
                <div>
                  <input
                    name={field.name}
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageUpload(event, setFieldValue)}
                    className="form-control"
                  />
                  {imagePreview && (
                    <img
                      className="mt-1"
                      src={imagePreview}
                      alt="Product Preview"
                      style={{ width: "110px", height: "110px", cursor: "pointer" }}
                    />
                  )}
                </div>
              ) : (
                <Field
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="form-control"
                />
              )}
            </BootstrapForm.Group>
          ))}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </BootstrapForm>
      )}
    </Formik>
  );
};

export default DynamicForm;
