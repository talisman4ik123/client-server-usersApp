import SubWrapper from "../UI/SubWrapper"
import Title from "../UI/Title"
import Wrapper from "../UI/Wrapper"
import MyNavLink from "../UI/MyNavLink"
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {

        setLoading(true);

        try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ email, password: pass }),
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            // Предполагается, что сервер возвращает сообщение об ошибке
            setError(errorMessage.message || 'Error during login!');
            setLoading(false);
            return;
        }

        setEmail('');
        setPass('');
        setError(null);
        navigate("/users");

        } catch (err) {
            setError(err || 'Network or server error!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Wrapper>
            <SubWrapper>
                <Title>Login Page</Title>
                <Form className="d-flex flex-column align-items-center">
                    <FloatingLabel controlId="floatingInput" label="email" className="mb-3 min-width-iput">
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email@example.com" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="password" className="mb-3 min-width-iput">
                        <Form.Control value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" />
                    </FloatingLabel>

                    <Button disabled={loading} variant="success" className="mb-5 min-btn-width" onClick={handleLogin}>
                        <span>{loading ? "Loading..." : "Sign in"}</span>
                        {loading && <div className="spinner-border-sm spinner-border ms-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                    </Button>

                    {error && <p className="text-danger">{error}</p>}
                </Form>
                <div className="d-flex justify-content-between max-width">
                    <MyNavLink path={"/registration"}>registration</MyNavLink>
                    <MyNavLink path={"/"}>home</MyNavLink>
                </div>
            </SubWrapper>
        </Wrapper>
    )
}

export default Login