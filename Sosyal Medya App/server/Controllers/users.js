import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';

import User from '../Modells/user.js';

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const kullanici=await User.findOne({email})

        if(!kullanici) return res.status(404).json({message:'Kullanıcı Bulunamadı'})

        const parolaKontrolSonuc=await bcrypt.compare(password,kullanici.password);

        if(!parolaKontrolSonuc) return res.status(400).json({message:'Parolayı doğru giriniz'})

        const token=jwt.sign({email:kullanici.email,id:kullanici._id},'aos-secret-code',{expiresIn:'3h'})

        res.status(200).json({result:kullanici,token})
    }catch (error) {
        res.status(500).json({ message: "Something went wrong"});
    }
}
  

const signup = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;

    try {
        const kullanici = await User.findOne({ email });
        if(kullanici) return res.status(400).json({message:'Kullanıcı zaten var'})

        if(password!==confirmPassword) return res.status(400).json({message:'Parolalar eşleşmiyor'})

        const hashedPassword=await bcrypt.hash(password,12);
        const result=await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})

        const token=jwt.sign({email:result.email,id:result._id},'aos-secret-code',{expiresIn:'3h'})

        res.status(200).json({result,token})
    } catch (error) {
        res.status(500).json({ message: "Something went wrong"});
    }
}

export { signin, signup};