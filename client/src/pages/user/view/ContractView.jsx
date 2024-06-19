import { Container, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { USER_DASHBOARD_CONTRACT_ADD_ROUTE } from '../../../utils/consts';
import UserDashboardNavbar from '../components/Navbar';
import UserDashboardSideBar from '../components/SideBar';
import UserDashboardFooter from '../components/Footer';

const ContractView = observer(() => {
  const [key, setKey] = useState('pay');

  return (
    <>
      <UserDashboardNavbar/>
      <Container fluid>
        <Row>
          <UserDashboardSideBar/>
          <Col xxl={11} xl={11} lg={11} md={11} sm={11} className="main-content">
            <div className='d-flex my-2'>
              <NavLink to={USER_DASHBOARD_CONTRACT_ADD_ROUTE}>
                <Button>Shartnoma yaratish</Button>
              </NavLink>
              <div className='ms-auto'>
                Qidiruv
              </div>
            </div>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="pay" title="Jami">
                Payme orqali tolov qil kot
              </Tab>
              <Tab eventKey="history" title="JArayonda">
                
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
      <UserDashboardFooter/>
    </>
  );
});

export default ContractView;
