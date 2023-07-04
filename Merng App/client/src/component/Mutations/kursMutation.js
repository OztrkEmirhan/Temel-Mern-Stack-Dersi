import { gql } from "@apollo/client";

const ADD_KURS = gql`

    mutation kursEkle($isim:String!,$aciklama:String!,$durum:KursDurumlar!,$egitmenId:ID!){
        kursEkle(isim:$isim,aciklama:$aciklama,durum:$durum,egitmenId:$egitmenId){
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

const DELETE_KURS = gql`
    mutation kursSil($id:ID!){
        kursSil(id:$id){
            id
        }
    }
`

const UPDATE_KURS = gql`
    mutation kursGuncelle($id:ID!,$isim:String!,$aciklama:String!,$durum:KursGuncellemeDurumlar!){
        kursGuncelle(id:$id,isim:$isim,aciklama:$aciklama,durum:$durum){
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

export {ADD_KURS, DELETE_KURS, UPDATE_KURS}
