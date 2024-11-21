import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ContextDatas } from '../../../services/Context.jsx';
import Loader from '../../../components/Loader.jsx';
// import Pagination from '../../../components/Pagination';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import {useFetchData} from '../../../services/useQueryFetchData.js'
import Table from '../../../components/Table.jsx';
import FormikField from '../../../components/InputComponents.jsx';
import { Formik } from 'formik';
import { Form, Button, Row } from 'react-bootstrap';
import { fetchReceiving } from '../../../api/index.js';
export default function Receiving() {
  const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide } = useContext(ContextDatas);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectData,setselectData] =useState('')
  const [pagination,setPagination] =useState({
    pageIndex:0,
    pageSize:10
  })
  const { data: receivinglist} = useFetchData('receiving',fetchReceiving);
  console.log("padataa",receivinglist?.data?.docs)
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setpageLoading(false);
  //   }, 1000); 

  //   return () => clearTimeout(timer);
  // }, []);


  const [productImagePreview, setProductImagePreview] = useState(null);

  const handleImageUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview(reader.result);
        setFieldValue('productDetails', file);
      };
      reader.readAsDataURL(file);
    }
  };
 
  const columns = useMemo(() => [
    {
      header: 'Job ID',
      accessorKey: 'jobId',
    },
    {
      header: 'Name',
      accessorKey: 'name',
      cell:info=><strong >{info.getValue()}</strong>
    },
    {
      header: 'From',
      accessorKey: 'from',
    },
    {
      header: 'To',
      accessorKey: 'to',
    },
    {
      header: 'Distance',
      accessorKey: 'distance',
    },
    {
      header: 'Vehicle Type',
      accessorKey: 'vehicleType',
    },
    {
      header: 'Price',
      accessorKey: 'quotePrice',
    },
    {
      header: 'Date',
      accessorKey: 'date',
    },
    {
      header: 'Action',
      // accessorKey: '',
    //   cell:info=><ul className='text-align-center d-flex'>
    //   <li>
    //     <a href="#" class="view" onClick={handleShow && console.log("infoooooooo",info.cell.row.original)}>
    //       <i class="uil uil-eye action_fonts"></i>
    //     </a>
    //   </li>
     
    // </ul>
    cell: ({ row }) => (
      <ul className='text-align-center d-flex'>
        <li>
          <a
            href="#"
            className="view"
            onClick={() => {
              handleShow(); 
              setselectData(row.original);
            }}
          >
            <i className="uil uil-eye action_fonts"></i>
          </a>
        </li>
      </ul>
    )
    },
  ], []);
  
 
  return (
    <>
       (
        <div className={`contents ${mobileSide ? 'expanded' : ''}`}>
          <div className="demo2 mb-25 t-thead-bg">
            <div className="container-fluid">
              <div className="row mt-50">
                <div className="col-xxl-12 mb-25">
                  <div className="card border-0 px-25">
                    <div className="card-header px-0 border-0">
                      <h6>Receiving</h6>
                      <div className="card-extra">
                        <ul
                          className="card-tab-links nav-tabs nav"
                          role="tablist"
                        >
                          
                          
                          <li>
                            <a
                              href="#t_selling-month333"
                              data-bs-toggle="tab"
                              id="t_selling-month333-tab"
                              role="tab"
                              aria-selected="true"
                              className='active'
                              onClick={()=>
                              {handleShow(); 
                                setselectData('')}
                              }
                            >
                              Add New +
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade active show"
                          id="t_selling-today222"
                          role="tabpanel"
                          aria-labelledby="t_selling-today222-tab"
                        >
                          <Table data={receivinglist?.data?.docs??[]} columns={columns} pagination={pagination} setPagination={setPagination}/>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Receivings</Modal.Title>
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
    </>
  );
}
