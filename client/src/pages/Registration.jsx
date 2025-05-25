import SubWrapper from "../UI/SubWrapper"
import Title from "../UI/Title"
import Wrapper from "../UI/Wrapper"
import MyNavLink from "../UI/MyNavLink"
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

function Registration() {
    return (
        <Wrapper>
            <SubWrapper>
                <Title>Registration Page</Title>
                <Form className="d-flex flex-column align-items-center">
                    <FloatingLabel controlId="floatingInput" label="name" className="mb-3 min-width-iput">
                        <Form.Control type="text" placeholder="name" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="email" className="mb-3 min-width-iput">
                        <Form.Control type="text" placeholder="email@example.com" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="password" className="mb-3 min-width-iput">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="confirm password" className="mb-4 min-width-iput">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>

                    <Button variant="success" className="mb-5 min-btn-width">submit</Button>
                </Form>

                <div className="d-flex justify-content-between max-width">
                    <MyNavLink path={"/login"}>login</MyNavLink>
                    <MyNavLink path={"/"}>home</MyNavLink>
                </div>
            </SubWrapper>
        </Wrapper>
    )
}

export default Registration