
import React, { useContext, useState} from 'react';
import { ContextDatas } from '../../../services/Context.jsx';
import Receiving from '../Receiving/Receiving.jsx';
import Restaurant from '../Restaurant/Restaurant.jsx';
import Storage from '../Storage/storage.jsx';


export default function MainOpertaions() {

  const { mobileSide,search } = useContext(ContextDatas);
  const [activeTab,setActiveTab] = useState(0); 
  const [tabdata,SetTabData]=useState({
    kitchenId:""
  })

  const goToTabByName = (name) => {
    const index =  tabs.findIndex(tab => tab.name === name);
    if (index !== -1) {
      setActiveTab(index);
    }
  };
  const tabs = [
    {name :"Kitchen",component:<Restaurant tabdata={tabdata} settabdata={SetTabData} tabFunction={goToTabByName}/>},  
    {name :"Receving",component:<Receiving tabdata={tabdata}/>},
    {name :"Storage",component:<Storage tabdata={tabdata} settabdata={SetTabData} />},
]

console.log("tabdatatabdata",tabdata)
 
   
  return (
    <>
       (
        <div className={`contents ${mobileSide ? 'expanded' : ''}`}>
          <div className="demo2 mb-25 t-thead-bg">
            <div className="container-fluid">
              <div className="row mt-20">
                <div className="col-xxl-12 mb-25">
                  <div className="card border-0 px-25 py-3">

                {/* <div className="tab-buttons mb-3">
                  {tabs.map((tab, index) => (
                    <button
                      key={index}
                      className={`btn ${currentTab === index ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                      onClick={() => setCurrentTab(index)}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div> */}
                 <div className="tab-buttons mb-3">
                 <ul className="nav nav-tabs">
                 {tabs.map((tab, index) => (
                     <li className="nav-item"  role="presentation">
                     <button
                        type="button"
                         className={`nav-link tab-btn ${activeTab === index ? 'active' : ''}`}
                        onClick={() =>{ setActiveTab(index);
                            SetTabData({...tabdata,kitchenId:""})
                        }}
                    >
                        {tab.name}
                    </button>

                 </li>
                  ))}
                
                 </ul>
                 </div>
                  {tabs[activeTab]?.component}

                {/* Tab Content */}
                

           
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      )
    </>
  );
}



