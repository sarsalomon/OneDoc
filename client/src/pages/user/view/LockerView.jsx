import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';

import { getDatasContractById } from '../../../function/http/ContractAPI';
import { Context } from '../../../main';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const UserLockerView = observer(() => {
  const { user } = useContext(Context);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleFileChange = (e) => {

    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // Basic file type validation
    if (
      !selectedFile.type.endsWith(".pdf")
    ) {
      return;
    }
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
      setFile(selectedFile);
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <>
      <Helmet>
        <title>{t("User:Locker:Title")}</title>
      </Helmet>
    <div className="locker-container locker-page">
      <h3 className="locker-title">{t("User:Locker:PageTitle")}</h3>

      <button className="upload-btn btn btn-outline-primary">
        {t("User:FileUploads")} (.pdf)
        <input type="file" accept="application/pdf" onChange={handleFileChange} disabled={loading} />
      </button>

      <div className="locker-form-container">
        <h4 className="locker-form-title">{t("User:Locker:Text_one")}</h4>
        <h5 className="locker-form-label">{t("User:Locker:Text_two")}</h5>
        
        <input className="locker-input" type="text" placeholder={t("User:Locker:Password_number_input")} />
        <input className="locker-input" type="text" placeholder={t("User:Locker:RePassword_number_input")} />

        <button className="locker-btn btn btn-primary">{t("User:Locker:Block_button")}</button>
      </div>
    </div>
    </>
  );
});

export default UserLockerView;