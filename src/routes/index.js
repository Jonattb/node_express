import routeV1 from "@/routes/v1"
import routeV2 from "@/routes/v2"

export default ( app ) => {

    app.get( "/", function( req, res ){
        res.send( "API Server is OK :)" );
    } )


    app.use( "/v1", routeV1 );


    // Next...
    app.use( "/v2", routeV2 );
}