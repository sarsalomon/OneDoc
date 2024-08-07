import { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Context } from "../../../../main";
import { IoArrowBack } from "react-icons/io5";
import { fetchDataTemplate, getDataTemplate } from "../../../../function/http/TemplateAPI";
import { getUser } from "../../../../function/http/UserApi";
import '../../../../index.css';

const UserContractViewComponent = observer(({ changeStateContract }) => {
  const { user } = useContext(Context);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);

  const [selectedTemplate, setSelectedTemplate] = useState("");

  useEffect(() => {
      fetchDataTemplate()
        .then(data => {
          const parsedTemplates = data.map(template => ({
            ...template,
            title: JSON.parse(template.title) // Parse the JSON string
          }));
          setTemplates(parsedTemplates);
        })
        .catch(error => {
          console.error("Error fetching contract template:", error);
        });
  }, []);

  useEffect(() => {
    if (!selectedTemplate) {
      getDataTemplate(selectedTemplate)
      .then(data => {
        console.log(data)
      })
      .catch(error => {
          console.error("Error fetching contract template:", error);
        });
    }
  }, []);

return (
    <>
      <Helmet>
        <title>{t("User:Contract:Component:PageTitle")}</title>
      </Helmet>
      <Container fluid>
        <Row className="mt-2">
          <Col xxl={1} xl={1} lg={1} md={1} sm={1} className="d-flex justify-content-center align-items-center"
            onClick={() => changeStateContract("view")}
          >
            <IoArrowBack style={{ fontSize: "24px" }} />
            {t("Orqaga qaytish")}
          </Col>
          <Col xxl={2} xl={2} lg={2} md={2} sm={2}>
            <Form.Select value={selectedTemplate} onChange={() => setSelectedTemplate(event.target.value)}>
              <option value="">
                {t("Contract tanglang")}
              </option>
              {templates.map((template) => (
                <option key={template._id} value={template._id}>
                  {template?.title[localStorage?.getItem('Language')]}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={6} sm={6}></Col>
        </Row>
        <Row>
          {/* <Col xxl={4} xl={4} lg={4} md={4} sm={4} dangerouslySetInnerHTML={{ __html: contractFormContent }}></Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={8} dangerouslySetInnerHTML={{ __html: contractContent }}></Col> */}
        </Row>
      </Container>
    </>
  );
});

export default UserContractViewComponent;
