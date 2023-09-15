

import './CommunicationComponent.css';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import FilterTargetGroup from './FilterTargetGroupComponent';
import MessagesFromUserPage from './MessageFromUserComponent';
import DroppedPayments from './DroppedPaymentsComponent';
import CommunicationHeaderPage from './ReuseComponents/CommunicationHeaderPage';
import SendPromptComponent from './SendPromptPage';

function CommunicationsComponent() {
    // const [key, setKey] = useState('home');
    return (
        <div className='mainBodyScreen pt-5'>
            <Tab.Container id="tabs-example" defaultActiveKey="#">
                <Row>
                    <Col>
                        <Nav variant="tabs" defaultActiveKey="#">
                            <Nav.Item>
                                <Nav.Link eventKey="#">Prompts</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-1" className='navTabNames'>Dropped Payments</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2" className='navTabNames'>Messages from User</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tab.Content>
                            <Tab.Pane eventKey="#">
                                <div className="pt-5">
                                    <div className='pt-3'>
                                        <div>
                                            <CommunicationHeaderPage title="Send Prompt" />
                                        </div>
                                        <section className="filterTargetGroup">
                                            <SendPromptComponent />
                                        </section>
                                    </div>
                                    <div className='pt-3'>
                                        <div className='pt-5'>
                                            <CommunicationHeaderPage title="Filter Target Group" />
                                        </div>
                                        <section className="filterTargetGroup">
                                            <FilterTargetGroup />
                                        </section>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="link-1">
                            <div className="pt-5">
                                    <div className='pt-3'>
                                        <div>
                                            <CommunicationHeaderPage title="Drop off Details" />
                                        </div>
                                        <section className="drouppedPaymentsGroup">
                                            <DroppedPayments />
                                        </section>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="link-2">
                                <div className="pt-5">
                                    <div className='pt-3'>
                                        <div>
                                            <CommunicationHeaderPage title="Admin Inbox" />
                                        </div>
                                        <section className="messageFromUsersTabGroup">
                                            <MessagesFromUserPage />
                                        </section>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default CommunicationsComponent;