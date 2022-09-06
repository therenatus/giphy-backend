import { UserModel } from "../model/userModel.js";
import bcrypt from 'bcrypt';
import { generateJwt } from "../config/generateJwt.js";

class UserController {
    async signUp(req, res) {
        try {
            const { name, email, passwords } = req.body;
            const hasUser =await UserModel.findOne({email: req.body.email});
            console.log(hasUser)
            if(hasUser) {
                return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
            }
            const hashPassword = await bcrypt.hash(passwords, 7);
            const user = new UserModel({email, name, password: hashPassword});
            const userData = await user.save();
            const { password, ...profile } = userData._doc;

            const token = generateJwt(userData._id);
            res.json({user: profile, token})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'registration error'})
        }
    }

    async login( req, res ) {
        try {
            const hasUser = await UserModel.findOne({email: req.body.email}).select('+password');
            console.log(hasUser)
            if(!hasUser){
                return res.status(404).json({message:'Not found'})
            }
            const validPassword = await bcrypt.compare(req.body.password, hasUser.password);
            console.log(validPassword)
            if(!validPassword){
                return res.status(404).json({message:'Invalid login or password'})
            }
            const token = generateJwt(hasUser._id);
            const { password, ...user } = hasUser._doc;
            res.json({user, token})
        } catch (error) {
            console.log(error)
            res.status(400).json({message:'auth error'})
        }
    }
}

export { UserController }