import Auth from "./pages/site/Auth";
import Home from "./pages/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import { ADMIN_DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, USER_DASHBOARD_ACCOUNT_ROUTE, USER_DASHBOARD_CONTRACT_ADD_ROUTE, USER_DASHBOARD_CONTRACT_ROUTE, USER_DASHBOARD_PAY_ROUTE, USER_DASHBOARD_ROUTE } from "./utils/consts";
import ContractView from "./pages/user/view/ContractView";
import AccountView from "./pages/user/view/AccountView";
import PayView from "./pages/user/view/PayView";
import Contract from "./pages/user/add/Contract";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: ADMIN_DASHBOARD_ROUTE,
        Component: AdminDashboard
    },
    {
        path: USER_DASHBOARD_ROUTE,
        Component: UserDashboard
    },
    {
        path: USER_DASHBOARD_PAY_ROUTE,
        Component: PayView
    },
    {
        path: USER_DASHBOARD_CONTRACT_ROUTE,
        Component: ContractView
    },
    {
        path: USER_DASHBOARD_CONTRACT_ADD_ROUTE,
        Component: Contract
    },
    {
        path: USER_DASHBOARD_ACCOUNT_ROUTE,
        Component: AccountView
    }
];

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
];