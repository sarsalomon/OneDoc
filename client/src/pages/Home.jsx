import { Button, Modal, Form, Container, Navbar, Nav, Row, Col, Card, Dropdown } from 'react-bootstrap';
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../main";
import { signIn } from "../function/http/UserApi";
import { ADMIN_DASHBOARD_ROUTE, USER_DASHBOARD_ROUTE } from "../utils/consts";
import { ToastContainer, toast } from "react-toastify";
import { ReactTyped } from "react-typed";

import { BsTelephone } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

import Logo_Light from "../assets/img/logo_light.webp";
import Logo_Dark from "../assets/img/logo_dark.webp";
import Smartphone from "../assets/img/smartphone.webp";

const Home = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { t, i18n } = useTranslation();
    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user.user.role == "User") {
      navigate(USER_DASHBOARD_ROUTE);
    } else if (user.user.role == "Admin") {
      navigate(ADMIN_DASHBOARD_ROUTE);
    }

    if (localStorage.getItem("Language") === null || localStorage.getItem("Language") === undefined || localStorage.getItem("Language") === "" ) {
      localStorage.setItem("Language", "uz");
    } else {
      i18n.changeLanguage(localStorage.getItem("Language"));
    }
  }, []);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("Language", language);
  };


  const click = async () => {
    try {
      let data;

      data = await signIn(phone, password);

      if (phone.length != 9) {
        toast.error("login  isze"),
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          };
      }

      if (data) {
        user.setUser(data);
        user.setIsAuth(true);
        if (data.role === "Admin") {
          navigate(ADMIN_DASHBOARD_ROUTE);
        } else if (data.role === "User") {
          navigate(USER_DASHBOARD_ROUTE);
        }
      }
    } catch (e) {
      toast.error(t(`${e.response.data.message}`), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        click();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [phone]);

  return (
    <>
      <header className="Navbar justify-content-space-between">
        <div className="topNavbar d-flex align-items-center">
          <Container
            fluid
            className="d-flex align-items-center justify-content-md-between"
          >
            <div className="d-flex align-items-center">
              <BsTelephone />
              <span>Sotuv bo’limi: +998 78 113 70 99</span>
            </div>
            <div className="d-flex align-items-center">
              <MdSupportAgent />
              <span>
                Texnik qoʻllab-quvvatlash va buxgalteriya: +998 78 113 70 99
              </span>
            </div>
            <div className="d-flex align-items-center">
              <IoMdTime />
              <span>Har kuni soat 09:00 dan 20:00 gacha</span>
            </div>
            <div>Qo'ng'iroq qilishni so'rash</div>
          </Container>
        </div>
        <Navbar
          collapseOnSelect
          expand="lg"
          className="bg-body-tertiary bottomNavbar"
        >
          <Container fluid className="mx-3">
            {/* Left-aligned items */}
            <Navbar.Brand href="#home" className="d-flex align-items-center">
              <img
                alt="One Doc "
                src={Logo_Light}
                width="40"
                height="40"
                className="d-inline-block align-top"
              />
              <span className="ms-2">One Doc</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {/* <Nav className="me-auto">
            <Nav.Link href="#">Left Item</Nav.Link>
          </Nav> */}

              <Nav className="mx-auto">
                <Button className="Demo_Button">
                  {t("General:Home:Navbar:demo_button")}
                </Button>
              </Nav>

              {/* Right-aligned items */}
              <Nav className="ml-auto d-flex align-items-center">
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  className="Theme-Switcher"
                />
                <Dropdown className="mx-2">
                  <Dropdown.Toggle className="Language_Switcher">
                    {localStorage.getItem("Language") === "uz"
                      ? "O'zbek"
                      : localStorage.getItem("Language") === "ru"
                      ? "Русский"
                      : localStorage.getItem("Language") === "kr"
                      ? "Ўзбек"
                      : localStorage.getItem("Language") === "qr"
                      ? "Qaraqalpaq"
                      : localStorage.getItem("Language") === "qrkr"
                      ? "Қарақалпақ"
                      : "Language"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => changeLanguage("ru")}>
                      Русский
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => changeLanguage("kr")}>
                      Ўзбек
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => changeLanguage("qr")}>
                      Qaraqalpaq
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => changeLanguage("qrkr")}>
                      Қарақалпақ
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="primary" onClick={handleShow}>
                  {t("General:Home:Navbar:login")}
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main>
        <section className="hero">
          <Container>
            <Row className="justify-content-between align-items-center">
              <Col lg={7}>
                <div className="typedText">
                  <ReactTyped
                    strings={[
                      t("General:Home:Hero:text_one"),
                      t("General:Home:Hero:text_two"),
                      t("General:Home:Hero:text_three")
                    ]}
                    typeSpeed={30}
                    backSpeed={60}
                    loop
                  />
                </div>

                <p className="Slogan">
                  Mijozlar, xodimlar va pudratchilar bilan shartnomalarni bir
                  necha marta bosish orqali telefon orqali imzolang.
                </p>
                <p />
                <Button className="Demo_Button">{t("General:Home:Navbar:demo_button")}</Button>
              </Col>
              <Col lg={4}>
                <img src={Smartphone} alt="Smartphone" className="smartphone" />
                <div className="SmartphoneShadow"></div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="Information">
          <Container>
            <Row>
              <Col lg={3} className="Information_text h-max">
                ISTALGAN SHARTNOMANI QULAY YARATING VA QULAY TASDIQLANG
              </Col>
              <Col lg={3} className="Information_subtext">
                <span>1000+</span>
                <p>JAMI FOYDALANUVCHILAR SONI</p>
              </Col>
              <Col lg={3} className="Information_subtext">
                <span>1000+</span>
                <p>PLATFORMADA SHARTNOMA NAMULARI</p>
              </Col>
              <Col lg={3} className="Information_subtext">
                <span>50+</span>
                <span>PLATFORMADA MAVJUD ARIZA NAMULARI</span>
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Row>
              <span>Biz sizga nega kerakmiz</span>
              <span>Jismoniy shaxslar uchun barcha xizmatlar bepul</span>
            </Row>
            <Row>
              <Col lg={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>Bepul Shartnome</Card.Title>
                    <Card.Text>DWNJDWNJD W DW DWI W D WJ IDWJD</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={1}></Col>
              <Col lg={3}>
                <span>1000+</span>
                <span>PLATFORMADA SHARTNOMA NAMULARI</span>
              </Col>
              <Col lg={1}></Col>
              <Col lg={3}>
                <span>1000+</span>
                <span>PLATFORMADA SHARTNOMA NAMULARI</span>
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Row>
              <span>IMZOLASH USULLAR</span>
            </Row>
            <Row>
              <Col lg={12}>
                <ul>
                  <li>
                    <div>
                      <span></span>
                      <span>dawkdow</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span></span>
                      <span>dawkdow</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span></span>
                      <span>dawkdow</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span></span>
                      <span>dawkdow</span>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Row>
              <span>Bizning mijozlarimiz</span>
            </Row>
            <Row>
              <Col lg={3}>1</Col>
              <Col lg={3}>1</Col>
              <Col lg={3}>1</Col>
              <Col lg={3}>1</Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Row>
              <span>Mikro va kichik biznes uchun tariflar</span>
              <span>O'zingizga mos keladigan tarifni tanlang</span>
              <span>Oy yil</span>
            </Row>
            <Row>
              <Col lg={3}>1</Col>
              <Col lg={3}>1</Col>
              <Col lg={3}>1</Col>
              <Col lg={3}>1</Col>
            </Row>
          </Container>
        </section>
      </main>

      <footer>footer</footer>

      <Modal
        className="py-4"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <div className="d-inline align-items-center justify-content-center">
            <Modal.Title>{t("General:Auth:pageTitle")}</Modal.Title>
            <span>
            {t("General:Auth:notRegister")} <Link to="/register">{t("General:Auth:register")}</Link>
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{t("General:Auth:phone")}</Form.Label>
              <Form.Control
                placeholder={t("General:Auth:phonePlaceholder")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{t("General:Auth:password")}</Form.Label>
              <Form.Control
                placeholder={t("General:Auth:passwordPlaceholder")}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Form.Check type={"checkbox"} label={t("General:Auth:remember")} />
              <span>{t("General:Auth:forget")}</span>
            </div>
            <div className="d-grid gap-1">
              <Button
                variant="success"
                size="lg"
                className="mt-3 align-self-end"
                onClick={click}
              >
                {t("General:Auth:button")}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
});

export default Home;
