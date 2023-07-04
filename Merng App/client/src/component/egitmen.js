import {useQuery, } from "@apollo/client"
import EgitmenRow from "./egitmenRow"
import {GET_EGITMEN} from "./Queries/egitmenQueries"
import Spinner from "./spinner"

export default function Egitmen() {

    const {loading, error, data} = useQuery(GET_EGITMEN)

    if(loading) return <Spinner />
    if(error) return <p>Error :</p>

    console.log(data)
    
    return(
    <> {!loading && !error &&(
        <table className="table table-hover mt-3">
            <thead>
                <tr>
                    <th scope="col">İsim</th>
                    <th scope="col">Email</th>
                    <th scope="col">İşlemler</th>
                </tr>
            </thead>
            <tbody>
                {data.egitmenler.map(e => (
                    <EgitmenRow key={e.id} egitmen={e} />
                ))}
            </tbody>
        </table>    
    )}
     
    </>
    )
}