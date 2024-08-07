import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';

import { getDatasContractById } from '../../../function/http/ContractAPI';
import { Context } from '../../../main';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { addDataLocker } from '../../../function/http/LockerAPI';

const UserLockerView = observer(() => {
  const { user } = useContext(Context);
  const { t } = useTranslation();
  
  const [file, setFile] = useState(null)
  const [password, setPassword] = useState(null)
  const [Repassword, setRePassword] = useState(null)

  useEffect(() => {
    getDatasContractById(user._user.id).then(data => {
      setContracts(data);
    });
  }, []);


  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const LockFile = () => {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);
    addDataLocker(formData);
    
  }

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        LockFile();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("User:Locker:Title")}</title>
      </Helmet>
    <div className="locker-container locker-page">
      <h3 className="locker-title">{t("User:Locker:PageTitle")}</h3>

      <button className="upload-btn btn btn-outline-primary">
        {t("User:FileUploads")} (.pdf)
        <input type="file" onChange={selectFile}/>
      </button>

      <div className="locker-form-container">
        <h4 className="locker-form-title">{t("User:Locker:Text_one")}</h4>
        <h5 className="locker-form-label">{t("User:Locker:Text_two")}</h5>
        
        <input className="locker-input" type="text" placeholder={t("User:Locker:Password_number_input")} />
        <input className="locker-input" type="text" placeholder={t("User:Locker:RePassword_number_input")} />

        <button className="locker-btn btn btn-primary" onClick={LockFile}>{t("User:Locker:Block_button")}</button>

        {/* <div className="locker-phone-container">
          <input className="locker-input" type="text" placeholder={t("User:Locker:Phone_number_input")} />
          <button className="send-btn btn btn-primary">{t("User:Locker:Share_button")}</button>
        </div> */}
      </div>
    </div>
    <ToastContainer />
    </>
  );
});

export default UserLockerView;