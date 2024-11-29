import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { useField,useFormikContext } from 'formik';

// Custom Formik Field Component with dynamic column width
const FormikField = ({ label, name, type , placeholder, colWidth = 12 , disabled = false }) => {
  const [field, meta] = useField(name); // Hooks into Formik's context
  const { setFieldValue } = useFormikContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file) {
      setFieldValue(name, file); // Update Formik's field value
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Update preview once file is read
      };
      reader.readAsDataURL(file); // Read the file
    }
  };
  return (
    <Col md={colWidth}>     
      <Form.Group className="mb-3" controlId={`form${name}`}>      
        <Form.Label>{label}</Form.Label>
        {type==="file"?
        <div>
        <img
          className="mt-1"
          src="/public/img/pdfimg.png"
          alt="PDF Icon"
          style={{
            width: "110px",
            height: "110px",
            cursor: "pointer"
          }}
        />
      </div>
        :type ==="textarea"?(
          <Form.Control
          as="textarea"
          rows={3} // You can customize the rows count
          placeholder={placeholder}
          {...field} // Spread Formik's field props
          disabled={disabled}
        />
        ):(
        <Form.Control
        type={type}
        placeholder={placeholder}
        {...field} // Spread Formik's field props
        disabled={disabled}
      />)
    }
        
        {meta.touched && meta.error ? (
          <div className="text-danger small" >{meta.error}</div>
        ) : null}
      </Form.Group> 
    </Col>
  );
};
export default FormikField;
