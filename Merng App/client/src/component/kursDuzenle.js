import { useState } from "react"
import { useMutation } from "@apollo/client"

import {GET_KURS} from './Queries/kursQueries'
import { UPDATE_KURS } from "./Mutations/kursMutation"

export default function KursDuzenle({kurs}) {


    const [isim,setIsim]=useState(kurs.isim)
    const [aciklama,setAciklama]=useState(kurs.aciklama)
    const [durum,setDurum]=useState(()=>{
        switch (kurs.durum) {
            case "Planlanıyor":
                return "plan"
            case "Oluşturuluyor":
                return "olus"
            case "Yayında":
                return "yayin"
            default:
                throw new Error('Bilinmeyen Durum')
        }
    })

    const [kursGuncelle]=useMutation(UPDATE_KURS,{
      variables:{id:kurs.id,isim,aciklama,durum},
      refetchQueries:[{query:GET_KURS}]
    })

    const handleSubmit=(e)=>{
        e.preventDefault();
         
        if(!isim || !aciklama || !durum){
            return alert ("Alanlar boş geçilemez")
        }

        //console.log(isim,aciklama,durum);
        kursGuncelle()
    }


    return (
        <div className="mt-5">
          <h3>Kurs Detayını Güncelle</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">İsim</label>
              <input
                type="text"
                className="form-control"
                id="isim"
                value={isim}
                onChange={(e) => setIsim(e.target.value)}
              />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Açıklama</label>
                <input
                type='aciklama'
                className='form-control'
                id='aciklama'
                value={aciklama}
                onChange={(e) => setAciklama(e.target.value)}
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Durum</label>
                <select className='form-select' id="durum" value={durum} onChange={(e)=>setDurum(e.target.value)}>
                <option value="plan">planlanıyor</option>
                <option value="olus">oluşturuluyor</option>
                <option value="yayin">yayında</option>
                </select>
            </div>
    
            <button type="submit" className="btn btn-primary">
              Güncelle
            </button>
          </form>
        </div>
      );
}