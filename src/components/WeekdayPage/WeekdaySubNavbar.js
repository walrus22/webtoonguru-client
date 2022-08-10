
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function WeekdaySubNavbar() {
    const date_list = ["월","화","수","목","금","토","일","연재","완결","열흘"]

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Nav className="me-auto">
                    {date_list.map((date, index) => {
                        return <Nav.Link key={index} href={`/date/${date}`}>{date}</Nav.Link>
                    })}
                </Nav>
            </Container>
        </Navbar>
    );
  }
  
  export default WeekdaySubNavbar; 