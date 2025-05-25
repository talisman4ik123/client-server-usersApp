import MyNavLink from "../UI/MyNavLink"
import SubWrapper from "../UI/SubWrapper"
import Title from "../UI/Title"
import Wrapper from "../UI/Wrapper"

function NotFound() {
    return (
        <Wrapper>
            <SubWrapper>
                <Title>
                    <span className="me-3">Page Not Found</span>
                    <i className="bi bi-emoji-frown"></i>
                </Title>

                <MyNavLink path="/">home</MyNavLink>
            </SubWrapper>
        </Wrapper>
    )
}

export default NotFound