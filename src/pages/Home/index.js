import { useState, useEffect } from 'react'
import { Col, Container, ListGroup, Nav, Navbar, NavDropdown, Row, Tab, Table, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ExpandSessionRow from './ExpandSessionRow'
import Loading from '../../components/Loading'

const Sidebar = () => {
  return (<div>
    <ListGroup>
      <ListGroup.Item action href="#link1">
        Link 1
      </ListGroup.Item>
      <ListGroup.Item action href="#link2">
        Link 2
      </ListGroup.Item>
    </ListGroup>
  </div>)
}

function HomePage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchLeague = () => {
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
    text: 'ID',

  }, {
    dataField: 'league_name',
    text: 'Name'
  }, {
    dataField: 'country',
    text: 'Country'
  }, {
    dataField: 'league_session',
    text: 'Session'
  },
  {
    dataField: 'league_session',
    text: 'Session'
  },
  {
    dataField: 'action',
    text: 'Action',
    formatter: (value, row) => (
      <Button type="primary" size="sm" onClick={(e) => {
        e.stopPropagation()
        alert(row.league_id)
      }}>Click</Button>
    )
  },
  ];
  const expandRow = {
    renderer: row => <ExpandSessionRow row={row} />
  };

  useEffect(() => {
    fetchLeague()
  }, [])
  return (
    <div>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <div style={{
          position: 'fixed',
          left: 0,
          top: '60px',
          width: '250px'
        }}>
        </div>
        <div style={{
          display: 'flex'
        }}>
          <div style={{ width: '280px' }}>
            <Sidebar />
          </div>
          <div style={{ width: '100%' }}>
            <Container>
              <Row>
                <Col sm={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="#link1">
                      {loading ? (
                        <Loading loading={loading} />
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
          </div>
        </div>
      </Tab.Container>
    </div>
  );
}

export default HomePage;
