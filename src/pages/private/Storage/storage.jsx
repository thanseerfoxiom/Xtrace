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
import { fetchProduct, fetchRestuarent, fetchStorageItems, fetchStorages, fetchSuppliers } from '../../../api/index.js';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog.jsx';
import Commonmodal from '../../../components/modals/Commonmodal.jsx';
import { receivingsapi, storageItemsapi } from '../../../services/BaseUrls.jsx';
import SingleSelect from '../../../components/ui/SingleSelect.jsx';
import { useCustomMutation } from '../../../services/useCustomMutation.js';
import { Eye, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Papa from "papaparse";
import BasicInput from '../../../components/BasicInput.jsx';
import BasicSelect from '../../../components/BasicSelect.jsx';
import Barcode from 'react-barcode';
import { StorageformatBarcode } from '../../../utils/Barcode.jsx';

export default function Storage() {
  const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide,search } = useContext(ContextDatas);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [confirmationState,setConfirmationState]=useState(false)
  const [deleteId,setDeleteId]=useState(null)
  const [selectData,setselectData] =useState('')
 
  const [params,setParams] =useState({
          
          page:1,
          limit:10,
          restaurantId:"",
          storageId:"",
        })
   
        useEffect(() => {
              setParams((prev) => ({
                ...prev,
                search: search,
              }));
            }, [search])
  const {mutation} = useCustomMutation();
  const { data: productlistdata} = useFetchData('product',fetchProduct);
  const { data: supplierslist} = useFetchData('suppliers',fetchSuppliers);
  const { data: storageItemlist} = useFetchData('storageitems',fetchStorageItems,params);
  const { data: restuarantlist} = useFetchData('restuarant',fetchRestuarent);
  const { data: storagelist} = useFetchData('storages',fetchStorages);
  console.log("storageitem list",storagelist)
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
  const supplierOption = supplierslist?.data?.docs?.map(item => ({
    label: item.name,
    value: item.id
  }));
  const kithendataOption = restuarantlist?.data?.docs?.map(item => ({
    label: item.name,
    value: item.id
  }));
  const storagedataOption = storagelist?.data?.map(item => ({
    label: item.name,
    value: item.id
  }));
  console.log("supplier value",storagedataOption)
  const [productImagePreview, setProductImagePreview] = useState(null);
  const onPrintBarcode = () => {
    const container = document.getElementById("div-svg");
    const mySVG = document.getElementById("barcode-canvas");
    
    // Create print window
    const printWindow = window.open('', 'PrintMap');
    
    // Add thermal printer-friendly styles
    printWindow.document.write(`
      <html>
        <head>
          <title>Barcode Print</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            @media print {
              @page {
                margin: 0;
                size: 80mm 100%; /* Typical thermal paper width */
              }
              body {
                margin: 0;
                padding: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                // min-height: 100vh;
              }
              .print-container {
                width: 100% !important;
                max-width: 80mm !important;
                text-align: center;
              }
              svg {
                width: 100% !important;
                height: auto !important;
                max-width: 80mm !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${container.innerHTML}
          </div>
        </body>
      </html>
    `);
  
    printWindow.document.close();
    
    // Delay print to ensure content loads
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 100);
  };
 
 
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
      header: 'Product',
      accessorKey: 'receiving',
      cell: ({ row }) => (row?.original?.receiving?.product?.name),
    },
    {
      header: 'Quantity',
      cell: ({ row }) => (row?.original?.receiving?.quantity),
    },
    {
      header: 'UOM',
      cell: ({ row }) => (row?.original?.receiving?.uom),
      
    },
    {
      header: 'InvoiceNo',
      cell: ({ row }) => (row?.original?.receiving?.invoiceNo),
    },
    {
      header: 'Kitchen ',
      cell: ({ row }) => (row?.original?.restaurant?.name),
    },
    {
      header: 'Storage',
      cell: ({ row }) => (row?.original?.storage?.name),
    },
    {
      header: 'Barcode ',
      accessorKey: 'vehicleNo',
      size:180,
      cell:({row})=>{
        return(
          <div id='div-svg' style={{ height: "auto", margin: "0 auto", maxWidth: "", width: "100%"  }} onClick={() => onPrintBarcode ()} >
            <Barcode height={50} width={1} format='CODE128'  value={StorageformatBarcode(row?.original?.id,row?.original?.createdAt)} />
          </div>
        )
      }
    },
    {
      header: 'Action',
      cell: ({ row }) => {
        // Define functions inside the cell property
        
        return (
          <ul className="d-flex justify-content-center">
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
        url: `${storageItemsapi}/${deleteId}`,
        key:'storageitems',
       
      });
    } catch (error) {
      console.log(error)
    }
  }
  // console.log("selectData",selectData)
  // const handleSubmit = (values, actions) => {
  //   console.log("id",values)
  //   const payload =values?.id?values: [values] 
  //   const apiurl = values?.id? `${storageItemsapi}/${values.id}` : receivingsapi;
  //   mutation.mutate({
  //       method: values?.id? "put":"post",
  //       url: apiurl,
  //       values: payload,
  //       key: "storageitems",
  //       next: () => {
  //         handleClose(); 
  //         actions.resetForm()
  //         setdata(null)
  //         actions.setSubmitting(false)
  //       },
  //   },
  //     { onError: (error) => {
        
  //     actions.setSubmitting(false); 
  //   },}
  // );
  // };
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
                      <h6>Storages</h6>
                      {/* <div className="card-extra">
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
                      </div> */}
                    </div>
                    <div className='row'>
      
    <div className='col-6 col-md-3'>
      <BasicSelect
        label="Choose Kitchen"
        name="restaurantId"
        variant="border" 
        options={kithendataOption}
        value={params.restaurantId}
        onChange={(selectedOption)=>{
          setParams((prev) => ({
            ...prev,
            restaurantId: selectedOption?.value??"",
          }));
          }}
        placeholder="Select Kitchen..."
      />
        </div>
        <div className='col-6 col-md-3'>
        <BasicSelect
        label="Choose Storage"
        name="storageId"
        variant="border" 
        options={storagedataOption}
        value={params?.storageId}
        onChange={(selectedOption)=>{
          setParams((prev) => ({
            ...prev,
            storageId: selectedOption?.value??"",
          }));
           
          }}
        placeholder="Select storageId..."
      />
                </div>
                {/* <div className='col-6 col-md-3'>
                <BasicInput
                label="Expiry Start Date"
                value={params.expiryStartDate}
                onChange={(e) => {
                  
                  setParams((prev)=>({
                    ...prev,
                    expiryStartDate:e
                  }))
                }}
                className="mb-3"
                type='date'
                
                />
                </div>
                <div className='col-6 col-md-3'>
                <BasicInput
                label="Expiry End Date"
                value={params?.expiryEndDate}
                onChange={(e) => {
                  setParams((prev)=>({
                    ...prev,
                    expiryEndDate:e
                  }))
                }}
                className="mb-3"
                type='date'
                
                />
                </div> */}
                </div>
                    {/* <div className="card-header px-0 border-0">
                
                        <ul
                          className="card-tab-links nav-tabs nav"
                          role="tablist"
                        >
                          
                          
                          <li>
                          <div>
      <button
        data-bs-toggle="tab"
        id="t_selling-month333-tab"
        role="tab"
        aria-selected="true"
        className="btn btn-primary"
        onClick={() => document.getElementById("fileInput").click()}
      >
        Import CSV
      </button>
      <input
        type="file"
        id="fileInput"
        accept=".csv"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

    </div>
                          </li>
                          <li>
                            <button
                              
                              data-bs-toggle="tab"
                              id="t_selling-month333-tab"
                              role="tab"
                              aria-selected="true"
                              className='btn btn-primary '
                              style={{marginLeft:"1px"}}
                              onClick={()=>handleExport()
                              }
                            >
                              Export Excel
                            </button>
                          </li>
                        </ul>
           
                      
                    </div> */}
                    <div className="card-body p-0">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade active show"
                          id="t_selling-today222"
                          role="tabpanel"
                          aria-labelledby="t_selling-today222-tab"
                        >
                          <Table data={storageItemlist?.data?.docs??[]} columns={columns} setParams={setParams}
                           pagination={{
                            page: params.page,
                            limit: params.limit,
                            totalPages: storageItemlist?.data?.metadata.totalPages,
                            hasNext: storageItemlist?.data?.metadata.hasNext,
                            hasPrevious: storageItemlist?.data?.metadata.hasPrevious,
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
          {/* <Commonmodal show={show} handleClose={handleClose} title={"Product"}>
  <Formik
    initialValues={{
      supplierId: selectData?.supplierId || "",
      invoiceNo: selectData?.invoiceNo || "",
      productId: selectData?.productId || "",
      quantity: selectData?.quantity || "",
      uom: selectData?.uom || "",
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
          <FormikField name="uom" type="text" label="unit of measure" placeholder="Enter unit..." colWidth={12} />
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
</Commonmodal> */}

          <ConfirmationDialog
        open={confirmationState}
        onOpenChange={setConfirmationState}
        title="Confirm Deletion"
        message="Are you sure you want to delete this storage?"
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
      )
    </>
  );
}
