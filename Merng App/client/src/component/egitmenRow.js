import { DELETE_EGITMEN } from "./Mutations/egitmenMutation"
import { useMutation } from "@apollo/client"
import { GET_EGITMEN } from "./Queries/egitmenQueries"

export default function EgitmenRow({egitmen}) {

    const [egitmenSil] = useMutation(DELETE_EGITMEN,{
        variables: {id: egitmen.id},refetchQueries: [{query: GET_EGITMEN}]
    })

    return (
        <tr>
            <td>{egitmen.isim}</td>
            <td>{egitmen.email}</td>
            <td>
                <button onClick={egitmenSil} className="btn btn-danger btn-sm">Çöp Kutusu</button>
            </td>
        </tr>
    )
}