
import {FaEnvelope,FaIdBadge} from 'react-icons/fa'

export default function EgitmenBilgi({egitmen}) {

  return <>
    <h5 className='mt-5'>Egitmen Bilgileri</h5>
    <ul className='list-group'>
        <li className='list-group-item'>
            <FaIdBadge /> 
        </li>
        <li className='list-group-item'>
            <FaEnvelope />  
        </li>
    </ul>
  </>
}