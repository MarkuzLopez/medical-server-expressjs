const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,{
                expiresIn: '12h',                
            },  
            
            (err, token ) => { 
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                } else { 
                    resolve(token);                    
                }
            });
    })
}

const validarJwt = (req, res, next) => {

    const token  = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }
    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;        
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }    

}

module.exports = { 
    generarJWT,
    validarJwt
}