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
import { fetchProduct, fetchReceiving, fetchSuppliers } from '../../../api/index.js';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog.jsx';
import Commonmodal from '../../../components/modals/Commonmodal.jsx';
import { receivingsapi } from '../../../services/BaseUrls.jsx';
import SingleSelect from '../../../components/ui/SingleSelect.jsx';
import { useCustomMutation } from '../../../services/useCustomMutation.js';
import { Pencil, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
export default function Receiving() {
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
  const { data: productlistdata} = useFetchData('product',fetchProduct);
  const { data: supplierslist} = useFetchData('suppliers',fetchSuppliers);
  const { data: receivinglist} = useFetchData('receiving',fetchReceiving);
  console.log("reciving............",receivinglist?.data?.docs)
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setpageLoading(false);
  //   }, 1000); 

  //   return () => clearTimeout(timer);
  // }, []);
  const supplierOption = supplierslist?.data?.docs?.map(item => ({
    label: item.name,
    value: item.id
  }));
  const productlistdataOption = productlistdata?.data?.docs?.map(item => ({
    label: item.name,
    value: item.id
  }));
  // console.log("supplier value",supplierOption)
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
 
  const formatDate = (isoString) => {
    if (!isoString) return ''; // Handle undefined or null
  
    try {
      const date = parseISO(isoString);
      return format(date, 'yyyy-MM-dd');
    } catch (error) {
      console.error('Invalid date string:', isoString);
      return '';
    }
  };
  
  const columns = useMemo(() => [
    {
      header: 'supplier',
      accessorKey: 'supplier',
      cell:({row})=>{
        return row?.original?.supplier?.name
      }
    },
    {
      header: 'invoiceNo',
      accessorKey: 'invoiceNo',
      cell:info=><strong >{info.getValue()}</strong>
    },
    {
      header: 'Product',
      accessorKey: 'product',
      cell:({row})=>{
        return row?.original?.product?.name
      }
    },
    {
      header: 'quantity',
      accessorKey: 'quantity',
    },
    {
      header: 'productionDate',
      accessorKey: 'productionDate',
      cell: ({row})=>{
        return formatDate(row?.original?.productionDate)
      }
    },
    {
      header: 'expiryDate',
      accessorKey: 'expiryDate',
      cell: ({row})=>{
        return formatDate(row?.original?.expiryDate)
      }
    },
    {
      header: 'temperature',
      accessorKey: 'temperature',
    },
    {
      header: 'vehicleTemperature',
      accessorKey: 'vehicleTemperature',
    },
    {
      header: 'vehicleNo',
      accessorKey: 'vehicleNo',
    },
    {
      header: 'Action',
      cell: ({ row }) => {
        // Define functions inside the cell property
        
        return (
          <ul className="d-flex justify-content-center">
            <li>
              <a href="#" className="view" onClick={()=>handleDeleteConfirmation(row?.original?.id)}>
                <Trash2 className="wh-20 flex-shrink-0 cursor-pointer" />
              </a>
              {/* <a href="#" className="view m-3" onClick={()=>handleShow(row.original)}>
                <Pencil className="wh-20 flex-shrink-0 cursor-pointer" />
              </a> */}
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
        url: `${receivingsapi}/${deleteId}`,
        key:'receiving',
       
      });
    } catch (error) {
      console.log(error)
    }
  }
  console.log("selectData",selectData)
  const handleSubmit = (values, actions) => {
    console.log("id",values)
    const payload =values?.id?values: [values] 
    const apiurl = values?.id? `${receivingsapi}/${values.id}` : receivingsapi;
    mutation.mutate({
        method: values?.id? "put":"post",
        url: apiurl,
        values: payload,
        key: "receiving",
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
          <Commonmodal show={show} handleClose={handleClose} title={"Product"}>
  <Formik
    initialValues={{
      supplierId: selectData?.supplierId || "",
      invoiceNo: selectData?.invoiceNo || "",
      productId: selectData?.productId || "",
      quantity: selectData?.quantity || "",
      productionDate: formatDate(selectData?.productionDate) || "",
      expiryDate: formatDate(selectData?.expiryDate) || "",
      temperature: selectData?.temperature || "",
      vehicleTemperature: selectData?.vehicleTemperature || "",
      vehicleNo: selectData?.vehicleNo || "",
      ...(selectData?.id ? { id: selectData.id } : {}),
    }}
    validate={values => {
      const errors = {};
      // Supplier validation
  if (!values.supplierId) {
    errors.supplierId = 'Supplier is required';
  }

  // Invoice number validation
  if (!values.invoiceNo) {
    errors.invoiceNo = 'Invoice number is required';
  }
  if (!values.quantity) {
    errors.quantity = 'quantity is required';
  } else if (isNaN(values.quantity)) {
    errors.quantity = 'quantity must be a number';
  }

  // Product validation
  if (!values.productId) {
    errors.product = 'Product is required';
  }

  // Production date validation
  if (!values.productionDate) {
    errors.productionDate = 'Production date is required';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.productionDate)) {
    errors.productionDate = 'Enter a valid date in YYYY-MM-DD format';
  }

  // Expiry date validation
  if (!values.expiryDate) {
    errors.expiryDate = 'Expiry date is required';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.expiryDate)) {
    errors.expiryDate = 'Enter a valid date in YYYY-MM-DD format';
  }

  // Temperature validation
  if (!values.temperature) {
    errors.temperature = 'Temperature is required';
  } else if (isNaN(values.temperature)) {
    errors.temperature = 'Temperature must be a number';
  }

  // Vehicle temperature validation
  if (!values.vehicleTemperature) {
    errors.vehicleTemperature = 'Vehicle temperature is required';
  } else if (isNaN(values.vehicleTemperature)) {
    errors.vehicleTemperature = 'Vehicle temperature must be a number';
  }

  // Vehicle number validation
  if (!values.vehicleNo) {
    errors.vehicleNo = 'Vehicle number is required';
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
            name="supplierId"
            label="Choose supplier"
            placeholder="Select supplier"
            className="w-100"
            options={supplierOption||[]}
            // options={pricedataOption.filter(option => option.value !== 1) || []}
            variant="border" 
          />          
          <FormikField name="invoiceNo" type="text" label="invoiceNo" placeholder="Enter InvoieNo..." colWidth={12} />
          <SingleSelect
            name="productId"
            label="Choose product"
            placeholder="Select product"
            className="w-100"
            options={productlistdataOption||[]}
            // options={pricedataOption.filter(option => option.value !== 1) || []}
            variant="border" 
          />   
          <FormikField name="quantity" type="text" label="Quantity" placeholder="Enter quantity..." colWidth={12} />
          <FormikField name="productionDate" type="date" label="Product date" placeholder="Enter product date..." colWidth={12} />
          <FormikField name="expiryDate" type="date" label="Expiry date" placeholder="Enter Expirydate..." colWidth={12} />
          <FormikField name="temperature" type="number" label="Temperature" placeholder="Enter temperature..." colWidth={12} />
          <FormikField name="vehicleTemperature" type="number" label="Vehicle Temperature" placeholder="Enter vehicle temperature..." colWidth={12} />
          <FormikField name="vehicleNo" type="text" label="VehicleNo" placeholder="Enter vehicleNo..." colWidth={12} />
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
        message="Are you sure you want to delete this Recieving?"
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
      )
    </>
  );
}
