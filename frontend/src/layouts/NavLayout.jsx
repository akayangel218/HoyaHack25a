import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/Navigation/MainNavigation.jsx';

export default function NavLayout() {
  return (
    <div className="nav-layout-container" style={{display: 'flex'}}>
      <MainNavigation />
      <Outlet style={{flex: "1"}}/>
    </div>
  )
}