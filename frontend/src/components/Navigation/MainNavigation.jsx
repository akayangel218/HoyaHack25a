import './MainNavigation.css';
import Sidebar from './Sidebar.jsx';
import NavLinks from './NavLinks.jsx';
import invertedLogo from '../../assets/inverted_logo.svg';
import BlockButton from '../../components/UiElements/BlockButton.jsx';

export default function MainNavigation() {
  return (
    <Sidebar>
      <div style={{width: '100%', display: 'flex', flexFlow: 'column', justifyContent: 'center'}}>
      <img src={invertedLogo} style={{marginBottom: '50px', height: '80px'}}/>
      <NavLinks />
      </div>
      <BlockButton text="Log Out" backgroundColor="var(--tertiary-color)" color="white"/>
    </Sidebar>
  )
}