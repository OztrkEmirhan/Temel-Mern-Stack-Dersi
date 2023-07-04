
import {useNotContext} from '../hooks/useNotContext'
import { useAuthContext } from '../hooks/useAuthContext'

import moment from 'moment'
import 'moment/locale/tr'

const NotDetay=({not})=>{

  const {dispatch}=useNotContext();
  const {kullanici}=useAuthContext();

  //moment.locale('tr')


  const handleClick= async ()=>{

    if(!kullanici){
      return
    }
    
    const response=await fetch('/api/notlar/'+not._id,{
      method:'DELETE',
      headers:{
        'Authorization':`Bearer ${kullanici.token}`
      }
    })

    const json=await response.json()

    if(response.ok){
      dispatch({type:'NOT_SIL',payload:json})
    }
  }

  return (
    <div className="not-detay">
      <h4>{not.baslik}</h4>
      <p>{not.aciklama}</p>
      <p className='zaman'>{moment(new Date(not.createdAt)).fromNow()}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )

}


export default NotDetay
