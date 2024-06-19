import { Container, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import UserDashboardNavbar from '../components/Navbar';
import UserDashboardSideBar from '../components/SideBar';
import UserDashboardFooter from '../components/Footer';

const Contract = observer(() => {

  return (
    <>
      <UserDashboardNavbar/>
      <Container fluid>
        <Row>
          <UserDashboardSideBar/>
          <Col xxl={11} xl={11} lg={11} md={11} sm={11} className="main-content">
            Yaratish
          </Col>
        </Row>
      </Container>
      <UserDashboardFooter/>
    </>
  );
});

export default Contract;