import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import Tesseract from 'tesseract.js';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const UserOcrView = observer(() => {
  const [imageSrc, setImageSrc] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { t } = useTranslation();

  const handleFileChange = (e) => {
    setError('');
    setOcrText('');
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;

    // Basic file type validation
    if (!selectedFile.type.startsWith('image/') && !selectedFile.type.endsWith('.pdf')) {
      setError(t('User:InvalidFileType'));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
      setFile(selectedFile);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleConvertClick = async () => {
    if (!file) {
      setError(t('User:NoFileSelected'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: { text } } = await Tesseract.recognize(
        file,
        'uzb',
        // { logger: m => console.log(m) }
      );
      setOcrText(text);
    } catch (err) {
      setError(t('User:OcrError'));
    } finally {
      setLoading(false);
    }
  };

  const handleExtractText = () => {
    if (!ocrText) {
      toast.error("empty text", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
      return;
    }

    navigator.clipboard.writeText(ocrText).then(() => {
        toast.success("Сopy sucess", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
    }).catch((err) => {
      toast.error("error copu", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const handleDownloadText = async () => {
    if (!ocrText) {
      alert(t('User:NoTextToDownload'));
      return;
    }

    // Создаем новый документ
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun(ocrText),
              ],
            }),
          ],
        },
      ],
    });

    // Преобразуем документ в формат .docx
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ocr-text.docx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>{t("User:OCR:Title")}</title>
      </Helmet>
      <div className="ocr-page">
        <button className="upload-btn btn btn-outline-primary">
          {t("User:FileUpload")} (.jpg, .pdf)
          <input type="file" onChange={handleFileChange} disabled={loading} />
        </button>

        <button className="convert-btn btn btn-primary" onClick={handleConvertClick} disabled={loading || !file}>
          {t("User:OCR:Convert_button")}
        </button>

        {loading && <div>{t('User:Loading')}</div>}
        {error && <div className="error">{error}</div>}

        <div className="ocr-result">{ocrText}</div>

        <div className="btn-group">
          <button className="extract-btn btn btn-primary" onClick={handleExtractText} disabled={!ocrText}>
            {t("User:OCR:Copy_text")}
          </button>
          <button className="download-btn btn btn-primary" onClick={handleDownloadText} disabled={!ocrText}>
            {t("User:OCR:Save_as_file")}
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
});

export default UserOcrView;