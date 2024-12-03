import React, { useContext } from "react";
import { ContextDatas } from "../../../services/Context";

function PageDashboard() {
  const { mobileSide, setmobileSide } = useContext(ContextDatas);

  return (
    <div className={`contents  ${mobileSide ? "expanded" : ""}`}>
      <div className="demo4 crm">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-lg-12">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">Demo 4</h4>
                <div className="breadcrumb-action justify-content-center flex-wrap">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="#">
                          <i className="uil uil-estate" />
                          Dashboard
                        </a>
                      </li>
                    
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            
            <div className="col-xxl-4 mb-25">
              <div className="row">
                <div className="col-md-6">
                  <div className="overview-content products-awards pt-20 pb-20 text-center radius-xl">
                    <div className="d-inline-flex flex-column align-items-center justify-content-center">
                      <div className="revenue-chart-box__Icon order-bg-opacity-primary color-primary me-0">
                        <i className="uil uil-briefcase-alt" />
                      </div>
                      <div className="d-flex align-items-start flex-wrap">
                        <div>
                          <p className="mb-1 mb-0 color-gray">
                            Total Products{""}
                          </p>
                          <h1>21K</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="overview-content products-awards pt-20 pb-20 text-center radius-xl">
                    <div className="d-inline-flex flex-column align-items-center justify-content-center">
                      <div className="revenue-chart-box__Icon order-bg-opacity-info color-info me-0">
                        <i className="uil uil-award" />
                      </div>
                      <div className="d-flex align-items-start flex-wrap">
                        <div>
                          <p className="mb-1 mb-0 color-gray">Total Restuarants</p>
                          <h1>15K</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-12 mt-25">
                  <div className="card banner-feature banner-feature--7 position-relative border-0 mb-0">
                    <div className="d-flex justify-content-center">
                      <div className="card-body py-25 px-30">
                        <div className="div">
                          <h4 className="banner-feature__heading">
                            Subscribe to our newsletter
                          </h4>
                          <p className="banner-feature__para ">
                            We notify you once any post is published
                          </p>
                          <button
                            type="button"
                            className="btn btn-primary mt-15 btn-md"
                          >
                            Subscribe
                          </button>
                        </div>
                        <div className="banner-feature__shape position-absolute">
                          <img src="/img/3d-message.png" alt="/img" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
           
           {/* 
            <div className="col-xxl-8">
              <div className="row">
                <div className="col-md-6 mb-25">
                  <div className="feature-profile h-100">
                    <div className="feature-profile__bg">
                      <img src="/img/profile_bg.png" alt />
                    </div>
                    <div className="feature-profile_content">
                      <img src="/img/profile_bg_2.png" alt />
                      <h6>Robert Clinton</h6>
                      <p>Best Seller of the last month</p>
                      <ul className="profile-feature__social">
                        <li>
                          <a href="#" className="bg-facebook">
                            <i className="lab la-facebook-f" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="bg-twitter">
                            <i className="lab la-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="bg-primary">
                            <i className="lab la-dribbble" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-25">
                  <div className="card border-0 h-100">
                    <div className="card-header border-0">
                      <h6>Team Members </h6>
                      <div className="card-extra">
                        <div className="dropdown dropleft">
                          <a
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <img
                              src="/img/svg/more-horizontal.svg"
                              alt="more-horizontal"
                              className="svg"
                            />
                          </a>
                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">
                              Action
                            </a>
                            <a className="dropdown-item" href="#">
                              Another action
                            </a>
                            <a className="dropdown-item" href="#">
                              Something else here
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body pb-30 pt-1">
                      <div className="team-members">
                        <ul>
                          <li>
                            <div className="team-members__left">
                              <img
                                className="rounded-circle"
                                src="/img/team01.png"
                                alt
                              />
                              <div className="team-members__title">
                                <h6>Shane Watson</h6>
                              </div>
                            </div>
                            <div className="team-members__middle">
                              <div className="team-members__title--online d-flex align-items-center">
                                <span className="badge-dot dot-success" />
                                Online
                              </div>
                            </div>
                            <div className="team-member__right">
                              <div className="team-member__add">
                                <button type="button">add</button>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="team-members__left">
                              <img
                                className="rounded-circle"
                                src="/img/team02.png"
                                alt
                              />
                              <div className="team-members__title">
                                <h6>Chris Dohan</h6>
                              </div>
                            </div>
                            <div className="team-members__middle">
                              <div className="team-members__title--online d-flex align-items-center">
                                <span className="badge-dot dot-success" />
                                Online
                              </div>
                            </div>
                            <div className="team-member__right">
                              <div className="team-member__add">
                                <button type="button">add</button>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="team-members__left">
                              <img
                                className="rounded-circle"
                                src="/img/team03.png"
                                alt
                              />
                              <div className="team-members__title">
                                <h6>Robert Clinton</h6>
                              </div>
                            </div>
                            <div className="team-members__middle">
                              <div className="team-members__title--online d-flex align-items-center">
                                <span className="badge-dot dot-success" />
                                Online
                              </div>
                            </div>
                            <div className="team-member__right">
                              <div className="team-member__add">
                                <button type="button">add</button>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="team-members__left">
                              <img
                                className="rounded-circle"
                                src="/img/team04.png"
                                alt
                              />
                              <div className="team-members__title">
                                <h6>Daniel White</h6>
                              </div>
                            </div>
                            <div className="team-members__middle">
                              <div className="team-members__title--online d-flex align-items-center">
                                <span className="badge-dot dot-success" />
                                Online
                              </div>
                            </div>
                            <div className="team-member__right">
                              <div className="team-member__add">
                                <button type="button">add</button>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="team-members__left">
                              <img
                                className="rounded-circle"
                                src="/img/team1.png"
                                alt
                              />
                              <div className="team-members__title">
                                <h6>Black Smith</h6>
                              </div>
                            </div>
                            <div className="team-members__middle">
                              <div className="team-members__title--online d-flex align-items-center">
                                <span className="badge-dot dot-success" />
                                Online
                              </div>
                            </div>
                            <div className="team-member__right">
                              <div className="team-member__add">
                                <button type="button">add</button>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 mb-25">
                  <div className="card border-0 px-25 h-100">
                    <div className="card-header px-0 border-0">
                      <h6>Social Media Traffic</h6>
                      <div className="dropdown dropleft">
                        <a
                          href="#"
                          role="button"
                          id="Today"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <img
                            src="/img/svg/more-horizontal.svg"
                            alt="more-horizontal"
                            className="svg"
                          />
                        </a>
                        <div className="dropdown-menu" aria-labelledby="Today">
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <div className="selling-table-wrap selling-table-wrap--source">
                        <div className="table-responsive">
                          <table className="table table--default table-borderless">
                            <thead>
                              <tr>
                                <th>Social</th>
                                <th>user</th>
                                <th>session</th>
                                <th>bounce rate</th>
                                <th className="text-end">
                                  Avg. session duration
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="selling-product-img d-flex align-items-center">
                                    <div className="selling-product-img-wrapper order-bg-opacity-primary color-primary">
                                      <i className="uil uil-facebook-f" />
                                    </div>
                                    <span>Facebook</span>
                                  </div>
                                </td>
                                <td>3,397</td>
                                <td>422</td>
                                <td>2,584</td>
                                <td>00:01:05</td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="selling-product-img d-flex align-items-center">
                                    <div className="selling-product-img-wrapper order-bg-opacity-secondary color-secondary">
                                      <i className="uil uil-twitter" />
                                    </div>
                                    <span>Twitter</span>
                                  </div>
                                </td>
                                <td>3,397</td>
                                <td>422</td>
                                <td>2,584</td>
                                <td>00:01:05</td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="selling-product-img d-flex align-items-center">
                                    <div className="selling-product-img-wrapper order-bg-opacity-info color-info">
                                      <i className="uil uil-instagram" />
                                    </div>
                                    <span>Instagram</span>
                                  </div>
                                </td>
                                <td>3,397</td>
                                <td>422</td>
                                <td>2,584</td>
                                <td>00:01:05</td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="selling-product-img d-flex align-items-center">
                                    <div className="selling-product-img-wrapper order-bg-opacity-danger color-danger">
                                      <i className="uil uil-youtube" />
                                    </div>
                                    <span>Youtube</span>
                                  </div>
                                </td>
                                <td>3,397</td>
                                <td>422</td>
                                <td>2,584</td>
                                <td>00:01:05</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageDashboard;
