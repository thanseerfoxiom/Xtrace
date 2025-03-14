
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ContextDatas } from '../../../services/Context.jsx';
import Modal from 'react-bootstrap/Modal';
// import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import {useFetchData} from '../../../services/useQueryFetchData.js'
import Table from '../../../components/Table.jsx';
import { Formik } from 'formik';
import { Form, Button, Row } from 'react-bootstrap';
import { fetchProduct, fetchrecepieItems } from '../../../api/index.js';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog.jsx';
import Commonmodal from '../../../components/modals/Commonmodal.jsx';
import { dishesapi, recipesapi } from '../../../services/BaseUrls.jsx';
import { useCustomMutation } from '../../../services/useCustomMutation.js';
import { Pencil, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Papa from "papaparse";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SingleSelect from '../../../components/ui/SingleSelect.jsx';
import { DishesPath } from '../../../services/UrlPaths.jsx';
import FormikField from '../../../components/InputComponents.jsx';


export default function Recepies() {
  const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide,search } = useContext(ContextDatas);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [confirmationState,setConfirmationState]=useState(false)
  const [deleteId,setDeleteId]=useState(null)
  const [selectData,setselectData] =useState('')
 const navigate = useNavigate();
  
  const { id } = useParams();
  const dishId = parseInt(id)
  const location = useLocation();
  const passedParams = location.state?.params; 
  const [params,setParams] =useState({
    dishId:dishId,
    productId:"",
    search:search,
    page:"",
    limit:""
  })
  // console.log("passedParams",passedParams)
  const {mutation} = useCustomMutation();
  const {data:recepielistdata,
    error,
    loading,
    refetch: refetchrecepieList,} = useFetchData('recepie',fetchrecepieItems,params)
  const { data: productlistdata} = useFetchData('product',fetchProduct);

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
          
  const productlistdataOption = productlistdata?.data?.docs?.map(item => ({
    label: item.name,
    value: item.id
  }));

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
      header: 'Dish',
      accessorKey: 'dish',
      cell:({row})=>row.original?.dish?.name
    },
    
    {
      header: 'Product',
      accessorKey: 'product',
      cell:({row})=>row.original?.product?.name
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
      // cell:({row})=>row.original?.product?.name
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
        url: `${recipesapi}/${deleteId}`,
        key:'recepie',
       
      });
    } catch (error) {
      console.log(error)
    }
  }
  // console.log("selectData",selectData)
  const handleSubmit = (values, actions) => {
    const payload =values
    const apiurl = values?.id? `${recipesapi}/${values.id}` : recipesapi;
    mutation.mutate({
        method: values?.id? "put":"post",
        url: apiurl,
        values: payload,
        key: "recepie",
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
  console.log("recepielistdatarecepielistdata",recepielistdata)
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
                        
                              onClick={() =>navigate(`/${DishesPath}`,{ state: { params: passedParams} })}
                              type="button"
                              className="border-0"
                              size='sm'
                              
                            > <h2>⬅</h2>
                            </button>
                          </li>
                          <li><h6 className=''>Ingredients</h6></li>
                        </ul>
                      
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
                          <Table data={recepielistdata?.data?.docs??[]} columns={columns}
                          />
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Commonmodal show={show} handleClose={handleClose} title={"Ingredient"}>
  <Formik
    initialValues={{
      productId: selectData?.productId || "",
      quantity: selectData?.quantity || "",
      dishId:dishId,
      ...(selectData?.id ? { id: selectData.id } : {}),
      
    }}
    validate={values => {
      const errors = {};
      // Supplier validation
  
  if (!values.productId) {
    errors.name = 'Product is required';
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
      
           <SingleSelect
            name="productId"
            label="Choose product"
            placeholder="Select product"
            className="w-100"
            options={productlistdataOption||[]}
            // options={pricedataOption.filter(option => option.value !== 1) || []}
            variant="border" 
          /> 
          <FormikField name="quantity" type="number" label="quantity" placeholder="Enter  quantity..." colWidth={12} />  
        </Row>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Add Ingredients
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
        message="Are you sure you want to delete this Ingredient?"
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
      )
    </>
  );
}


