// Dependencies
import mongoose from "mongoose";

// Get the mongo uri
const { MONGO_URI } = require( "@/config/database" );

// Set the promise
// INV: Promesas en mongoose
// mongoose.Promise = global.Promise;

export default async () => {
	try {
		await mongoose.connect( MONGO_URI , {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		} );

		console.log( "[OK] Connected to the database." );

	} catch( err ){
		console.log( `[ERROR] Could not connect to the database. ${ err || "" }` );
	}
}