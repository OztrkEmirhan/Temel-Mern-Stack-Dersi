import { gql } from "@apollo/client";

const GET_KURS = gql`
    query getKurslar{
        kurslar{
            id,isim,aciklama,durum
        }
    }
`

const GET_KURS_DETAY = gql`
    query getKursDetay($id:ID!){
        kurs(id:$id){
            id,
            isim,
            aciklama,
            durum,
            egitmen{
                id,
                isim,
                email
            }
        }
    }
`

export {GET_KURS, GET_KURS_DETAY}