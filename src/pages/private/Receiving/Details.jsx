import React from 'react'
import { useParams } from 'react-router-dom';
import { fetchReceivingproductItem } from '../../../api';
import { useFetchData } from '../../../services/useQueryFetchData';
import { formatDate } from '../../../utils/FormatDate';


export default function Details() {
    const { id } = useParams();
    const ReceivingId = parseInt(id)
    const { data: receivinglist} = useFetchData('receivingdetail',fetchReceivingproductItem,ReceivingId);
    console.log("receivinglist",receivinglist?.data)
  return (
    <div>
   <div className="main-content m-4">
  <div className="page-content">
    <div className="container-fluid ">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Product Detail</h4>
            <div className="page-title-right">
              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><a href="javascript: void(0);">Ecommerce</a></li>
                <li className="breadcrumb-item active">Product Detail</li>
              </ol> */}
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-xl-6">
                  <div className="product-detai-imgs">
                    <div className="row">
                      {/* <div className="col-md-2 col-sm-3 col-4">
                        <div className="nav flex-column nav-pills " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                          <a className="nav-link active" id="product-1-tab" data-bs-toggle="pill" href="#product-1" role="tab" aria-controls="product-1" aria-selected="true">
                            <img src="assets/images/product/img-7.png" alt className="img-fluid mx-auto d-block rounded" />
                          </a>
                          <a className="nav-link" id="product-2-tab" data-bs-toggle="pill" href="#product-2" role="tab" aria-controls="product-2" aria-selected="false">
                            <img src="assets/images/product/img-8.png" alt className="img-fluid mx-auto d-block rounded" />
                          </a>
                          <a className="nav-link" id="product-3-tab" data-bs-toggle="pill" href="#product-3" role="tab" aria-controls="product-3" aria-selected="false">
                            <img src="assets/images/product/img-7.png" alt className="img-fluid mx-auto d-block rounded" />
                          </a>
                          <a className="nav-link" id="product-4-tab" data-bs-toggle="pill" href="#product-4" role="tab" aria-controls="product-4" aria-selected="false">
                            <img src="assets/images/product/img-8.png" alt className="img-fluid mx-auto d-block rounded" />
                          </a>
                        </div>
                      </div> */}
                      <div className="col-md-7 offset-md-1 col-sm-9 col-8">
                        <div className="tab-content" id="v-pills-tabContent">
                          <div className="tab-pane fade show active" id="product-1" role="tabpanel" aria-labelledby="product-1-tab">
                            <div>
                              <img src="https://i.etsystatic.com/23005602/r/il/91dd92/2446042478/il_1588xN.2446042478_6n8l.jpg" alt className="img-fluid mx-auto d-block" />
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="mt-4 mt-xl-3">
                    {/* <a href="javascript: void(0);" className="text-primary">Headphone</a> */}
                    <h4 className="mt-1 mb-3 text-uppercase">{receivinglist?.data?.product?.name}</h4>
                    {/* <h5 className="mb-2">Production Date : <span className="text-muted me-2"><del>$240 USD</del></span> <b>$225 USD</b></h5>
                    <h5 className="mb-2">Expiry Date : <span className="text-muted me-2">asdas</span></h5>
                    <p className="text-muted mb-4">To achieve this, it would be necessary to have uniform grammar pronunciation and more common words If several languages coalesce</p> */}
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <div>
                          <p className="text-muted"><i className="bx bx-unlink font-size-16 align-middle text-primary me-1" /> Production Date : {receivinglist?.data?.productionDate?formatDate(receivinglist?.data?.productionDate):""}</p>
                          <p className="text-muted"><i className="bx bx-unlink font-size-16 align-middle text-primary me-1" /> Supplier : {receivinglist?.data?.supplier?.name}</p>
                          <p className="text-muted"><i className="bx bx-shape-triangle font-size-16 align-middle text-primary me-1" /> VehicleNumber : {receivinglist?.data?.vehicleNo}</p>
                          <p className="text-muted"><i className="bx bx-battery font-size-16 align-middle text-primary me-1" /> Quantity : {receivinglist?.data?.quantity} {receivinglist?.data?.uom}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <p className="text-muted"><i className="bx bx-user-voice font-size-16 align-middle text-primary me-1" /> Expiry Date : {formatDate(receivinglist?.data?.expiryDate)}</p>
                          <p className="text-muted"><i className="bx bx-user-voice font-size-16 align-middle text-primary me-1" /> vehicleTemperature : {(receivinglist?.data?.vehicleTemperature)}</p>
                          <p className="text-muted"><i className="bx bx-user-voice font-size-16 align-middle text-primary me-1" /> Food Temperature : {(receivinglist?.data?.temperature)}</p>
                          {/* <p className="text-muted"><i className="bx bx-cog font-size-16 align-middle text-primary me-1" /> {receivinglist?.data?.storagedItem?.storage?.name}</p> */}
                        </div>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
              {/* end row */}
              <div className="mt-5">
                <h5 className="mb-3">Specifications :</h5>
                <div className="table-responsive">
                  <table className="table mb-0 table-bordered">
                    <tbody>
                      <tr>
                        <th scope="row" style={{width: 400}}>Category</th>
                        <td>Headphone</td>
                      </tr>
                      <tr>
                        <th scope="row">Brand</th>
                        <td>JBL</td>
                      </tr>
                      <tr>
                        <th scope="row">Color</th>
                        <td>Black</td>
                      </tr>
                      <tr>
                        <th scope="row">Connectivity</th>
                        <td>Bluetooth</td>
                      </tr>
                      <tr>
                        <th scope="row">Warranty Summary</th>
                        <td>1 Year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* end Specifications */}
             
            </div>
          </div>
          {/* end card */}
        </div>
      </div>
      {/* end row */}
   
      {/* end row */}
    </div> {/* container-fluid */}
  </div>
  {/* End Page-content */}
  <footer className="footer">
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6">
          © Xtrace
        </div>
        <div className="col-sm-6">
          {/* <div className="text-sm-end d-none d-sm-block">
            Design &amp; Develop by Themesbrand
          </div> */}
        </div>
      </div>
    </div>
  </footer>
</div>

    </div>
  )
}
