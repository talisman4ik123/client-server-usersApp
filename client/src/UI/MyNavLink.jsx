import { NavLink } from "react-router-dom"

function MyNavLink({children, path}) {
    return <NavLink to={path} className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-5">{children}</NavLink>
}

export default MyNavLink