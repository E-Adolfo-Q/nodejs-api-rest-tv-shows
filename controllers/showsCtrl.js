import request from 'request'
import async from 'async'
import Shows from '../models/shows'

const numTvShows = 1000; 

let getShows = (req,res,next) => {  
  async.timesLimit(numTvShows,2, (i, callback) => {    
    setTimeout(function(){
        const options = {
            url:'http://api.tvmaze.com/shows/'+(i+1)+'?embed[]=episodes&embed[]=cast'
        }                       
        request(options,(error,response,body) => {            
           let result = JSON.parse(body)                    
           let data = {
               id: result.id,
               name: result.name,
               image: result.image ? result.image.original : null,
               details:{
                   genres: result.genres,
                   year: result.premiered,
                   description: result.summary,
                   cast: result._embedded ? result._embedded.cast: null, 
                   episodes : result._embedded ? result._embedded.episodes : null,
               } 
           }          
           console.log(i)
           callback(null,data)           
        })
    },1000)    
  }, (err,results) => {      
      results.map((items) => {         
        const show = new Shows(items)
        show.save()
    })
  })
  return next()
}

let getShowsGenre = (req,res,next) => { 
   Shows.find({'details.genres':{$in : [req.params.id]}},(err,shows) => {       
        res.json(shows)
   }) 
}

export { getShows , getShowsGenre }