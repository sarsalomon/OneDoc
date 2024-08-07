import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';

import { getDatasContractById } from '../../../function/http/ContractAPI';
import { Context } from '../../../main';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const UserLockerView = observer(() => {
  const { user } = useContext(Context);
  const [key, setKey] = useState('pay');
  
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
    <div className="locker-container locker-page">
      <h3 className="locker-title">{t("User:Locker:PageTitle")}</h3>

      <button className="upload-btn btn btn-outline-primary">{t("User:FileUploads")}</button>

      <div className="locker-form-container">
        <h4 className="locker-form-title">{t("User:Locker:Text_one")}</h4>
        <h5 className="locker-form-label">{t("User:Locker:Text_two")}</h5>
        
        <input className="locker-input" type="text" placeholder={t("User:Locker:Password_number_input")} />
        <input className="locker-input" type="text" placeholder={t("User:Locker:RePassword_number_input")} />

        <button className="locker-btn btn btn-primary">{t("User:Locker:Block_button")}</button>

        <div className="locker-phone-container">
          <input className="locker-input" type="text" placeholder={t("User:Locker:Phone_number_input")} />
          <button className="send-btn btn btn-primary">{t("User:Locker:Share_button")}</button>
        </div>
      </div>
    </div>
    </>
  );
});

export default UserLockerView;