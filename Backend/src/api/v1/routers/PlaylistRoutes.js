const Routers = require('express').Router();

//--------------------------- Middlewares Specific Stuff ---------------------------------X
const FetchUser = require('../middlewares/FetchUser');

//------------------ Controllers Specific Stuff-------------------------X
const PlaylistController = require('../controllers/PlyalistController');


//----------------------- INitizlalzing playlist apis's routes here -------------------X
//Playlist  CRUD
Routers.get('/fetchPlaylist', FetchUser, PlaylistController().fetchPlaylist); //Fetch all the lectures or videos in a playlist, using GET '/api/playlist/fetchPlaylist'
Routers.put('/addToPlaylist/:id', FetchUser, PlaylistController().addToPlaylist); //Add a video in a playlist ,using PUT '/api/playlist/addToPlaylist/id'
Routers.delete('/removeToPlaylist/:id', FetchUser, PlaylistController().removeToPlaylist); //delete a course, using POST '/api/playlist/removeToPlaylist/id'

module.exports = Routers;