const express = require( 'express' );
const path = require( 'path' );
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );
const passport = require( 'passport' );

const config = require( './config/database' );
const user = require( './routes/users' );

const port = process.env.PORT || config.LOCAL_PORT;

// Connect to the database
mongoose.connect( config.dbPath + config.dbName );

// On connection
mongoose.connection.on( 'connected', () => {
    console.log( 'Connected to database ' + config.dbName );
} );

// On error
mongoose.connection.on( 'error', ( err ) => {
    console.log( 'Database Error: ' + err );
} );

// Initialize the app
const app = express();


// Middleware
app.use( cors() );
app.use( bodyParser.json() );

// Set static folder
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Routes
app.use( '/users', user );

// Index Route
app.get( '/', ( req, res ) => {
    res.send( 'Invalid Endpoint' );
} );

// Start server
app.listen( port, () => {
    console.log( 'Server started on ' + port );
} );