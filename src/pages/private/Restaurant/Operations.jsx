
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ContextDatas } from '../../../services/Context.jsx';
import Modal from 'react-bootstrap/Modal';
// import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import {useFetchData} from '../../../services/useQueryFetchData.js'
import Table from '../../../components/Table.jsx';
import { Formik } from 'formik';
import { Form, Button, Row } from 'react-bootstrap';
import {fetchkitchenoperationsItem, fetchthermometersItems } from '../../../api/index.js';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog.jsx';
import Commonmodal from '../../../components/modals/Commonmodal.jsx';
import {kitchenoperationsapi, thermometersapi } from '../../../services/BaseUrls.jsx';
import { useCustomMutation } from '../../../services/useCustomMutation.js';
import { Pencil, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Papa from "papaparse";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormikField from '../../../components/InputComponents.jsx';
import { RestuarantPath } from '../../../services/UrlPaths.jsx';


export default function Operations() {
  const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide,search } = useContext(ContextDatas);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [confirmationState,setConfirmationState]=useState(false)
  const [deleteId,setDeleteId]=useState(null)
  const [selectData,setselectData] =useState('')
  const [pagination,setPagination] =useState({
    pageIndex:0,
    pageSize:10
  })
  const navigate = useNavigate();
  const { id } = useParams();
  const kitchenId = parseInt(id)
  const location = useLocation();
  const passedParams = location.state?.params; 
  const [params,setParams] =useState({
    restaurantId:kitchenId,
    search:search,
    page:"",
    limit:""
  })
 
 
  const {mutation} = useCustomMutation();
  const {data:kitchenoperationList,
    error,
    loading,
    refetch: refetchoperationList,} = useFetchData('kitchenoperations',fetchkitchenoperationsItem,params)

   useEffect(() => {
         const timer = setTimeout(()=>{
          setParams((prev) => ({
            ...prev,
            search: search,
          }));
        },300);
        
          return ()=>{
            clearTimeout(timer);
          }
        }, [search])
    

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Treat the first row as column headers 
        skipEmptyLines: true, // Skip empty lines
        complete: (result) => {
          const data = result.data; // Parsed JSON data
          // setJsonData(data);
          console.log("JSON Data:", data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };
  const [productImagePreview, setProductImagePreview] = useState(null);
 
  const formatDate = (isoString) => {
    if (!isoString) return ''; // Handle undefined or null
  
    try {
      const date = parseISO(isoString);
      return format(date,'dd-MM-yyyy');
    } catch (error) {
      console.error('Invalid date string:', isoString);
      return '';
    }
  };
  
  const columns = useMemo(() => [
    {
        header: "Sl.no",
        accessorKey: "",
        cell: (info) => info.row.index + 1,
      },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    
    
    {
      header: 'Action',
      cell: ({ row }) => {
        // Define functions inside the cell property
        
        return (
          <ul className="">
            <li>
            <a href="#" className="view m-3">
                <Pencil onClick={()=>handleShow(row.original)} className="wh-20 flex-shrink-0 cursor-pointer" />
              </a>
              
               
              <a href="#" className="view" onClick={()=>handleDeleteConfirmation(row?.original?.id)}>
                <Trash2 className="wh-20 flex-shrink-0 cursor-pointer" />
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
        url: `${kitchenoperationsapi}/${deleteId}`,
        key:'kitchenoperations',
       
      });
    } catch (error) {
      console.log(error)
    }
  }
  // console.log("selectData",selectData)
  const handleSubmit = (values, actions) => {
    const payload =values
    const apiurl = values?.id? `${kitchenoperationsapi}/${values.id}` : kitchenoperationsapi;
    mutation.mutate({
        method: values?.id? "put":"post",
        url: apiurl,
        values: payload,
        key: "kitchenoperations",
        next: () => {
          handleClose(); 
          actions.resetForm()
          setdata(null)
          actions.setSubmitting(false)
        },
    },
      { onError: (error) => {
        
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
              <div className="row mt-20">
                <div className="col-xxl-12 mb-25">
                  <div className="card border-0 px-25">
                    <div className="card-header px-0 border-0">
                      <ul
                    className="card-tab-links "
                    role="tablist"
                    >
                    <li>
                        <button
                    
                        onClick={() =>navigate(`/${RestuarantPath}`,{ state: { params: passedParams} })}
                        type="button"
                        className="border-0"
                        size='sm'
                        
                        > <h2>⬅</h2>
                        </button>
                    </li>
                    <li><h6 className=''>Operations</h6></li>
                    </ul>
                      
                      <div className="card-extra">
                        <ul
                          className="card-tab-links nav-tabs nav"
                          role="tablist">                         
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
                          <Table data={kitchenoperationList?.data?.docs??[]} columns={columns} 
                          // setPagination={setPagination}
                          />
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Commonmodal show={show} handleClose={handleClose} title={"Operations"}>
  <Formik
    initialValues={{
        name: selectData?.name || "",
        restaurantId:selectData?.restaurantId||kitchenId,
       
      ...(selectData?.id ? { id: selectData.id } : {}),
      
    }}
    validate={values => {
      const errors = {};
      // Supplier validation 
    if (!values.name) {
    errors.name = 'name is required';
    }
   
    return errors;
    }}
    onSubmit={(values, actions) => {
      handleSubmit(values,actions)
    }}
  >
    {({ handleSubmit, isSubmitting }) => (
      <Form onSubmit={handleSubmit}>
        <Row>
           
           <FormikField name="name" type="text" label="name" placeholder="Enter operation name..." colWidth={12} />
           
        </Row>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Add Operation
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
        message="Are you sure you want to delete this Operation?"
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
      )
    </>
  );
}


