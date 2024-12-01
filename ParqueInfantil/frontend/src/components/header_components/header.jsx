import '../../styles/header.css';
import {HeaderSearch} from "./header_search.jsx";
import {HeaderNavegation} from "./header_navegation.jsx";
import {HeaderName} from "./header_name.jsx";

export function Header() {
    return (
        <div className="header">
            <HeaderName/>
            <HeaderSearch/>
            <HeaderNavegation/>
        </div>
    );
}