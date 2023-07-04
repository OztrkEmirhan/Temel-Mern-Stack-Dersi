
import { gql } from "@apollo/client";

const DELETE_EGITMEN = gql`
    mutation egitmenSil($id: ID!){
            egitmenSil(id: $id){
                id,isim,email
        }
    }
`
const ADD_EGITMEN = gql`
    mutation egitmenEkle($isim: String!, $email: String!){
        egitmenEkle(isim: $isim, email: $email){
            id,isim,email
        }
    }
`

export {DELETE_EGITMEN, ADD_EGITMEN}