import {Link} from 'react-router-dom';
import error_img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage'
export const Error = () => {
  return(
    <Wrapper className='full-page'>
      <div>
        <img src={error_img} alt='not found'/>
        <h3>text</h3>
        <p>text</p>
        <Link to='/'>Back Home</Link>
      </div>
    </Wrapper>
  )
}
