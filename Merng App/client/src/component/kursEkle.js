/* eslint-disable react-hooks/rules-of-hooks */
import { FaList } from "react-icons/fa"
import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { GET_EGITMEN } from "./Queries/egitmenQueries"
import { GET_KURS } from "./Queries/kursQueries"
import { ADD_KURS } from "./Mutations/kursMutation"


export default function kursEkle() {

    const [isim,setIsim]=useState('')
    const [aciklama,setAciklama]=useState('')
    const [durum,setDurum]=useState('plan')
    const [egitmenId,setEgitmenId]=useState('')

    const {loading,error,data}=useQuery(GET_EGITMEN)

    const [kursEkle]=useMutation(ADD_KURS,{
      variables:{isim,aciklama,durum,egitmenId},
      refetchQueries:[{query:GET_KURS}]
    })

    const onSubmit=(e)=>{

        e.preventDefault();
         
        if(isim==='' || aciklama===''){
            return alert('Lütfen alanları doldurunuz')
        }

        //console.log(isim,aciklama,durum,egitmenId);
        kursEkle()

        setIsim('')
        setAciklama('')
        setDurum('plan')
        setEgitmenId('')

    }

    if(loading) return null
    if(error) return 'BİR HATA OLUŞTU'


  return (
    <>
    {!loading && !error && (
      <div className='text-center'>
        <button
          type='button'
          className='btn btn-warning'
          data-bs-toggle='modal'
          data-bs-target='#kursEkleModal'
        >
          <div className='d-flex align-items-center'>
            <FaList className='icon' />
            <div>Kurs Ekle</div>
          </div>
        </button>
  
        <div
          className='modal fade'
          id='kursEkleModal'
          aria-labelledby='kursEkleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='kursEkleModalLabel'>
                  Kurs
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <form onSubmit={onSubmit}>
                  <div className='mb-3'>
                    <label className='form-label'>İsim</label>
                    <input
                      type='text'
                      className='form-control'
                      id='isim'
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
                      <option value="plan">Planlanıyor</option>
                      <option value="olus">Oluşturuluyor</option>
                      <option value="yayin">Yayında</option>
                    </select>
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Eğitmenler</label>
                    <select className='form-select' id="egitmenId" value={egitmenId} onChange={(e)=>setEgitmenId(e.target.value)}>
                      <option value="" disable="true">Eğitmen Seç</option>
                      {data.egitmenler.map(e=>(
                        <option key={e.id} value={e.id}>
                          {e.isim}
                        </option>
                      ))}
                    </select>
                  </div>
  
                  <button
                    type='submit'
                    data-bs-dismiss='modal'
                    className='btn btn-warning'
                  >
                    EKLE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      </>
    )
}
