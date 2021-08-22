import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, ListGroup, Nav, Navbar, NavDropdown, Row, Tab, Table, Spinner } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';


function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchData = () => {
    setLoading(true)
    fetch('http://34.87.101.86:8090/league/get-all-league?page=1&size=10&is_paging=true')
      .then(res => res.json())
      .then(res => {
        if (res && res.success && Array.isArray(res.data)) {
          setData(res.data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  const columns = [{
    dataField: 'league_id',
    text: 'ID'
  }, {
    dataField: 'league_name',
    text: 'Name'
  }, {
    dataField: 'country',
    text: 'Country'
  }, {
    dataField: 'league_session',
    text: 'Session'
  }];
  const expandRow = {
    renderer: row => (
      <div>
        <p>{`This Expand row is belong to rowKey ${row.league_id}`}</p>
        <p>You can render anything here, also you can add additional data on every row object</p>
        <p>expandRow.renderer callback will pass the origin row object to you</p>
      </div>
    )
  };

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <div style={{
          position: 'fixed',
          left: 0,
          top: '60px',
          width: '250px'
        }}>


        </div>
        <Container>
          <Row>
            <Col sm={0}>
              <ListGroup>
                <ListGroup.Item action href="#link1">
                  Link 1
                </ListGroup.Item>
                <ListGroup.Item action href="#link2">
                  Link 2
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  {loading ? (
                    <div style={{
                      height: "200px",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <BootstrapTable keyField='league_id' data={data} columns={columns} expandRow={expandRow} />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Container>
      </Tab.Container>
    </div>
  );
}

export default App;
