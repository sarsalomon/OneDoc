import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast } from 'react-toastify';
import UserDashboardNavbar from '../components/Navbar';
import UserDashboardSideBar from '../components/SideBar';
import UserDashboardFooter from '../components/Footer';

const AccountView = observer(() => {

  return (
    <>
      <UserDashboardNavbar/>
      <Container fluid>
        <Row>
          <UserDashboardSideBar/>
          <Col xxl={11} xl={11} lg={11} md={11} sm={11} className="main-content">
yangilash
          </Col>
        </Row>
      </Container>
      <UserDashboardFooter/>
    </>
  );
});

export default AccountView;