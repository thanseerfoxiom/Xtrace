import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { loginValidationSchema } from "../../utils/Validation";
import FormikField from "../../components/InputComponents"; // Adjust the import path as needed
import { Form, Button, Row } from "react-bootstrap";
import { useCustomMutation } from "../../services/useCustomMutation";
import { userloginapi } from "../../services/BaseUrls";
import { useNavigate } from "react-router-dom";
import { basePath } from "../../services/UrlPaths";
import { ContextDatas } from "../../services/Context";

function PageLogin() {
  const {user, setuser}=useContext(ContextDatas)
  const { mutation } = useCustomMutation();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (values, actions) => {
    mutation.mutate(
      {
        method: "post",
        url: userloginapi,
        values: { ...values },
        next: () => {
          actions.resetForm();
          actions.setSubmitting(false);
        },
        
      },
      {
        onSuccess: (data) => {
          // Access the response data here
          console.log("Response Data:", data);
          if(data.token){
            setuser(data.token)
            localStorage.setItem("token",data.token)
            navigate(basePath)
          }
          // actions.resetForm();
          // actions.setSubmitting(false);
        },
        onError: (error) => {
          actions.setSubmitting(false);
        },
      }
    );
  };

  return (
    <div>
      <main className="main-content" style={{ marginTop: "-20px" }}>
        <div className="admin">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-xxl-3 col-xl-4 col-md-6 col-sm-8">
                <div className="edit-profile">
                  <div className="edit-profile__logos">
                    <a href="/">
                      <img
                        className="dark"
                        src="/img/logo/logo1-01.png"
                        alt="logo"
                        width={40}
                      />
                      <img className="light" src="/img/logo/logo1-01.png" alt={"logo"} />
                    </a>
                  </div>
                  <div className="card border-0">
                    <div className="card-header ">
                      <div className="edit-profile__title">
                        <h6>Sign in to TAKHLEES</h6>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="edit-profile__body">
                        <Formik
                          initialValues={{
                            email: "",
                            password: "",
                            role: "super_admin",
                          }}
                          validationSchema={loginValidationSchema}
                          onSubmit={(values, actions) => {
                            handleSubmit(values, actions);
                          }}
                        >
                          {({
                            handleSubmit,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            values,
                            errors,
                            touched,
                          }) => (
                            <Form onSubmit={handleSubmit}>
                              <Row>
                                <FormikField
                                  name="email"
                                  label="Email Address"
                                  placeholder="name@example.com"
                                  type="text"
                                  colWidth={12}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.email}
                                  isInvalid={touched.email && errors.email}
                                  error={errors.email}
                                />
                              </Row>
                              <Row>
                                <Form.Group className="mb-3" controlId="password-field">
                                  <Form.Label>Password</Form.Label>
                                  <div className="position-relative">
                                    <Form.Control
                                      type={show ? "text" : "password"}
                                      name="password"
                                      placeholder="Password"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.password}
                                      isInvalid={touched.password && errors.password}
                                    />
                                    <div
                                      onClick={() => setShow(!show)}
                                      className={`${
                                        show ? "uil-eye-slash" : "uil-eye"
                                      } text-lighten fs-15 field-icon toggle-password2 cursor-true`}
                                    ></div>
                                    {touched.password && errors.password ? (
                                      <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                      </Form.Control.Feedback>
                                    ) : null}
                                  </div>
                                </Form.Group>
                              </Row>
                              <Row>
                                <div className="">
                                  <Button
                                    // variant="primary"
                                    type="submit"
                                    className="btn- w-100 btn-squared text-capitalize lh-normal px-50 signIn-createBtn btndefault"
                                    
                                    disabled={isSubmitting}
                                  >
                                    Sign in
                                  </Button>
                                </div>
                              </Row>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PageLogin;
