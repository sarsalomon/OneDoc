import { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { Context } from "../../../../main";

import { IoArrowBack } from "react-icons/io5";

import '../../../../index.css';
import ContractOne from "../../components/contracts/ContractOne";

const UserContractViewComponent = observer(() => {
  const { user } = useContext(Context);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedTemplate, setSelectedTemplate] = useState("");

  const templates = [
    { id: "1", Title: {uz: "Pullik", ru: "Пуллик"} },
    { id: "2", Title: {uz: "Pullik", ru: "Пуллик"} }
  ];

  return (
    <>
      <Helmet>
        <title>{t("User:Contract:Component:PageTitle")}</title>
      </Helmet>
      <Container fluid>
        <Row className="mt-2">
          <Col xxl={1} xl={1} lg={1} md={1} sm={1} className="d-flex justify-content-center align-items-center"
            onClick={() => localStorage.setItem('Location', 'ContractView')}
          >
            <IoArrowBack style={{ fontSize: "24px" }} />
            {t("Orqaga qaytish")}
          </Col>
          <Col xxl={2} xl={2} lg={2} md={2} sm={2}>
            <Form.Select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
              <option value="">
                {t("Contract tanglang")}
              </option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template?.Title[localStorage?.getItem('Language')]}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={6} sm={6}>
          
          </Col>
        </Row>
        <Row>
              {selectedTemplate == 1 ?
                <ContractOne/>
                :
                <div></div> 
              }
        </Row>
      </Container>
    </>
  );
});

export default UserContractViewComponent;
