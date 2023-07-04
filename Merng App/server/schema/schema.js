
const Kurs = require('../models/kurs.js');
const Egitmen = require('../models/egitmen.js');
const Yetkili = require('../models/yetkili.js');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLEnumType} = require('graphql');

const EgitmenType = new GraphQLObjectType({
    name: 'Egitmen',
    fields: () => ({
        id: {type: GraphQLID},
        isim: {type: GraphQLString},
        email: {type: GraphQLString},
    }),
});

const KursType=new GraphQLObjectType({
    name:'Kurs',
    fields:()=>({
        id:{type:GraphQLID},
        isim:{type:GraphQLString},
        aciklama:{type:GraphQLString},
        durum:{type:GraphQLString},
        egitmen:{
            type:EgitmenType,
            resolve(parent,args){
                return Egitmen.findById(parent.egitmenId)  
            }
        }
    })
})

const YetkiliType = new GraphQLObjectType({
    name: 'Yetkili',
    fields: () => ({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        egitmen: {
            type: EgitmenType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Egitmen.findById(args.id);
            }
        },
        egitmenler: {
            type: new GraphQLList(EgitmenType),
            resolve(parent, args) {
                return Egitmen.find();
            }
        },
        kurs:{
            type:KursType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Kurs.findById(args.id);
            }
        },
        kurslar:{
            type:new GraphQLList(KursType),
            resolve(parent,args){
                return Kurs.find();
            }
        },
    }
});

const RootMutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        egitmenEkle:{
            type:EgitmenType,
            args:{
                isim:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                const egitmen=new Egitmen({
                    isim:args.isim,
                    email:args.email
                });
                return egitmen.save();
            }
        },
        egitmenSil:{
            type:EgitmenType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return Egitmen.findByIdAndRemove(args.id);
            }
        },
        kursEkle:{
            type:KursType,
            args:{
                isim:{type:new GraphQLNonNull(GraphQLString)},
                aciklama:{type:new GraphQLNonNull(GraphQLString)},
                durum:{
                    type:new GraphQLEnumType({
                        name:'KursDurumlar',
                        values:{
                            "yayin":{value:'Yayında'},
                            "olus":{value:'Oluşturuluyor'},
                            "plan":{value:'Planlanıyor'}
                        }
                    }),
                    defaultValue:'Planlanıyor'
                },
                egitmenId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                const kurs=new Kurs({
                    isim:args.isim,
                    aciklama:args.aciklama,
                    durum:args.durum,
                    egitmenId:args.egitmenId
                });
                return kurs.save();
            }
        },
        kursSil:{
            type:KursType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return Kurs.findByIdAndRemove(args.id);
            }
        },
        kursGuncelle:{
            type:KursType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLID)},
                isim:{type:GraphQLString},
                aciklama:{type:GraphQLString},
                durum:{
                    type:new GraphQLEnumType({
                        name:'KursGuncellemeDurumlar',
                        values:{
                            "yayin":{value:'Yayında'},
                            "olus":{value:'Oluşturuluyor'},
                            "plan":{value:'Planlanıyor'}
                        }
                    }),
                }
            },
            resolve(parent,args){
                return Kurs.findByIdAndUpdate(args.id,{
                    $set:{
                        isim:args.isim,
                        aciklama:args.aciklama,
                        durum:args.durum

                    }
                },{new:true});
            }
        },
        yetkiliEkle:{
            type:YetkiliType,
            args:{
                email:{type:new GraphQLNonNull(GraphQLString)},
                password:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                const yetkili=new Yetkili({
                    email:args.email,
                    password:args.password
                });
                return yetkili.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:RootMutation
});

