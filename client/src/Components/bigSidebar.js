import { useAppContext } from '../context/appContext'
import { Navlink } from './NavLink'
import Logo from '../Components/Logo'
import Wrapper from '../assets/wrappers/BigSidebar'
export const BigSidebar = () => {
  const {showSidebar}=useAppContext();
  return (
    <Wrapper>
      <div className={showSidebar?'sidebar-container':'sidebar-container show-sidebar'}>
        <div className='content'>
          <header>
            <Logo/>
          </header>
          <Navlink/>
        </div>
      </div>
    </Wrapper>
  )
}
