import express from 'express'
import { getShows, getShowsGenre } from '../controllers/showsCtrl'

const api = express.Router()

api.get('/all', getShows)
api.get('/shows/:id', getShowsGenre)

export default api   