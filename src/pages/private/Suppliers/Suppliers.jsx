import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ContextDatas } from '../../../services/Context';
import Loader from '../../../components/Loader';
// import Pagination from '../../../components/Pagination';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import {useFetchData} from '../../../services/useQueryFetchData.js'
import Table from '../../../components/Table';
import FormikField from '../../../components/InputComponents.jsx';
import { Formik } from 'formik';
import { Form, Button, Row } from 'react-bootstrap';
import {fetchSuppliers } from '../../../api/index.js';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog.jsx';
import Commonmodal from '../../../components/modals/Commonmodal.jsx';
import { suppliersapi } from '../../../services/BaseUrls.jsx';
import { Pencil, Trash2 } from 'lucide-react';
import { useCustomMutation } from '../../../services/useCustomMutation.js';
import Papa from "papaparse";
export default function Suppliers() {
  const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide } = useContext(ContextDatas);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [confirmationState,setConfirmationState]=useState(false)
  const [deleteId,setDeleteId]=useState(null)
  const [selectData,setselectData] =useState('')
  const [pagination,setPagination] =useState({
    pageIndex:0,
    pageSize:10
  })
  const {mutation} = useCustomMutation();
  const { data: supplierslist} = useFetchData('suppliers',fetchSuppliers);
  console.log("padataa",supplierslist?.data?.docs)


  const [productImagePreview, setProductImagePreview] = useState(null);


  const handleExport = () => {
    const data = supplierslist?.data?.docs

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ExportedSupplierData.csv";
    link.click();
  };
  // Column definitions
  const columns = useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'name',
      cell:info=><strong >{info.getValue()}</strong>
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
    },
   
    {
      header: 'Action',
      cell: ({ row }) => {
        // Define functions inside the cell property
        
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
  ], []);
  const handleDeleteConfirmation = (deleteId) => {
    setConfirmationState(true);
    setDeleteId(deleteId);
  };

  const handleShow = (selectedData) => {
    setShow(true);
    setselectData(selectedData);
  };

  const handleDelete=()=>{
    try {
      mutation.mutate({
        method: "delete",
        url: `${suppliersapi}/${deleteId}`,
        key:'suppliers',
       
      });
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (values, actions) => {
    const apiurl = values?.id? `${suppliersapi}/${values.id}` : suppliersapi;
    mutation.mutate({
        method: values?.id? "put":"post",
        url: apiurl,
        values: { ...values },
        key: "suppliers",
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
                      <h6>Suppliers</h6>
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
                    <div className="card-header px-0 border-0">
                
                <ul
                  className="card-tab-links nav-tabs nav"
                  role="tablist"
                >
                  
                  
                 
                  <li>
                    <button
                      
                      data-bs-toggle="tab"
                      id="t_selling-month333-tab"
                      role="tab"
                      aria-selected="true"
                      className='btn btn-primary'
                      onClick={()=>handleExport()
                      }
                    >
                      Export Excel
                    </button>
                  </li>
                </ul>
   
              
            </div>
                    <div className="card-body p-0">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade active show"
                          id="t_selling-today222"
                          role="tabpanel"
                          aria-labelledby="t_selling-today222-tab"
                        >
                          <Table data={supplierslist?.data?.docs??[]} columns={columns} pagination={pagination} setPagination={setPagination}/>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Commonmodal show={show} handleClose={handleClose} title={"Suppliers"}>
  <Formik
    initialValues={{
      name: selectData?.name || "",
      phone: selectData?.phone || "",
      ...(selectData?.id ? { id: selectData.id } : {}),
    }}
    validate={values => {
      const errors = {};
      if (!values.name) errors.name = 'Name Required';
      if (!values.phone) {
        errors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = 'Phone number must be 10 digits';
      }
      return errors;
    }}
    onSubmit={(values,actions) => {
      handleSubmit(values,actions)
    }}
  >
    {({ handleSubmit, isSubmitting }) => (
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormikField name="name" label="Name" placeholder="Enter name..." colWidth={12} />
          <FormikField name="phone" type="text" label="Phone" placeholder="Enter phone..." colWidth={12} />
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
        message="Are you sure you want to delete this suppliers ?"
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
      )
    </>
  );
}
