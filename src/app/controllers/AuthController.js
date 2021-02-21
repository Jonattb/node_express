import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import moment from "moment"
import { v1 as uuidv1 } from "uuid";
import User from "@/app/models/User"
import { JWT_SECRET, JWT_EXPIRES_IN } from "@/config/auth"
const Controller = {};

/**
 * Login
 */
Controller.login = async ( req, res ) => {
    try {
        
        const {
            email,
            password,
        } = req.body;

        const user = await User.findOne( {
            email
        } );

        if( user ){
            const compare = await bcrypt.compareSync( password, user.password );
        
            if( compare ){
                let token = await JWT.sign( {
                    id: user._id
                }, JWT_SECRET, {
                    expiresIn: JWT_EXPIRES_IN
                } );

                user.lastSignIn = moment().toDate()

                const refreshToken = uuidv1()

                user.refreshToken = refreshToken;

                await user.save()

                return res.status( 200 ).json( {
                    token: {
                        access: token,
                        refresh: refreshToken
                    }
                } );
            }
            else {
                return res.status( 422 ).json( {
                    inputs: {
                        password: "La contraseña es incorrecta. Vuelve a intentarlo o haz clic en \"¿Olvidaste la contraseña?\" para restablecerla."
                    }
                } )
            }
        } else {
            return res.status( 422 ).json( {
                inputs: {
                    email: "El correo electrónico ingresado no existe"
                }
            } )
        }

    } catch ( error ) {
        console.error( error )
        res.status( 500 ).json( {
            error
        } );
    }
}

/**
 * Refresh token
 */
Controller.refresh = async ( req, res ) => {
    try {
        const { refreshToken } = req.body

        const user = await User.findOne( {
            refreshToken,
        } )

        if( user ){
            let token = await JWT.sign( {
                id: user._id
            }, JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN
            } );
    
            const newRefreshToken = uuidv1()
    
            user.refreshToken = newRefreshToken;
    
            await user.save()
    
            return res.status( 200 ).json( {
                token: {
                    access: token,
                    refresh: newRefreshToken
                }
            } );
        } else {
            return res.sendStatus( 403 )
        }
    } catch ( error ) {
        console.error( error )
        res.status( 500 ).json( {
            error
        } );
    }
}

export default Controller;