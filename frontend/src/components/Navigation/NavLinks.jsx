import { NavLink } from 'react-router-dom';

import './NavLinks.css';

export default function NavLinks() {
return (
  <ul className="nav-links">
    <li >
      <NavLink to="/">
        Health Profile
      </NavLink>
    </li>
    <li>
      <NavLink to="/classifier">
        Web Classifier Tool
      </NavLink>
    </li>
    <li>
      <NavLink to="/chengclassifier">
        VisionMD Classifier Tool
      </NavLink>
    </li>
    {/* <li>
      <NavLink to="/scanner">
        Scanner
      </NavLink>
    </li> */}
  </ul>
)
}