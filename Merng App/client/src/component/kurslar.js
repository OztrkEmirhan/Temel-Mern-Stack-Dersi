import Spinner from "./spinner"
import { useQuery } from "@apollo/client"
import { GET_KURS } from "./Queries/kursQueries"
import KursCard from "./kursCard"


export default function kurslar() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loading, error, data} = useQuery(GET_KURS)
    
    if(loading) return <Spinner />
    if(error) return <div>Hata oluştu</div>


  return <>
    {data.kurslar.length > 0 ? (
      <div className="row mt-4">
        {data.kurslar.map(k => (
          <KursCard kurs={k} key={k.id} />
        ))}
      </div>
    ) : (<p>Kurs bulunamadı</p>)}
  </>
}
