import {gql} from "@apollo/client"

const GET_EGITMEN = gql`
    query getEgitmenler{
        egitmenler{
            id,isim,email
        }
    }
`

export {GET_EGITMEN}