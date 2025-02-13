import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ContextDatas } from '../../../services/Context.jsx';
import Loader from '../../../components/Loader.jsx';
import Modal from 'react-bootstrap/Modal';
// import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import {useFetchData} from '../../../services/useQueryFetchData.js'
import Table from '../../../components/Table.jsx';
import FormikField from '../../../components/InputComponents.jsx';
import { Formik } from 'formik';
import { Form, Button, Row } from 'react-bootstrap';
import { fetchdishesItems} from '../../../api/index.js';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog.jsx';
import Commonmodal from '../../../components/modals/Commonmodal.jsx';
import { dishesapi, receivingsapi } from '../../../services/BaseUrls.jsx';

import { useCustomMutation } from '../../../services/useCustomMutation.js';
import { Eye, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Papa from "papaparse";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReceipePath } from '../../../services/UrlPaths.jsx';


export default function Dishes() {
  const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide,search } = useContext(ContextDatas);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [confirmationState,setConfirmationState]=useState(false)
  const [deleteId,setDeleteId]=useState(null)
  const [selectData,setselectData] =useState('')
  const location = useLocation();
  const backedParams = location.state?.params; 
  const [params,setParams] =useState(backedParams??{
      search:search,
      page:1,
      limit:10
    })

    useEffect(() => {
          setParams((prev) => ({
            ...prev,
            search: search,
          }));
        }, [search])
  const {mutation} = useCustomMutation();
  const { data: disheslistdata} = useFetchData('dishes',fetchdishesItems,params);
  let navigate = useNavigate();
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
      header: 'Ingredients',
      accessorKey: 'recepie',
      cell:({row})=> {
        // Define functions inside the cell property
        
        return (
          <ul className="">
            <li>
            {/* <a href="#" className="view m-3" onClick={()=>navigate(`${StorageDetailsPath}/${row.original.id}`)}>
                <Eye className="wh-20 flex-shrink-0 cursor-pointer" />
              </a> */}
              
              
              
              <Button
  type="button"
  className=""
  size='sm'
  onClick={() =>navigate(`/${ReceipePath}/${row?.original?.id}`,{ state: { params: params} })}
>
Ingredients
</Button>
                
                {/* <Trash2 className="wh-20 flex-shrink-0 cursor-pointer" /> */}
            
              
            </li>
          </ul>
        );
      },
    },
    
   
    {
      header: 'Action',
      cell: ({ row }) => {
        // Define functions inside the cell property
        
        return (
          <ul className="">
            <li>
            {/* <a href="#" className="view m-3" onClick={()=>navigate(`${StorageDetailsPath}/${row.original.id}`)}>
                <Eye className="wh-20 flex-shrink-0 cursor-pointer" />
              </a> */}
              
               
              <a href="#" className="view" onClick={()=>handleDeleteConfirmation(row?.original?.id)}>
                <Trash2 className="wh-20 flex-shrink-0 cursor-pointer" />
              </a>
              
            </li>
          </ul>
        );
      },
    },
  ], [navigate, params]);
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
        url: `${dishesapi}/${deleteId}`,
        key:'dishes',
       
      });
    } catch (error) {
      console.log(error)
    }
  }
  // console.log("selectData",selectData)
  const handleSubmit = (values, actions) => {
    const payload =values
    const apiurl = values?.id? `${dishesapi}/${values.id}` : dishesapi;
    mutation.mutate({
        method: values?.id? "put":"post",
        url: apiurl,
        values: payload,
        key: "dishes",
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
                      <h6>Dishes</h6>
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
                          <Table data={disheslistdata?.data?.docs??[]} columns={columns} setParams={setParams}
                           pagination={{
                            page: params.page,
                            limit: params.limit,
                            totalPages: disheslistdata?.data?.metadata.totalPages,
                            hasNext: disheslistdata?.data?.metadata.hasNext,
                            hasPrevious: disheslistdata?.data?.metadata.hasPrevious,
                          }}
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
          <Commonmodal show={show} handleClose={handleClose} title={"Dishe"}>
  <Formik
    initialValues={{
      name: selectData?.name || "",
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
      
          <FormikField name="name" type="text" label="Name" placeholder="Enter  dish name..." colWidth={12} />
        </Row>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Add Dish
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
        message="Are you sure you want to delete this Dishe?"
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
      )
    </>
  );
}


