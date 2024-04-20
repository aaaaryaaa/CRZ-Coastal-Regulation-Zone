import "./box.css";
import Upload from "./UploadComponent";
import { Container, Row, Col } from "reactstrap";
function Notification() {
  return (
    <Container>
      <Row>
        <Col md={{ size: 8 }}>
          <div className="rectangle">
            <h1>Notification</h1>
            <ul className="newclass">
              <li className="r1">Notification</li>
              <li className="r1">Notification</li>
              <li className="r1">Notification</li>
              <li className="r1">Notification</li>
            </ul>
          </div>
        </Col>
        <Col>
          <Upload />
        </Col>
      </Row>
    </Container>
  );
}

export default Notification;
