import { Container, Row, Col, Tabs, Tab, Nav } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast } from 'react-toastify';
import UserDashboardFooter from './components/Footer';
import UserDashboardNavbar from './components/Navbar';
import UserDashboardSideBar from './components/SideBar';

const UserDashboard = observer(() => {

  return (
    <>
      <UserDashboardNavbar/>
      <Container fluid>
        <Row>
          <UserDashboardSideBar/>
          <Col xxl={11} xl={11} lg={11} md={11} sm={11} className="main-content">
            s
          </Col>
        </Row>
      </Container>
      <UserDashboardFooter/>
    </>
  );
});

export default UserDashboard;
