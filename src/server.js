// Dependencies
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import session from "express-session"
import path from "path";
import cors from "cors"
import { IS_DEV, PORT } from "@/config/server"
import { SECRET } from "@/config/session"
import connection from "@/db/connection"
import createRoutes from "@/routes";

const app = express();

var sess = {
    secret: SECRET,
    cookie: {},
    saveUninitialized: false,
    resave: false
}
  
if ( !IS_DEV ) {
    app.set( "trust proxy", 1 ) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

// Middleware
app.use( session( sess ) )
app.use( cors() )
app.use( json() );
app.use( urlencoded( { extended: false } ) );
app.use( express.static( path.join( __dirname, "static" ) ) );

app.use( morgan( "dev" ) );

// Set the routes
createRoutes( app )

const initServer = async () => {
    try {
        await connection()
        await app.listen( PORT );
        console.log( `[OK] The server is listening on port ${ PORT }` );
    } catch( e ) {
        console.error( e )
    } 
}

initServer()