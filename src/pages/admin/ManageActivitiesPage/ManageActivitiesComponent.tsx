import { Col, Nav, Row, Tab } from 'react-bootstrap';
import SevaComponent from './SevaComponent';
import FestivalsComponent from './FestivalsComponent';
import ParentComponent from './AdministartiveAllEvents Componet';
import DonationComponent from './DonationComponent';


function ManageActivitiesComponent(){
    return( 
        <div className='mainBodyScreen pt-5'>
            <div className="activitesHeaderBody">
                <div className='activitytitle'>
                    <p className="headTitle">Manage Activities</p>
                </div>
            </div>
            <Tab.Container id="tabs-example" defaultActiveKey="#">
                <Row className='mt-5'>
                    <Col>
                        <Nav variant="tabs" defaultActiveKey="#">
                            <Nav.Item>
                                <Nav.Link eventKey="#">Donation</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-1" className='navTabNames'>Seva</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2" className='navTabNames'>Festivals</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-3" className='navTabNames'>Administrative</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tab.Content>
                            <Tab.Pane eventKey="#">
                                <DonationComponent /> 
                            </Tab.Pane>
                            <Tab.Pane eventKey="link-1">
                                <SevaComponent />
                            </Tab.Pane>
                            <Tab.Pane eventKey="link-2">
                                <FestivalsComponent />
                            </Tab.Pane>
                            <Tab.Pane eventKey="link-3">
                                <ParentComponent/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default ManageActivitiesComponent