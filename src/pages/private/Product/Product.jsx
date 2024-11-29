import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ContextDatas } from '../../../services/Context';
import Loader from '../../../components/Loader';
import Modal from 'react-bootstrap/Modal';
import {useFetchData} from '../../../services/useQueryFetchData.js'
import Table from '../../../components/Table';
import FormikField from '../../../components/InputComponents.jsx';
import { Formik } from 'formik';
import { Form, Button, Row } from 'react-bootstrap';
import { fetchProduct } from '../../../api/index.js';
import Commonmodal from '../../../components/modals/Commonmodal.jsx';
import { Pencil, Trash2 } from 'lucide-react';
import { productsapi } from '../../../services/BaseUrls.jsx';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog.jsx';
import { useCustomMutation } from '../../../services/useCustomMutation.js';
export default function Products() {
  const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide } = useContext(ContextDatas);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [selectData,setselectData] =useState('')
  const [confirmationState,setConfirmationState]=useState(false)
  const [deleteId,setDeleteId]=useState(null)
  const [pagination,setPagination] =useState({
    pageIndex:0,
    pageSize:10
  })
  const {mutation} = useCustomMutation();
  // console.log("selectData",selectData)
  const { data: productlistdata} = useFetchData('product',fetchProduct);
  // console.log("productlist",productlistdata)


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
  // Data for the table
  // const productlist = useMemo(() => [
  //   {
   
  //     name: 'name1',
  //     description: 'a tobcompany shfbs sdufbsd fuisdif u kjsdn sjhd fsd faws f jkadb asdjh asjda  ',
  //     image: 'to place',
      
  //   },
  //   {
  //     name: 'name2',
  //     description: 'a tobcompany shfbs sdufbsd fuisdif u',
  //     image: 'to place',
  //   },
  //   {
  //     name: 'name3',
  //     description: 'a tobcompany shfbs sdufbsd fuisdif u',
  //     image: 'to place',
  //   },
  
  // ], []);

  // Column definitions
  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: (info) => <strong>{info.getValue()}</strong>,
      },
      {
        header: 'Description',
        accessorKey: 'description',
      },
      {
        header: 'Action',
        cell: ({ row }) => {
          
          return (
            <ul className="text-align-center d-flex">
              <li>
                <a href="#" className="view" onClick={()=>handleDeleteConfirmation(row?.original?.id)}>
                  <Trash2 className="wh-20 flex-shrink-0 cursor-pointer" />
                </a>
                <a href="#" className="view m-3" onClick={()=>handleShow(row.original)}>
                  <Pencil className="wh-20 flex-shrink-0 cursor-pointer" />
                </a>
              </li>
            </ul>
          );
        },
      },
    ],
    [] // No external dependencies
  );
  const handleShow = (selectedData) => {
    setShow(true);
    setselectData(selectedData);
  };
  
  const handleDeleteConfirmation = (deleteId) => {
    setConfirmationState(true)
    setDeleteId(deleteId)
   
  };
  const handleDelete=()=>{
    try {
      mutation.mutate({
        method: "delete",
        url: `${productsapi}/${deleteId}`,
        key:'product',
       
      });
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (values, actions) => {
    const apiurl = values?.id? `${productsapi}/${values.id}` : productsapi;
    mutation.mutate({
        method: values?.id? "put":"post",
        url: apiurl,
        values: { ...values },
        key: "product",
        next: () => {
          handleClose(); 
          actions.resetForm()
          setdata(null)
        },
    },       { onError: (error) => {
      actions.setSubmitting(false); 
    },}
  );
  };
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
                      <h6>Products</h6>
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
                          <Table data={productlistdata?.data?.docs??[]} columns={columns} pagination={pagination} setPagination={setPagination}/>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         

<Commonmodal show={show} handleClose={handleClose} title={"Product"}>
  <Formik
    initialValues={{
      name: selectData?.name || "",
      description: selectData?.description || "",
      ...(selectData?.id ? { id: selectData.id } : {}),
    }}
    validate={values => {
      const errors = {};
      if (!values.name) errors.name = 'Name Required';
      if (!values.description) errors.description = 'Description Required';
      return errors;
    }}
    onSubmit={(values,actions ) => {
      handleSubmit(values,actions)
    }}
  >
    {({ handleSubmit, isSubmitting }) => (
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormikField name="name" label="Name" placeholder="Enter name..." colWidth={12} />
          <FormikField name="description" type="textarea" label="Description" placeholder="Enter description..." colWidth={12} />
        </Row>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Add Product
          </Button>
        </Modal.Footer>
      </Form>
    )}
  </Formik>
</Commonmodal>
<ConfirmationDialog
        open={confirmationState}
        onOpenChange={setConfirmationState}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product ?"
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
      )
    </>
  );
}
