import SubWrapper from "../UI/SubWrapper"
import Title from "../UI/Title"
import Wrapper from "../UI/Wrapper"
import MyNavLink from "../UI/MyNavLink"
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
   
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confPass, setConfPass] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
  
    // Для отображения обратного отсчета
    const [countdown, setCountdown] = useState(null);

    // Очистка таймаута при размонтировании компонента
    useEffect(() => {
        if (typeof countdown !== 'number') return;

        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            navigate('/login');
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    function validationData() {
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

        if (!name) {
            setError("name is empty!");
            return false;
        } else if (!email) {
            setError("email is empty");
            return false;
        } else if (!pass) {
            setError("pass is empty");
            return false;
        } else if (!emailRegex.test(email)) {
            setError("email must be in the format: example@mail.com");
            return false;
        } else if (pass !== confPass) {
            setError("passwords do not match");
            return false;
        } else {
            setError(null);
            return true; // данные валидны
        }
    }

    const handleSubmit = async () => {
        if (!validationData()) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password: pass }),
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                // Предполагается, что сервер возвращает сообщение об ошибке
                setError(errorMessage.message || 'error during registration');
                setLoading(false);
                return;
            }

            setName('');
            setEmail('');
            setPass('');
            setConfPass('');
            setError(null);

            setCountdown(3);

        } catch (err) {
            setError(err || 'Network or server error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Wrapper>
            <SubWrapper>
                <Title>Registration Page</Title>
                <Form className="d-flex flex-column align-items-center">
                    <FloatingLabel controlId="floatingInput1" label="name" className="mb-3 min-width-iput">
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="name" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput2" label="email" className="mb-3 min-width-iput">
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email@example.com" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword1" label="password" className="mb-3 min-width-iput">
                        <Form.Control value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword2" label="confirm password" className="mb-4 min-width-iput">
                        <Form.Control value={confPass} onChange={(e) => setConfPass(e.target.value)} type="password" placeholder="Password" />
                    </FloatingLabel>

                    <Button disabled={loading} variant="success" className="mb-5 min-btn-width" onClick={handleSubmit}>
                        <span>{loading ? "Loading..." : "Submit"}</span>
                        {loading && <div className="spinner-border-sm spinner-border ms-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                    </Button>

                    {error && <p className="text-danger">{error}</p>}
                    {countdown !== null && <p className="text-success fw-semibold text-max-width text-center">Registration successful! You will be redirected to the login page in: {countdown}</p>}
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