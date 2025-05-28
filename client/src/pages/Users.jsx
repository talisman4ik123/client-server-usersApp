import Title from "../UI/Title"
import Wrapper from "../UI/Wrapper"
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../slices/usersSlice";
import MyNavLink from "../UI/MyNavLink";
import { useNavigate } from "react-router-dom";

function Users() {

    const error = useSelector(state => state.usersData.error);
    const loading = useSelector(state => state.usersData.loading);
    const currentUser = useSelector(state => state.usersData.currentUser);
    const users = useSelector(state => state.usersData.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);

    const handleLogout = async () => {
        dispatch({type: "users/clearState"});
        try {
            const response = await fetch("http://localhost:5000/api/logout", {
                method: "GET",
                credentials: "include"
            });

            if (!response.ok || response.status === 401) {
                const errorData = await response.json();

                dispatch({type: "users/fetchError", payload: errorData.message});
            } else {
                navigate("/");
            }
        } catch (error) {
            dispatch({type: "users/fetchError", payload: error});
        }
    }

    function handleSelected(userID) {
        dispatch({type: "users/selectUser", payload: userID});
    }

    function handleSelectedAll() {
        const newChecked = !checked;
        setChecked(newChecked);
        dispatch({type: "users/selectAllUsers", payload: newChecked});
    }

    useEffect(() => {
        dispatch(getAllUsers());
    }, [])

    if (error) {
        return (
            <Wrapper>
                <div className="d-flex flex-column align-items-center">
                    <span className="text-danger fs-5">{error}</span>
                    <span className="fs-5">Try login again <MyNavLink path={"/login"}>Login</MyNavLink></span>
                </div>
            </Wrapper>
        )
    }

    if (loading) {
        return (
            <Wrapper>
                <span>Loading...</span>
                <div className="spinner-border-sm spinner-border ms-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div className="border shadow">
                <div className="d-flex justify-content-between bg-info p-3 min-width-users mb-5">
                    <div className="d-flex flex-column">
                        <span className="text-light fst-italic fs-4">{currentUser.name}</span>
                        <span className="text-light">{currentUser.email}</span>
                    </div>
                    <Button variant="success" className="max-hight-btn d-flex align-items-center" onClick={handleLogout}>logout</Button>
                </div>
                <div className="d-flex flex-column align-items-center px-2">
                    <Title>Users list</Title>

                    <div className="mb-2">
                        <Button variant="info" className="me-2 text-light">
                            <span className="me-1">delete</span>
                            <i className="bi bi-trash"></i>
                        </Button>
                        <Button variant="info" className="me-2 text-light">
                            <span className="me-1">block</span>
                            <i className="bi bi-ban"></i>
                        </Button>
                        <Button variant="info" className="text-light">
                            <span>unblock</span>
                        </Button>
                    </div>

                    <Table striped bordered hover className="mb-2">
                        <thead>
                            <tr className="align-middle text-center fst-italic text-small">
                                <th className="align-middle text-center fst-italic">
                                    <div className="d-flex flex-column align-items-center">
                                        <span className="mb-1">check/uncheck all</span>
                                        <InputGroup className="d-flex justify-content-center">
                                            <InputGroup.Checkbox 
                                                checked={checked} 
                                                onChange={handleSelectedAll} 
                                                aria-label="Checkbox for following text input" />
                                        </InputGroup>
                                    </div>
                                </th>

                                <th>id</th>
                                <th>name</th>
                                <th>email</th>
                                <th>registration data</th>
                                <th>login data</th>
                                <th>status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="align-middle text-center text-nowrap">
                                    <td>
                                        <InputGroup className="d-flex justify-content-center">
                                            <InputGroup.Checkbox 
                                                checked={user.selected} 
                                                onChange={() => handleSelected(user.id)} 
                                                aria-label="Checkbox for following text input" />
                                        </InputGroup>
                                    </td>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.reg_date}</td>
                                    <td>{user.log_date}</td>
                                    <td>{user.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </Wrapper>
    )
}

export default Users