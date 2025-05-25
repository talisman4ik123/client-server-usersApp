import Title from "../UI/Title"
import Wrapper from "../UI/Wrapper"
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';

function Users() {
    return (
        <Wrapper>
            <div className="border shadow">
                <div className="d-flex justify-content-between bg-info p-3 min-width-users mb-5">
                    <div className="d-flex flex-column">
                        <span className="text-light fst-italic fs-4">user name</span>
                        <span className="text-light">user email</span>
                    </div>
                    <Button variant="success" className="max-hight-btn d-flex align-items-center">logout</Button>
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
                                            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
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
                            <tr className="align-middle text-center text-nowrap">
                                <td>
                                    <InputGroup className="d-flex justify-content-center">
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                                    </InputGroup>
                                </td>
                                <td>1</td>
                                <td>Dima</td>
                                <td>dima@mail.ru</td>
                                <td>18.05.2025 17:35</td>
                                <td>19.05.2025 20:48</td>
                                <td>active</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </Wrapper>
    )
}

export default Users