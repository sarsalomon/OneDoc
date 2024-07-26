import { Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getDatasContractById } from '../../../function/http/ContractAPI';
import { Context } from '../../../main';
import { useTranslation } from 'react-i18next';

import { RiFileExcel2Line } from "react-icons/ri";

const UserContractView = observer(() => {
  const { user } = useContext(Context);
  const [key, setKey] = useState('pay');
  const [contracts, setContracts] = useState([]);
	const { t } = useTranslation();

  useEffect(() => {
    getDatasContractById(user._user.id).then(data => {
      setContracts(data);
    });
}, []);

  return (
    <>
      <Helmet>
        <title>{t("User:Locker:Title")}</title>
      </Helmet>
    <div>
      <div className="row align-items-center top-bar">
            <div className="col-auto create-btn-wrapper">
              <button className="btn btn-outline-primary">
                <svg className='plus-icon' width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_348_21)">
                    <path d="M2.7737 18.2683C1.69055 18.2683 0.812487 19.1463 0.8125 20.2295C0.812487 21.3127 1.69055 22.1907 2.7737 22.1907L18.2683 22.1906L18.2684 37.6853C18.2682 38.7684 19.1464 39.6464 20.2295 39.6465C21.3127 39.6465 22.1907 38.7685 22.1907 37.6853V22.1907L37.6853 22.1906C38.7684 22.1907 39.6465 21.3127 39.6465 20.2295C39.6465 19.1463 38.7684 18.2682 37.6853 18.2684L22.1907 18.2682V2.7737C22.1907 1.69054 21.3127 0.812472 20.2295 0.8125C19.1464 0.812514 18.2682 1.69058 18.2684 2.77361L18.2683 18.2684L2.7737 18.2683Z" />
                  </g>

                  <defs>
                    <clipPath id="clip0_348_21">
                      <rect width="40" height="40" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>

                <span>{t("User:Create_button")}</span>
              </button>
            </div>

            <div className="col folders">
              <div className="folder-group" role="group">
                <button type="button" className="folder">
                  <svg className="folder-icon" width="53" height="43" viewBox="0 0 53 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M47.7 5.375H26.5L22.7529 1.57487C21.7592 0.567062 20.4103 0 19.0058 0H5.3C2.385 0 0 2.41875 0 5.375V37.625C0 40.5812 2.385 43 5.3 43H47.7C50.615 43 53 40.5812 53 37.625V10.75C53 7.79375 50.615 5.375 47.7 5.375Z" />
                  </svg>
                  <span>{t("User:Ambulance_text")}</span>
                </button>
                
                <button type="button" className="folder">
                  <svg className="folder-icon" width="53" height="43" viewBox="0 0 53 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M47.7 5.375H26.5L22.7529 1.57487C21.7592 0.567062 20.4103 0 19.0058 0H5.3C2.385 0 0 2.41875 0 5.375V37.625C0 40.5812 2.385 43 5.3 43H47.7C50.615 43 53 40.5812 53 37.625V10.75C53 7.79375 50.615 5.375 47.7 5.375Z" />
                  </svg>
                  <span>{t("User:Service_text")}</span>
                </button>

                <button type="button" className="folder">
                  <svg className="folder-icon" width="53" height="43" viewBox="0 0 53 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M47.7 5.375H26.5L22.7529 1.57487C21.7592 0.567062 20.4103 0 19.0058 0H5.3C2.385 0 0 2.41875 0 5.375V37.625C0 40.5812 2.385 43 5.3 43H47.7C50.615 43 53 40.5812 53 37.625V10.75C53 7.79375 50.615 5.375 47.7 5.375Z" />
                  </svg>
                  <span>{t("User:Delevery_text")}</span>
                </button>
                
                <button type="button" className="folder">
                  <svg className="folder-icon" width="53" height="43" viewBox="0 0 53 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M47.7 5.375H26.5L22.7529 1.57487C21.7592 0.567062 20.4103 0 19.0058 0H5.3C2.385 0 0 2.41875 0 5.375V37.625C0 40.5812 2.385 43 5.3 43H47.7C50.615 43 53 40.5812 53 37.625V10.75C53 7.79375 50.615 5.375 47.7 5.375Z" />
                  </svg>
                  <span>{t("User:Work_text")}</span>
                </button>
{/* 
                <button type="button" className="folder">
                  <svg className="folder-icon" width="53" height="43" viewBox="0 0 53 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M47.7 5.375H26.5L22.7529 1.57487C21.7592 0.567062 20.4103 0 19.0058 0H5.3C2.385 0 0 2.41875 0 5.375V37.625C0 40.5812 2.385 43 5.3 43H47.7C50.615 43 53 40.5812 53 37.625V10.75C53 7.79375 50.615 5.375 47.7 5.375Z" />
                  </svg>
                  <span>Xorijga ishga yuborish</span>
                </button> */}
              </div>
            </div>
            
            <div className="col-auto search-wrapper">
              <div className="input-group">
                <input type="text" className="form-control" placeholder={t("User:Search_text")} />
                <button className="btn btn-outline-secondary" type="button">
                  {/* <FaSearch /> */}
                </button>
              </div>
            </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col" rowSpan="2">No</th>
            <th scope="col" rowSpan="2">{t("shartnomalar-table-title-1")}</th>
            <th scope="col" colSpan="3">{t("shartnomalar-table-title-2")}</th>
            <th scope="col" colSpan="2">{t("shartnomalar-table-title-3")}</th>
            <th scope="col" rowSpan="2">{t("shartnomalar-table-title-4")}</th>
          </tr>
          <tr>
            <th scope="col">{t("shartnomalar-table-title-5")}</th>
            <th scope="col">{t("shartnomalar-table-title-6")}</th>
            <th scope="col">{t("shartnomalar-table-title-7")}</th>
            <th scope="col">{t("shartnomalar-table-title-8")}</th>
            <th scope="col">{t("shartnomalar-table-title-9")}</th>
          </tr>
        </thead>
        <tbody>
          {
            contracts.map((contract, index)=>
                <tr key={contract._id}>
                    <td>{index + 1}</td>
                    <td>{contract.title}</td>
                    <td>{contract.status}</td>
                    {/* <td><Button variant='danger' onClick={() => deleteDatas(group.id)}>{t('Admin:Message:Delete')}</Button></td> */}
                </tr>
            )
          }
        </tbody>
      </Table>

      <button className="excel-button">
          <RiFileExcel2Line />
          Excel faylni yuklab olish
      </button>

    </div>

    </>
  );
});

export default UserContractView;