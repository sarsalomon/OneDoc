// import { Helmet } from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Context } from '../../main';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_DASHBOARD_ROUTE, LOGIN_ROUTE, USER_DASHBOARD_ROUTE } from '../../utils/consts';
import { signIn } from '../../function/http/UserApi';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
// import NavBar from "./components/Navbar";
// import { useSocket } from "./SocketClass";

const Auth = observer(() => {
    // const socket = useSocket();
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
                } else if (user._user.role === '' || user._user.role === null || user._user.role === undefined ) {
                    navigate(LOGIN_ROUTE);
                }
            } else {
                navigate(LOGIN_ROUTE);
            }
        };

        redirectToDashboard();

    }, [user, navigate]);

    const [login, setLogin] = useState('');

    const click = async () => {
        try {
            let data;

            data = await signIn(login);

            user.setUser(data);
            user.setIsAuth(true);

            if (data.role === 'Admin') {
                navigate(ADMIN_DASHBOARD_ROUTE);
            } else if(data.role === 'User') {
                // socket.emit('command', {
                //     "command": "addStudent",
                //     "fullname": user._user.fullname,
                // });
                navigate(USER_DASHBOARD_ROUTE);
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
        
      }, [login]);

    return (
        <div className="wrapper">
            11
        </div>
    );
});

export default Auth;