import logo from '../assets/logo.png'
import { BiUserPlus,BiHome } from "react-icons/bi";
import {Link} from 'react-router-dom'


const Navbar = () => {

  return (

    <div className='flex'>
      <div className={` w-72 bg-blue-700 relative duration-300 drop-shadow-lg h-screen`}>
          <div className="flex gap-x-4 items-center mt-0">
            <img
              src={logo}
              className={`w-fit h-18`}
            />
          </div>
          
          <Link to="/" className={`flex mt-3 h-3 p-8 cursor-pointer hover:bg-slate-200 text-gray-50 text-sm items-center gap-x-4 no-underline`}>
              <BiHome size='2rem'/>
              <span className={`origin-left`}>
                  Home
              </span>
          </Link>
          <Link to="/createTeacher" className={`flex mt-3 h-3 p-8 cursor-pointer hover:bg-slate-200 text-gray-50 text-sm items-center gap-x-4 no-underline`}>
              <BiUserPlus size='2rem'/>
              <span className={`origin-left`}>
                  Alta profesor
              </span>
          </Link>
      </div>
      
    </div>
    
  )
}

export default Navbar