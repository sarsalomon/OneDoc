import { Button, Modal, Form, Container, Navbar, Nav, Row, Col, Card, Carousel, Tabs, Tab } from 'react-bootstrap';
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../main";
import { signIn } from "../function/http/UserApi";
import { ADMIN_DASHBOARD_ROUTE, USER_DASHBOARD_ROUTE } from "../utils/consts";
import { ToastContainer, toast } from "react-toastify";
import { ReactTyped } from "react-typed";
import { Swiper, SwiperSlide } from 'swiper/react';

import { BsTelephone }     from "react-icons/bs";
import { MdSupportAgent }  from "react-icons/md";
import { IoMdTime }        from "react-icons/io";
import { LiaSmsSolid }     from "react-icons/lia";
import { PiSignatureThin } from "react-icons/pi";
import { FaTelegramPlane } from "react-icons/fa";
import { TbFaceId }        from "react-icons/tb";

import Logo_Light          from "../assets/img/logo_light.webp";
import Logo_Dark           from "../assets/img/logo_dark.webp";
import Smartphone          from "../assets/img/smartphone.png";

import Carousel_left_icon  from "../assets/img/left-arrow.svg";
import Carousel_right_icon from "../assets/img/right-arrow.svg";

import Youtube_icon  	   from "../assets/img/youtube-icon.svg";
import Instagram_icon	   from "../assets/img/instagram-icon.svg";

import Contract_img        from "../assets/img/tabs/shartnomalar.jpg";
import Appeal_img          from "../assets/img/tabs/arizalar.jpg";
import Corperation_img     from "../assets/img/tabs/korparativ-hujjat.jpg";
import Qr_img              from "../assets/img/tabs/qr.jpg";
import Signature_img       from "../assets/img/tabs/imzo.jpg";
import Sms_img             from "../assets/img/tabs/sms.jpg";
import Ocr_img             from "../assets/img/tabs/ocr.jpg";

import Hotel_img           from "../assets/img/hotel.svg";
import Edu_img             from "../assets/img/edu.svg";
import Building_img        from "../assets/img/building.svg";
import Bank_img            from "../assets/img/bank.svg";

import Signature_icon_img  from "../assets/img/faksimile-icon.svg";
import Phone_icon_img      from "../assets/img/phone-icon.svg";
import Telegram_icon_img   from "../assets/img/telegram-icon.svg";
import Face_icon_img       from "../assets/img/face-icon.svg";
import ESignature_icon_img from "../assets/img/eimzo-icon.svg";


const Home = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { t, i18n } = useTranslation();
    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

	const [isOpen, setIsOpen] = useState(false);

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
        } else if (data.role === "User" || data.role === "Lawyer") {
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



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const languages = [
    { code: "uz", label: "O'zbek" },
    { code: "ru", label: "Русский" },
    { code: "kr", label: "Ўзбек" },
    { code: "qr", label: "Qaraqalpaq" },
    { code: "qrkr", label: "Қарақалпақ" }
  ];

  return (
    <>
<div>
				<header>
					{/* <div className="small-header">
						<p>Biz bilan bog'laning: +998 91 797 23 85</p>
					</div> */}

					<nav>
						<a href="/" className="logo">
							<img src={Logo_Light} alt="1doc.uz Logo" />
							<h1>1doc.uz</h1>
						</a>
						
						<div className="dropdown" onMouseLeave={toggleDropdown} onMouseEnter={toggleDropdown} >
							<button className="dropbtn">
								<span>
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
                </span>
								{/* <FontAwesomeIcon icon={faChevronDown} className={`icon ${isOpen ? 'open' : ''}`} /> */}
							</button>
							{isOpen && (
								<div className="dropdown-content">
									{languages.map((lang) => 
										lang.code !== localStorage.getItem("Language") ? (
										<a key={lang.code} onClick={() => changeLanguage(lang.code)}>
											{lang.label}
										</a>
										) : null
									)}
								</div>
							)}
						</div>

						<div className="btns d-flex">
							<button className="btn btn-primary start-btn">{t('General:Home:Navbar:Demo_button')}</button>
							<button className="btn btn-outline-primary login-btn" onClick={handleShow}>{t('General:Home:Navbar:Login')}</button>
						</div>
					</nav>

					<div className="header-content">

              <ReactTyped
              			className="header-title"
                    strings={[
                      t("General:Home:Header:text_one"),
                      t("General:Home:Header:text_two"),
                      t("General:Home:Header:text_three")
                    ]}
                    typeSpeed={30}
                    backSpeed={60}
                    loop
                  />
						<p>{t('General:Home:Header:Header_description')}</p>
						<div className="btns d-flex">
							<a className="btn btn-primary prices-btn">{t('General:Home:Navbar:Demo_button')}</a>
						</div>
					</div>

					<img src={Smartphone} className="tel" />
				</header>

				<section className="tabs">
					<Tabs defaultActiveKey="shartnomalar" id="uncontrolled-tab-example" className="justify-content-center">
						<Tab eventKey="shartnomalar" title={t("General:Home:Tabs:Contract")}>
							<div className="tab-content mt-3">
									<Row>
											<Col md={5}>
												<img src={Contract_img} className="img-fluid" alt={t("General:Home:Tabs:Contract")} />
											</Col>
											<Col md={6}>
												<ul className="feature-list list-unstyled">
													<li>{t("General:Home:Tabs:Contract_text_one")}</li>
													<li>{t("General:Home:Tabs:Contract_text_two")}</li>
													<li>{t("General:Home:Tabs:Contract_text_three")}</li>
													<li>{t("General:Home:Tabs:Contract_text_four")}</li>
												</ul>
											</Col>
									</Row>
								</div>
						</Tab>
						
						<Tab eventKey="arizalar" title={t("General:Home:Tabs:Application")}>
							<div className="tab-content mt-3">
								<Row>
									<Col md={5}>
										<img src={Appeal_img} className="img-fluid" alt={t("General:Home:Tabs:Application")} />
									</Col>
									<Col md={6}>
										<ul className="feature-list list-unstyled">
											<li>{t("General:Home:Tabs:Application_text_one")}</li>
											<li>{t("General:Home:Tabs:Application_text_two")}</li>
											<li>{t("General:Home:Tabs:Application_text_three")}</li>
											<li>{t("General:Home:Tabs:Application_text_four")}</li>
										</ul>
									</Col>
								</Row>
							</div>
						</Tab>

						<Tab eventKey="korporativ-hujjatlar" title={t("General:Home:Tabs:Document")}>
							<div className="tab-content mt-3">
								<Row>
									<Col md={5}>
										<img src={Corperation_img} className="img-fluid" alt={t("General:Home:Tabs:Document")} />
									</Col>
									<Col md={6}>
										<ul className="feature-list list-unstyled">
											<li>{t("General:Home:Tabs:Document_text_one")}</li>
											<li>{t("General:Home:Tabs:Document_text_two")}</li>
											<li>{t("General:Home:Tabs:Document_text_three")}</li>
											<li>{t("General:Home:Tabs:Document_text_four")}</li>
										</ul>
									</Col>
								</Row>
							</div>
						</Tab>

						<Tab eventKey="murojaatlar" title={t("General:Home:Tabs:Appeal")}>
							<div className="tab-content">
								<Row>
									<Col md={5}>
										<img src={Qr_img} className="img-fluid" alt={t("General:Home:Tabs:Appeal")} />
									</Col>
									<Col md={6}>
										<ul className="feature-list list-unstyled">
											<li>{t("General:Home:Tabs:Appeal_text_one")}</li>
											<li>{t("General:Home:Tabs:Appeal_text_two")}</li>
											<li>{t("General:Home:Tabs:Appeal_text_three")}</li>
										</ul>
									</Col>
								</Row>
							</div>
						</Tab>

						<Tab eventKey="imzo" title={t("General:Home:Tabs:Signature")}>
							<div className="tab-content">
								<Row>
									<Col md={5}>
										<img src={Signature_img} className="img-fluid" alt={t("General:Home:Tabs:Signature")} />
									</Col>
									<Col md={6}>
										<ul className="feature-list list-unstyled">
											<li>{t("General:Home:Tabs:Signature_text_one")}</li>
											<li>{t("General:Home:Tabs:Signature_text_two")}</li>
											<li>{t("General:Home:Tabs:Signature_text_three")}</li>
										</ul>
									</Col>
								</Row>
							</div>
						</Tab>

						<Tab eventKey="sms" title={t("General:Home:Tabs:Sms")}>
							<div className="tab-content">
								<Row>
									<Col md={5}>
										<img src={Sms_img} className="img-fluid" alt={t("General:Home:Tabs:Sms")} />
									</Col>
									<Col md={6}>
										<ul className="feature-list list-unstyled">
											<li>{t("General:Home:Tabs:Sms_text_one")}</li>
											<li>{t("General:Home:Tabs:Sms_text_two")}</li>
										</ul>
									</Col>
								</Row>
							</div>
						</Tab>

						<Tab eventKey="ocr" title={t("General:Home:Tabs:OCR")}>
							<div className="tab-content">
								<Row>
									<Col md={5}>
										<img src={Ocr_img} className="img-fluid" alt={t("General:Home:Tabs:OCR")} />
									</Col>
									<Col md={6}>
										<ul className="feature-list list-unstyled">
											<li>{t("General:Home:Tabs:OCR_text_one")}</li>
											<li>{t("General:Home:Tabs:OCR_text_two")}</li>
										</ul>
									</Col>
								</Row>
							</div>
						</Tab>

					</Tabs>
				</section>

				<section className="info-content d-flex justify-content-center align-items-center">
					<h3>{t("General:Home:Info:Info_content")}</h3>
					<a href="https://stat.sud.uz/">STAT.UZ</a>
				</section>

				<section className="second-slider">
					<Carousel 
							interval={2000} 
							touch 
							variant='dark'
							prevIcon={<img src={Carousel_left_icon} />}
							nextIcon={<img src={Carousel_right_icon} />}>
								<Carousel.Item className="carousel-item">
										<h1>{t("General:Home:Carousel:Carousel_one")}</h1>

										<Row className="item-content">
											<Col md={6}>
												<img className="d-block" src={Hotel_img} />
											</Col>
											<Col md={6}>
												<p>
													{t("General:Home:Carousel:Carousel_one_text")}
												</p>
											</Col>
										</Row>
								</Carousel.Item>

								<Carousel.Item>
									<h1>{t("General:Home:Carousel:Carousel_two")}</h1>

										<Row className='item-content'>
											<Col md={6}>
												<img className="d-block" src={Edu_img} />
											</Col>
											<Col md={6}>
												<p>
													{t("General:Home:Carousel:Carousel_two_text")}
												</p>
											</Col>
										</Row>
								</Carousel.Item>

								<Carousel.Item>
									<h1>{t("General:Home:Carousel:Carousel_three")}</h1>

										<Row className='item-content'>
											<Col md={6}>
												<img className="d-block w-100 img-cover" src={Building_img} alt="Building" />
											</Col>
											<Col md={6}>
												<p>
													{t("General:Home:Carousel:Carousel_three_text")}
												</p>
											</Col>
										</Row>
								</Carousel.Item>

								<Carousel.Item>
									<h1>{t("General:Home:Carousel:Carousel_four")}</h1>

										<Row className='item-content'>
											<Col md={6}>
												<img className="d-block" src={Bank_img} />
											</Col>
											<Col md={6}>
												<p>
													{t("General:Home:Carousel:Carousel_four_text")}
												</p>
											</Col>
										</Row>
								</Carousel.Item>
						</Carousel>
				</section>

				<section className="statistics">
					<Row className="d-flex justify-content-center align-items-end">
						<Col md={4} className="d-flex justify-content-center align-items-center statistics-banner">
							<p>
								{t("General:Home:Statistics:Statistics_title")}
							</p>
						</Col>
						<Col md={8} className="d-flex justify-content-center">
							<Row className="stat-wrapper">
								<Col md={4} className="stat-col d-flex justify-content-end align-items-end flex-column">
									<h1>+1000</h1>
									<h4>{t("General:Home:Statistics:Statistics_title_one")}</h4>
								</Col>
								<Col md={4} className="stat-col d-flex justify-content-center align-items-end flex-column">
									<h1>+100</h1>
									<h4>{t("General:Home:Statistics:Statistics_title_two")}</h4>
								</Col>
								<Col md={4} className="stat-col d-flex justify-content-center align-items-end flex-column">
									<h1>+50</h1>
									<h4>{t("General:Home:Statistics:Statistics_title_three")}</h4>
								</Col>
							</Row>
						</Col>
					</Row>
				</section>

				<section className="signing-types">
					<h2>{t("General:Home:Signing:Signing_title")}</h2>
					<Row className="signing-types-content">
						<Col md={2} className="signing-types-col d-flex justify-content-center align-items-center flex-column">
							<div className="signing-types-col-header d-flex justify-content-center align-items-center">
								<img src={Signature_icon_img} alt="Glass Icon" />
							</div>
							<div className="signing-types-col-body d-flex justify-content-center align-items-center flex-column">
								<h4 className="text-center">{t("General:Home:Signing:Signing_title_one")}</h4>
							</div>
						</Col>

						<Col md={2} className="signing-types-col d-flex justify-content-center align-items-center flex-column">
							<div className="signing-types-col-header d-flex justify-content-center align-items-center">
								<img src={Phone_icon_img} alt="Law Icon" />
							</div>
							<div className="signing-types-col-body d-flex justify-content-center align-items-center flex-column">
								<h4 className="text-center">{t("General:Home:Signing:Signing_title_two")}</h4>
							</div>
						</Col>

						<Col md={2} className="signing-types-col d-flex justify-content-center align-items-center flex-column">
							<div className="signing-types-col-header d-flex justify-content-center align-items-center">
								<img src={Telegram_icon_img} alt="Signature Icon" />
							</div>
							<div className="signing-types-col-body d-flex justify-content-center align-items-center flex-column">
								<h4 className="text-center">{t("General:Home:Signing:Signing_title_three")}</h4>
							</div>
						</Col>
						
						<Col md={2} className="signing-types-col d-flex justify-content-center align-items-center flex-column">
							<div className="signing-types-col-header d-flex justify-content-center align-items-center">
								<img src={Face_icon_img} alt="Signature Icon" />
							</div>
							<div className="signing-types-col-body d-flex justify-content-center align-items-center flex-column">
								<h4 className="text-center">{t("General:Home:Signing:Signing_title_four")}</h4>
							</div>
						</Col>
						
						<Col md={2} className="signing-types-col d-flex justify-content-center align-items-center flex-column">
							<div className="signing-types-col-header d-flex justify-content-center align-items-center">
								<img src={ESignature_icon_img} alt="Signature Icon" />
							</div>
							<div className="signing-types-col-body d-flex justify-content-center align-items-center flex-column">
								<h4 className="text-center">{t("General:Home:Signing:Signing_title_five")}</h4>
							</div>
						</Col>
					</Row>
				</section>

				<section className="companies">
					<h2 className='text-center'>{t("General:Home:Corparations:Corparations_title")}</h2>

					<div className="companies-content d-flex">
						<div className="company"></div>
						<div className="company"></div>
						<div className="company"></div>
						<div className="company"></div>
						<div className="company"></div>
						<div className="company"></div>
					</div>
				</section>


				<section className="pricing">
					<h2 className="text-center">{t("General:Home:Price:Price_title")}</h2>
					
					<div className="pricing-content d-flex justify-content-center align-items-center">
						<div className="price-box">
							<h4>{t("General:Home:Price:Price_one:Price_one_title")}</h4>
							<h3>149.000 <span>uzs</span></h3>
							<p>{t("General:Home:Price:Price_one:Price_one_content_one")}</p>
							<p>{t("General:Home:Price:Price_one:Price_one_content_two")}</p>

							<Form className="price-types">
								<div className="type-1">
									<Form.Check
										inline
										label={`1 ${t("General:Home:Price:Price_month")}`}
										name="group2"
										type={'radio'}
										id={`inline-${'radio'}-1`}
										checked
									/>
								</div>

								<div className="type-2">
									<Form.Check
										inline
										label={`6 ${t("General:Home:Price:Price_month")}`}
										name="group2"
										type={'radio'}
										id={`inline-${'radio'}-2`}
									/>
								</div>

								<div className="type-3">
									<Form.Check
										inline
										label={`12 ${t("General:Home:Price:Price_month")}`}
										name="group2"
										type={'radio'}
										id={`inline-${'radio'}-3`}
									/>
								</div>
							</Form>

							<button className="btn btn-primary">{t("General:Home:Price:Price_select")}</button>
						</div>
						
						<div className="price-box">
							<h4>{t("General:Home:Price:Price_two:Price_two_title")}</h4>
							<h3>399.000 <span>uzs</span></h3>
							<p>{t("General:Home:Price:Price_two:Price_two_content_one")}</p>
							<p>{t("General:Home:Price:Price_two:Price_two_content_two")}</p>

							<Form className="price-types">
								<div className="type-1">
									<Form.Check
										inline
										label={`1 ${t("General:Home:Price:Price_month")}`}
										name="group2"
										type={'radio'}
										id={`inline-${'radio'}-1`}
										checked
									/>
								</div>

								<div className="type-2">
									<Form.Check
										inline
										label={`6 ${t("General:Home:Price:Price_month")}`}
										name="group2"
										type={'radio'}
										id={`inline-${'radio'}-2`}
									/>
								</div>

								<div className="type-3">
									<Form.Check
										inline
										label={`12 ${t("General:Home:Price:Price_month")}`}
										name="group2"
										type={'radio'}
										id={`inline-${'radio'}-3`}
									/>
								</div>
							</Form>

							<button className="btn btn-primary">{t("General:Home:Price:Price_select")}</button>
						</div>

						<div className="price-box">
							<h4>{t("General:Home:Price:Price_three:Price_three_title")}</h4>
							<h3>500.000 <span>uzs</span></h3>
							<p>{t("General:Home:Price:Price_three:Price_three_content_one")}</p>
							<p>{t("General:Home:Price:Price_three:Price_three_content_two")}</p>

							<Form className="price-types">
								<div className="type-1">
									<Form.Check
										inline
										label={`1 ${t("General:Home:Price:Price_month")}`}
										name="group3"
										type={'radio'}
										id={`inline-${'radio'}-2`}
										checked
									/>
								</div>

								<div className="type-2">
									<Form.Check
										inline
										label={`6 ${t("General:Home:Price:Price_month")}`}
										name="group3"
										type={'radio'}
										id={`inline-${'radio'}-2`}
									/>
								</div>

								<div className="type-3">
									<Form.Check
										inline
										label={`12 ${t("General:Home:Price:Price_month")}`}
										name="group3"
										type={'radio'}
										id={`inline-${'radio'}-2`}
									/>
								</div>
							</Form>

							<button className="btn btn-primary">{t("General:Home:Price:Price_select")}</button>
						</div>

						<div className="price-box">
							<h4>{t("General:Home:Price:Price_four:Price_four_title")}</h4>
							<h3>750.000 <span>uzs</span></h3>
							<p>{t("General:Home:Price:Price_four:Price_four_content_one")}</p>
							<p>{t("General:Home:Price:Price_four:Price_four_content_two")}</p>

							<Form className="price-types">
								<div className="type-1">
									<Form.Check
										inline
										label={`1 ${t("General:Home:Price:Price_month")}`}
										name="group4"
										type={'radio'}
										id={`inline-${'radio'}-3`}
										checked
									/>
								</div>

								<div className="type-2">
									<Form.Check
										inline
										label={`6 ${t("General:Home:Price:Price_month")}`}
										name="group4"
										type={'radio'}
										id={`inline-${'radio'}-3`}
									/>
								</div>

								<div className="type-3">
									<Form.Check
										inline
										label={`12 ${t("General:Home:Price:Price_month")}`}
										name="group4"
										type={'radio'}
										id={`inline-${'radio'}-3`}
									/>
								</div>
							</Form>

							<button className="btn btn-primary">{t("General:Home:Price:Price_select")}</button>
						</div>
					</div>
				</section>


				<section className="banner">
					<a href="#" className="logo">
						<img src={Logo_Light} />
					</a>

					<div className="content">
						<h2>1doc.uz</h2>
						<h4>{t("General:Home:Banner:Banner_title")}</h4>
					</div>
				</section>

				<footer>
					<Row>
						<Col md={3}>
						<h4>{t("General:Home:Footer:Column_one:Column_one_title")}</h4>

						<ul>
								<li><a href="">{t("General:Home:Footer:Column_one:Column_one_text_one")}</a></li>
								<li><a href="">{t("General:Home:Footer:Column_one:Column_one_text_two")}</a></li>
								<li><a href="">{t("General:Home:Footer:Column_one:Column_one_text_three")}</a></li>
								<li><a href="">{t("General:Home:Footer:Column_one:Column_two_text_four")}</a></li>
								<li><a href="">{t("General:Home:Footer:Column_one:Column_two_text_five")}</a></li>
							</ul>
						</Col>

						<Col md={6}>
							<h4>{t("General:Home:Footer:Column_two:Column_two_title")}</h4>

							<ul>
								<li><a href="http://lex.uz//docs/6213382">{t("General:Home:Footer:Column_two:Column_two_text_one")}</a></li>
								<li><a href="http://lex.uz//docs/6234904">{t("General:Home:Footer:Column_two:Column_two_text_two")}</a></li>
								<li><a href="http://lex.uz//docs/6840502">{t("General:Home:Footer:Column_two:Column_two_text_three")}</a></li>
								<li><a href="http://lex.uz//ru/docs/-3336169">{t("General:Home:Footer:Column_two:Column_two_text_four")}</a></li>
							</ul>
						</Col>
						
						<Col md={3}>
							<h4>{t("General:Home:Footer:Column_three:Column_three_title")}</h4>

							<ul>
								<li><a href="tel:+998917972385">+998 91 797 23 85</a></li>
							</ul>
						</Col>
					</Row>


					<hr/>

					<Row className="row footer-bottom">
						<Col md={6} className="title">
							<p>OOO “1CORP” C 2024</p>
						</Col>

						<Col md={6} className="socials d-flex" style={{justifyContent: 'flex-end', columnGap: 20}}>
							<img src={Youtube_icon} alt="" />
							<img src={Instagram_icon} alt="" />
						</Col>
					</Row>
				</footer>
			</div>

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
            {t("General:Auth:notRegister")} <Link to="/registration">{t("General:Auth:register")}</Link>
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
