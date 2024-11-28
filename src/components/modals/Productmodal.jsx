import React from 'react'

export default function Productmodal() {
  return (
    <div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
              <Formik
      initialValues={{
        jobId: selectData?.jobId||"",
        name: selectData?.name||"",
        contact: selectData?.contact||"",
        from: selectData?.from||"",
        to: selectData?.to||"",
        distance: selectData?.distance||"",
        quotePrice: selectData?.quotePrice||"",
        date: selectData?.data||"",
        productDetails: selectData?.productDetails||"",
      }}
      validate={values => {
        const errors = {};
        // if (!values.jobId) errors.jobId = 'Required';
        if (!values.name) errors.name = 'Name Required';
        if (!values.contact) errors.contact = 'Contact Required';
        if (!values.from) errors.from = 'From Location Required';
        if (!values.to) errors.to = 'To Location Required';
        if (!values.distance) errors.distance = 'Distance Required';
        if (!values.quotePrice) errors.quotePrice = 'QuotePrice Required';
        // if (!values.date) errors.date = 'Required';
        // if (!values.productDetails) errors.productDetails = 'Product image is required';
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <FormikField name="jobId" label="Job ID" placeholder="1323" disabled colWidth={12} />
            <FormikField name="name" label="Name" placeholder="a tobcompany shf..." colWidth={12} />
            <FormikField name="contact" label="Contact" placeholder="+091 12 545 6546" colWidth={12} />
          </Row>
          <Row>
            <FormikField name="from" label="From" placeholder="place" colWidth={6} />
            <FormikField name="to" label="To" placeholder="to place" colWidth={6} />
          </Row>
          <Row>
            <FormikField name="distance" label="Distance" placeholder="110 km" colWidth={12} />
          </Row>
          <Row>
            {/* <Form.Group className="mb-3" controlId="productDetails">
              <Form.Label>Product Details</Form.Label>
              <Form.Control
                type="file"
                name="productDetails"
                onChange={(event) => handleImageUpload(event, setFieldValue)}
              />
              {productImagePreview && (
                <div>
                  <img
                    className="mt-1"
                    src={productImagePreview}
                    alt="Product Preview"
                    style={{ width: '110px', height: '110px', cursor: 'pointer' }}
                  />
                </div>
              )}
            </Form.Group> */}
            <FormikField name="productDetails" label="Product Details" type = 'file' colWidth={12} />
          </Row>
          <Row>
            <FormikField name="quotePrice" label="Quote Price" type = 'number' placeholder="1100 Aed" colWidth={12} />
            <FormikField name="date" label="Date" type = 'date'  placeholder="13 Mar 2024"  colWidth={12} disabled={true} />
          </Row>

          
        </Form>
      )}
    </Formik>
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary" type='submit' disabled={isSubmitting}  >
                Close
              </Button> */}
              <Button variant="primary" onClick={handleClose}>
                Add job
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  )
}
