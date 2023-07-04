/* eslint-disable jsx-a11y/aria-props */
/* eslint-disable no-undef */
import { useState } from "react"
import { useMutation } from "@apollo/client"
import {FaUser} from "react-icons/fa"
import { ADD_EGITMEN } from "./Mutations/egitmenMutation"
import { GET_EGITMEN } from "./Queries/egitmenQueries"

export default function EgitmenEkle() {

    const [isim, setIsim] = useState("")
    const [email, setEmail] = useState("")

    const [egitmenEkle] = useMutation(ADD_EGITMEN,{
        variables:{isim, email},
        refetchQueries: [{query: GET_EGITMEN}],
        onCompleted: (data) => {
            console.log("Eğitmen başarıyla eklendi:", data)
            setEmail("")
            setIsim("")
            document.getElementsByClassName("modal-backdrop")[0].remove()
            document.getElementById("egitmenEkleModal").classList.remove("show")
        },
        
        onError: (error) => {
            console.log("Eğitmen eklerken bir hata oluştu:", error)
        }
    })
    

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(isim==="" || email==="") {
            alert("Lütfen tüm alanları doldurunuz.")
            return false
        }
        // console.log(isim,email)

        egitmenEkle(isim,email)
        setEmail("")
        setIsim("")
    }
    

    return(
        <div className="text-center">
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#egitmenEkleModal">
                <div className="d-flex align-items-center">
                        <FaUser className="icon" />
                        <div>
                            EgitmenEkle
                        </div>
                </div>
            </button>

            <div className="modal fade" id="egitmenEkleModal" aria-aria-labelledby="egitmenEkleModalLabel" aria-hidden="true">

                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Egitmen Ekle</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="isim" className="form-label">İsim</label>
                                        <input
                                        value={isim}
                                        onChange={(e) => setIsim(e.target.value)}
                                        type="text" className="form-control" id="isim" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" className="form-control" id="email" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Ekle</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>  
        </div>
    )
}
