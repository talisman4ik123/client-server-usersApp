import MyNavLink from "../UI/MyNavLink"
import SubWrapper from "../UI/SubWrapper"
import Title from "../UI/Title"
import Wrapper from "../UI/Wrapper"

function Home() {
    return (
        <Wrapper>
            <SubWrapper>
                <Title>Home Page</Title>
                <div className="d-flex justify-content-between max-width">
                    <MyNavLink path={"/login"}>login</MyNavLink>
                    <MyNavLink path={"/registration"}>registration</MyNavLink>
                </div>
            </SubWrapper>
        </Wrapper>
    )
}

export default Home