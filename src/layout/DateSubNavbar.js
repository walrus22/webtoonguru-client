
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function SubNavbar() {
    return (
        <Navbar bg="light" variant="light">
            <Container>
            <Nav className="me-auto">
                <Nav.Link href="/date/월">월</Nav.Link>
                <Nav.Link href="/date/화">화</Nav.Link>
                <Nav.Link href="/date/수">수</Nav.Link>
                <Nav.Link href="/date/목">목</Nav.Link>
                <Nav.Link href="/date/금">금</Nav.Link>
                <Nav.Link href="/date/토">토</Nav.Link>
                <Nav.Link href="/date/일">일</Nav.Link>
                <Nav.Link href="/date/완결">완결</Nav.Link>
                <Nav.Link href="/date/연재">연재</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
  }
  
  export default SubNavbar;