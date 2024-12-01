import {Link} from "react-router-dom";

export function HeaderNavegation() {
    return (
        <div className="header-right">
            <Link to={"/"}>Home</Link>
            <Link to={"/Contact"}>Contact</Link>
            <Link to={"/About"}>About</Link>
        </div>
    );
}