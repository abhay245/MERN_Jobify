import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import Logo from '../Components/Logo'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
  <Wrapper>
    <nav><Logo/></nav>
    <main>
        <div className='container page'>
        <div className='info'>
{/* Info */}
            <h1>job <span>tracking </span> app </h1>
            <p>
            Welcome to Jobify, the ultimate job tracking application. 
            Say goodbye to scattered notes and missed opportunities. 
            With Jobify, you can effortlessly organize and track your job applications,
             interviews, and follow-ups all in one place. Stay on top of your career game 
             with Jobify's intuitive interface and never miss a step again.
            </p>
           <Link to='/register'><button className='btn btn-hero'>Login/Register</button></Link> 
        </div>
{/* Image */}
        <img src={main} alt="job-hunt" className='img main-img'/>
        </div>
    </main>
  </Wrapper>
  )
}

export default Landing