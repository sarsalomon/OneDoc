import { toast, ToastContainer } from 'react-toastify';
import { Context } from '../../main';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_DASHBOARD_ROUTE, USER_DASHBOARD_ROUTE, HOME_ROUTE } from '../../utils/consts';
import { registration } from '../../function/http/UserApi';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import Logo_Light          from "../../assets/img/logo_light.webp";
import Login_img           from "../../assets/img/login.png";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const redirectToDashboard = () => {
            if (user) {
                if (user._user.role === 'Admin') {
                    navigate(ADMIN_DASHBOARD_ROUTE);
                } else if (user._user.role === 'User') {
                    navigate(USER_DASHBOARD_ROUTE);
                } 
            } else {
                navigate(HOME_ROUTE);
            }
        };

        redirectToDashboard();

    }, [user, navigate]);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [whois, setWhoIs] = useState(false);

    const handleCheckboxChange = (e) => {
      console.log(e.target.checked)
      setWhoIs(e.target.checked);
    };
  
    const click = async () => {
        try {
            let data;
            const formData = new FormData();

            formData.append('name', name);
            formData.append('surname', surname);
            formData.append('phone', phone);
            formData.append('password', password);
            formData.append('whois', whois ? 'Lawyer' : 'User');

            data = await registration(formData);
          
            navigate(USER_DASHBOARD_ROUTE);

        } catch (e) {
            toast.error(`ddd`, {
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
    }
    
    useEffect(() => {
        const keyDownHandler = event => {
    
          if (event.key === 'Enter') {
            click();
          }

        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
        
    }, [name, surname, phone, password, repeatPassword, whois]);

    return (
        <div>
          <header>
              <nav>
                  <a href="/" className="logo">
                      <img src={Logo_Light} alt="1doc.uz Logo" />
                      <h1>1doc.uz</h1>
                  </a>
              </nav>
          </header>
  
          <main>
            <div className='main-img'>
              <img src={Login_img} />
            </div>
            
            <form className="main-content">
                <div className="form-group">
                  <label htmlFor="nameInput">Ism</label>
                  <input type="email" className="form-control" id="nameInput" placeholder="Asadbek" onChange={(e)=>{setName(e.target.value)}} />
                </div>
  
                <div className="form-group">
                  <label htmlFor="surnameInput">Familya</label>
                  <input type="email" className="form-control" id="surnameInput" placeholder="Aliyev" onChange={(e)=>{setSurname(e.target.value)}} />
                </div>
  
                <div className="form-group">
                  <label htmlFor="phoneInput">Telefon raqamingizni kiriting</label>
                  <input type="email" className="form-control" id="phoneInput" placeholder="+998 xx xxx xx xx" onChange={(e)=>{setPhone(e.target.value)}} />
                </div>
  
                <div className="form-group">
                  <label htmlFor="passwordInput">Parolni kiriting</label>
                  <input type="password" className="form-control" id="passwordInput" placeholder="********" onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordInput">Takrorlang</label>
                  <input type="password" className="form-control" id="passwordInput" placeholder="********" onChange={(e)=>{setRepeatPassword(e.target.value)}} />
                </div>
                
                <div className="d-flex justify-content-center align-items-center form-group">
                  <div className="form-check">
                      <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="whoisCheck" 
                        checked={whois}
                        onChange={handleCheckboxChange} 
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">Yuridik shaxsman</label>
                  </div>
  
                  <a href="#" className="forgot-pass">Akkauntim bor</a>
                </div>
  
                <div className="form-group">
                  <button type="submit" className="btn btn-primary" onClick={click}>RO’YXATDAN O’TISH</button>
                </div>
            </form>
          </main>
          <ToastContainer />
      </div>
    );
});

export default Auth;