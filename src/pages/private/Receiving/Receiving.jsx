import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import { fetchProduct, fetchReceiving, fetchRestuarent, fetchStorageItems, fetchStorages, fetchSuppliers } from '../../../api/index.js';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog.jsx';
import Commonmodal from '../../../components/modals/Commonmodal.jsx';
import { moveItemsapi, receivingimportapi, receivingsapi } from '../../../services/BaseUrls.jsx';
import SingleSelect from '../../../components/ui/SingleSelect.jsx';
import { useCustomMutation } from '../../../services/useCustomMutation.js';
import { DatabaseBackup,ArchiveRestore, Trash2, Pencil } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Papa from "papaparse";
import BasicSelect from '../../../components/BasicSelect.jsx';
import BasicInput from '../../../components/BasicInput.jsx';
import Barcode from 'react-barcode';
import { ReceiveformatBarcode } from '../../../utils/Barcode.jsx';
export default function Receiving() {
  const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide,search } = useContext(ContextDatas);
  const [show, setShow] = useState(false);
  const [storageshow, setStorageShow] = useState(false);
  const handleClose = () => setShow(false);
  
  const [confirmationState,setConfirmationState]=useState(false)
  const [deleteId,setDeleteId]=useState(null)
  const [selectData,setselectData] =useState('')
 
  const [params,setParams] =useState({
        startDate:"",
        endDate:"",
        expiryStartDate:"",
        expiryEndDate:"",
        productId:"",
        supplierId:"",
        search:search,
        isStored:"",
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
  const { data: productlistdata} = useFetchData('product',fetchProduct);
  const { data: restuarantlist} = useFetchData('restuarant',fetchRestuarent);
  const { data: receivinglist} = useFetchData('receiving',fetchReceiving,params);
  const { data: supplierslist} = useFetchData('suppliers',fetchSuppliers);
  const { data: storagelist} = useFetchData('storages',fetchStorages);
  

  const handleShow = (selectedData) => {
    setShow(true);
    setselectData(selectedData);
  };
  // console.log("selsecteed  data ",selectData)
  //  const onPrintBarcode = () => {
  //   var container = document.getElementById("div-svg");
  //   var mySVG = document.getElementById("barcode-canvas");
  //   var width = "100%";
  //   var height = "100%";
  //   var printWindow = window.open('', 'PrintMap');
  //   printWindow.document.writeln(container.innerHTML);
  //   printWindow.document.close();
  //   printWindow.print();
  //   printWindow.close();
  // }
   // --- End Barcode printing setup ---
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
  const handleExport = () => {
    // Access the raw data
    const rawData = receivinglist?.data?.docs;
  
    if (!rawData || rawData.length === 0) {
      console.error("No data available for export.");
      return;
    }
  
    // Transform the data to include supplierName and productName
    const transformedData = rawData.map(item => ({
      invoiceNo: item.invoiceNo,
      supplierName: item.supplier?.name || "Unknown",
      productName: item.product?.name || "Unknown",
      quantity: parseFloat(item.quantity) || 0,
      uom: item.uom || "N/A",
      storage: item.storage || "N/A",
      productionDate: formatDate(item.productionDate) || "N/A",
      expiryDate: formatDate(item.expiryDate) || "N/A",
      temperature: parseFloat(item.temperature) || 0,
      vehicleTemperature: parseFloat(item.vehicleTemperature) || 0,
      vehicleNo: item.vehicleNo || "N/A",
    }));
    // console.log("Transformed Data:", transformedData);
    // Convert the data to CSV
    try {
      const csv = Papa.unparse(transformedData); // Ensure PapaParse is installed and imported
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
  
      // Create a download link
      const link = document.createElement("a");
      link.href = url;
      link.download = "ExportedReceivingData.csv";
      link.click();
  
      // Clean up the URL object
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data to CSV:", error);
    }
  };
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
          try {
            mutation.mutate({
              method:"post",
              url: receivingimportapi,
              values: data,
              key: "receiving",
              next: () => {
                // handleClose(); 
                // actions.resetForm()
                // setdata(null)
                // actions.setSubmitting(false)
              },
          },
            { onError: (error) => {
            actions.setSubmitting(false); 
          },}
        );
          } catch (error) {
           console.log(error) 
          }
          
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };
  const Receivingoptions = receivinglist?.data?.docs?.map(item => ({
    label: item.product?.name,
    value: item.id
  }));
  const Kitchenoptions = restuarantlist?.data?.docs?.map(item => ({
    label: item?.name,
    value: item.id
  }));
  const supplierOption = supplierslist?.data?.docs?.map(item => ({
    label: item.name,
    value: item.id
  }));
  const productlistdataOption = productlistdata?.data?.docs?.map(item => ({
    label: item.name,
    value: item.id
  }));
  const storageItemlistOption = storagelist?.data?.map(item => ({
    label: item.name,
    value: item.id
  }));

  // const formatDate = (isoString) => {
  //   if (!isoString) return ''; // Handle undefined or null
  
  //   try {
  //     const date = parseISO(isoString);
  //     return format(date,'dd-MM-yyyy');
  //   } catch (error) {
  //     console.error('Invalid date string:', isoString);
  //     return '';
  //   }
  // };
  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    if (isNaN(date)) {
      // Handle invalid date
      return '';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const columns = useMemo(() => [
    {
      header: 'InvoiceNo',
      accessorKey: 'invoiceNo',
      cell:info=><strong >{info.getValue()}</strong>
    },
    {
      header: 'Supplier',
      accessorKey: 'supplier',
      cell:({row})=>{
        return row?.original?.supplier?.name
      }
    },
    {
      header: 'Product',
      accessorKey: 'product',
      cell:({row})=>{
        return row?.original?.product?.name
      }
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
    },
    {
      header: 'UOM',
      accessorKey: 'uom',
    },
    {
      header: 'ProductionDate',
      accessorKey: 'productionDate',
      cell: ({row})=>{
        return formatDate(row?.original?.productionDate)
      }
    },
    {
      header: 'ExpiryDate',
      accessorKey: 'expiryDate',
      cell: ({row})=>{
        return formatDate(row?.original?.expiryDate)
      }
    },
    {
      header: 'Storage',
      accessorKey: 'storage',
      // cell: ({row})=>{
      //   return formatDate(row?.original?.expiryDate)
      // }
    },
    {
      header: 'Temp',
      accessorKey: 'temperature',
    },
    {
      header: 'VehicleTemp',
      accessorKey: 'vehicleTemperature',
    },
    {
      header: 'VehicleNo',
      accessorKey: 'vehicleNo',
    },
    {
      header: 'Move to storage',
      cell: ({ row }) => {
        
        // Define functions inside the cell property
        return (
          row.original?.storagedItem?
          <ul className="d-flex justify-content-center">
          <li><p>Moved to {row.original.storagedItem?.storage.name}</p></li>
        </ul>
          :
          
        <ul className="d-flex justify-content-center">
        <li>
          <a href="#" className="view" onClick={()=>
                          {setStorageShow(true); 
                            setselectData(row?.original)}
                          } >
            <ArchiveRestore className="wh-20 flex-shrink-0 cursor-pointer" />
          </a>
          {/* <a href="#" className="view m-3" onClick={()=>handleShow(row.original)}>
            <Pencil className="wh-20 flex-shrink-0 cursor-pointer" />
          </a> */}
        </li>
      </ul>
        );
      },
    },
    {
      header: 'Barcode ',
      accessorKey: 'vehicleNo',
      size:180,
      cell:({row})=>{
        return(
          <div id='div-svg' style={{ height: "auto", margin: "0 auto", maxWidth: "", width: "100%"  }} onClick={() => onPrintBarcode ()} >
            <Barcode height={50} width={1} format='CODE128'  value={ReceiveformatBarcode(row?.original?.id,row?.original?.createdAt)} />
          </div>
        )
      }
    },
    {
      header: 'Action',
      cell: ({ row }) => {
        // Define functions inside the cell property
        return (
          <ul >
            <li className="text-align-center d-flex gap-3">
              <a href="#" className="view" onClick={()=>handleDeleteConfirmation(row?.original?.id)}>
                <Trash2 className="wh-20 flex-shrink-0 cursor-pointer" />
              </a>
              <a href="#" className="view " onClick={()=>handleShow(row.original)}>
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
  const handleStorageShow = (selectedData) => {
    setStorageShow(true);
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
  // console.log("selectData",selectData)
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

  const handleStorageSubmit=(values,actions)=>{
    mutation.mutate({
        method: values?.id? "put":"post",
        url: moveItemsapi,
        values: values,
        key: "storageitems",
        next: () => {
          setStorageShow(false) 
          actions.resetForm()
          setdata(null)
          actions.setSubmitting(false)
        },
    },
      { onError: (error) => {
        actions.setSubmitting(false); 
    },}
  );
  }
  const filteruom =(product)=>{
   
    const uom = productlistdata?.data?.docs.find(t=>t.id===product)?.uom??""
    return uom
  }
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
                    <div className="card-header px-0 border-0">
                
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
      {/* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */}
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
    </div>
    <div className='row'>
      
    <div className='col-6 col-md-3'>
      <BasicSelect
        label="Choose Supplier"
        name="supplierId"
        variant="border" 
        options={supplierOption}
        value={params.supplierId}
        onChange={(selectedOption)=>{
          setParams((prev) => ({
            ...prev,
            supplierId: selectedOption?.value??"",
          }));
          }}
        placeholder="Select supplier..."
      />
        </div>
        <div className='col-6 col-md-3'>
        <BasicSelect
        label="Choose Product"
        name="productId"
        variant="border" 
        options={productlistdataOption}
        value={params.productId}
        onChange={(selectedOption)=>{
          setParams((prev) => ({
            ...prev,
            productId: selectedOption?.value??"",
          }));
           
          }}
        placeholder="Select product..."
      />
                </div>
                <div className='col-6 col-md-3'>
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
                          <Table data={receivinglist?.data?.docs??[]} columns={columns} setParams={setParams}
                           pagination={{
                            page: params.page,
                            limit: params.limit,
                            totalPages: receivinglist?.data?.metadata.totalPages,
                            hasNext: receivinglist?.data?.metadata.hasNext,
                            hasPrevious: receivinglist?.data?.metadata.hasPrevious,
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
          <Commonmodal show={show} handleClose={handleClose} title={"Product"}>
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
      storage: selectData?.storage || "",
      ...(selectData?.id ? { id: selectData.id } : {}),
    }}
    validate={values => {
      const errors = {};
      // Supplier validation
  if (!values.supplierId) {
    errors.supplierId = 'Supplier is required';
  }

  // Invoice number validation
  // if (!values.invoiceNo) {
  //   errors.invoiceNo = 'Invoice number is required';
  // }
  // if (!values.quantity) {
  //   errors.quantity = 'quantity is required';
  // } else if (isNaN(values.quantity)) {
  //   errors.quantity = 'quantity must be a number';
  // }

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
  // if (!values.temperature) {
  //   errors.temperature = 'Temperature is required';
  // } else if (isNaN(values.temperature)) {
  //   errors.temperature = 'Temperature must be a number';
  // }

  // Vehicle temperature validation
  // if (!values.vehicleTemperature) {
  //   errors.vehicleTemperature = 'Vehicle temperature is required';
  // } else if (isNaN(values.vehicleTemperature)) {
  //   errors.vehicleTemperature = 'Vehicle temperature must be a number';
  // }

  // Vehicle number validation
  // if (!values.vehicleNo) {
  //   errors.vehicleNo = 'Vehicle number is required';
  // }
      return errors;
    }}
    onSubmit={(values, actions) => {
      handleSubmit(values,actions)

    }}
  >
    {({ handleSubmit, isSubmitting,values,setFieldValue }) => {
      // console.log(";;;;;;;;;;;;;;;;;;;;;;;;values",values)
      return (
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
            onChange={(value)=>setFieldValue("uom",filteruom(value?.value))}
            // options={pricedataOption.filter(option => option.value !== 1) || []}
            variant="border" 
          />   
          <FormikField name="quantity" type="text" label="Quantity" placeholder="Enter quantity..." colWidth={12} />
          <FormikField name="uom" type="text" label="unit of measure"  disabled  colWidth={12} />
          <FormikField name="productionDate" value={formatDate(values?.productionDate)} type="date" label="Product date" placeholder="Enter product date..." colWidth={12} />
          <FormikField name="expiryDate" type="date"  value={formatDate(values?.expiryDate)} label="Expiry date" placeholder="Enter Expirydate..." colWidth={12} />
          <FormikField name="temperature" type="number" label="Temperature" placeholder="Enter temperature..." colWidth={12} />
          <FormikField name="vehicleTemperature" type="number" label="Vehicle Temperature" placeholder="Enter vehicle temperature..." colWidth={12} />
          <FormikField name="vehicleNo" type="text" label="VehicleNo" placeholder="Enter vehicleNo..." colWidth={12} />
          <SingleSelect
            name="storage"
            label="Choose storage"
            placeholder="Select storage"
            className="w-100"
            options={storagelist?.data?.map(item => ({
              label: item.name,
              value: item.name
            }))||[]}
            // options={pricedataOption.filter(option => option.value !== 1) || []}
            variant="border" 
          />   
        </Row>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Add Receiving 
          </Button>
        </Modal.Footer>
      </Form>
    )}}
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

      <Commonmodal show={storageshow} handleClose={()=>setStorageShow(false)} title={"Move To Storage"}>
      <Formik
    initialValues={{
      restaurantId: selectData?.restaurantId || "",
      storageId: selectData?.storageId || "",
      quantity: selectData?.quantity || "",
      receivingId: selectData?.id || "",
      // ...(selectData?.id ? { id: selectData.id } : {}),
    }}
    validate={values => {
      const errors = {};
      // Supplier validation
  if (!values.restaurantId) {
    errors.restaurantId = 'restuarant is required';
  }
  if (!values.storageId) {
    errors.storageId = 'storage is required';
  }
  if (!values.receivingId) {
    errors.receivingId = 'receiving is required';
  }

      return errors;
    }}
    onSubmit={(values, actions) => {
      handleStorageSubmit(values,actions)

    }}
  >
    {({ handleSubmit, isSubmitting,values }) => {
      return (
      <Form onSubmit={handleSubmit}>
        <Row>
        <SingleSelect
            name="receivingId"
            label=" Receiving Product "
            placeholder="Select Receiving"
            className="w-100"
            disabled
            options={Receivingoptions||[]}
            // options={pricedataOption.filter(option => option.value !== 1) || []}
            variant="border" 
          />          
        <SingleSelect
            name="restaurantId"
            label="Choose kitchen"
            placeholder="Select kitchen"
            className="w-100"
            options={Kitchenoptions||[]}
            // options={pricedataOption.filter(option => option.value !== 1) || []}
            variant="border" 
          />     
          <FormikField name="quantity" type="number" label="Quantity" placeholder="Enter Quantity..." colWidth={12} />     
          <SingleSelect
            name="storageId"
            label="Choose storage"
            placeholder="Select Storage"
            className="w-100"
            options={storageItemlistOption||[]}
            // options={pricedataOption.filter(option => option.value !== 1) || []}
            variant="border" 
          />      
        </Row>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setStorageShow(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Move to storage
          </Button>
        </Modal.Footer>
      </Form>
    )}}
  </Formik>
      </Commonmodal>
        </div>
      )
    </>
  );
}
