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
import { fetchHaccapItems, fetchRestuarent, fetchTODOItems } from '../../../api/index.js';
import Commonmodal from '../../../components/modals/Commonmodal.jsx';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog.jsx';
import { Haccapapi, Haccapcheckapi, restaurantsapi } from '../../../services/BaseUrls.jsx';
import { useCustomMutation } from '../../../services/useCustomMutation.js';
import { Pencil, Trash2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OperationsPath, ThermometerPath } from '../../../services/UrlPaths.jsx';
import BasicSelect from '../../../components/BasicSelect.jsx';
export default function TodoHaccap() {
  const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide,search } = useContext(ContextDatas);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [confirmationState,setConfirmationState]=useState(false)
  const [deleteId,setDeleteId]=useState(null)
  const [selectData,setselectData] =useState('')

  const navigate = useNavigate();
  const {mutation} = useCustomMutation();
   const location = useLocation();
    const backedParams = location.state?.params; 
  const [params,setParams] =useState(backedParams??{
            
            page:1,
            limit:10,
            today:true,
            search:""
          })
     
          useEffect(() => {
                setParams((prev) => ({
                  ...prev,
                  search: search,
                }));
              }, [search])
  const { data: todoList} = useFetchData('todo',fetchTODOItems,params);
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
  console.log("statsusas",todoList?.data?.docs)
  const columns = useMemo(() => [
   
    {
      header: 'Name',
      accessorKey: 'haccp.name',
      cell:info=><strong >{info.getValue()}</strong>
    },
    {
      header: 'Checked',
      accessorKey: 'status',
      cell: ({ row }) => {
        const { original } = row;
        const handleStatusToggle = (e) => {
          const updatedStatus = e.target.checked;
          // Call your mutation to update the status via PUT request
          mutation.mutate({
            method: "put",
            url: `${Haccapcheckapi}/${original.id}`,
            values: { status: updatedStatus },
            key: "todo",
          });
        };
    
        return (
            <Form.Check 
            type="switch"
            id={`custom-switch-${original.id}`}
            checked={original.status}
            onChange={handleStatusToggle}
          />
        );
      },
    },
   
    

    
  
    // {
    //   header: 'Action',
    //   cell: ({ row }) => {
    //     // Define functions inside the cell property
        
    //     return (
    //       <ul className="text-align-center d-flex">
    //         <li>
    //         <a href="#" className="view m-3" onClick={()=>handleShow(row.original)}>
    //             <Pencil className="wh-20 flex-shrink-0 cursor-pointer" />
    //           </a>
    //           <a href="#" className="view" onClick={()=>handleDeleteConfirmation(row?.original?.id)}>
    //             <Trash2 className="wh-20 flex-shrink-0 cursor-pointer" />
    //           </a>
    //         </li>
    //       </ul>
    //     );
    //   },
    // },
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
        url: `${Haccapcheckapi}/${deleteId}`,
        key:'todo',
       
      });
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (values, actions) => {
    const apiurl = values?.id? `${Haccapcheckapi}/${values.id}` : Haccapcheckapi;
    mutation.mutate({
        method: values?.id? "put":"post",
        url: apiurl,
        values: { ...values },
        key: "todo",
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
              <div className="row mt-20">
                <div className="col-xxl-12 mb-25">
                  <div className="card border-0 px-25">
                    <div className="card-header px-0 border-0">
                      <h6>Haccap</h6>
                      <div className="card-extra">
                        {/* <ul
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
                        </ul> */}
                      </div>
                    </div>
                    <div className='row'>
      
    <div className='col-6 col-md-3'>
      <BasicSelect
        label="Choose Date"
        name="today"
        variant="border" 
        options={[{value:true,label:"Today"},{value:false,label:"All"}]}
        value={params.today}
        onChange={(selectedOption)=>{
          setParams((prev) => ({
            ...prev,
            today: selectedOption?.value??"",
          }));
          }}
        placeholder="Select date..."
      />
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
                          <Table data={todoList?.data?.docs??[]} columns={columns} setParams={setParams}
                           pagination={{
                            page: params.page,
                            limit: params.limit,
                            totalPages: todoList?.data?.metadata.totalPages,
                            hasNext: todoList?.data?.metadata.hasNext,
                            hasPrevious: todoList?.data?.metadata.hasPrevious,
                          }} />
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        

          <ConfirmationDialog
        open={confirmationState}
        onOpenChange={setConfirmationState}
        title="Confirm Deletion"
        message="Are you sure you want to delete this Restaurant ?"
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
      )
    </>
  );
}
