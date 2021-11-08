/* @flow */
import React, { useEffect, useState } from 'react'
import { Row, Col, Rate, Tag } from 'antd'
import YouTube from 'react-youtube'

import Utils from '../../Services/utilsService'
import Api from '../../Services/dataService'
import './Movie.css'
import { useQuery } from 'react-query';

const Movie = (props) =>  {
    const idFilm = parseInt(props.match.params.id, 10);
    const [name, setName] = useState();
    const [urlImage, setUrlImage] = useState();
    const [stars, setStars] = useState();
    const [description, setDescription] = useState();
    const [genres, setGenres] = useState();
    const [releaseDate, setReleaseDate] = useState();
    const [videoId, setVideoId] = useState();

    const { isLoading, error, data } = useQuery('movieData', () =>
    Api.getMovieById(idFilm).then(res =>
       res
     )
   )

   useEffect(() => {
     if(data) {
      setDescription(data.overview);
      setGenres(data.genres);
      setName(data.title);
      setReleaseDate(data.release_date);
      setStars(data.vote_average / 2);
      setUrlImage(data.poster_path);
      setVideoId(data.videos.results.find(({key}) => key));
     }
   },[data])

   if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message
    // Api.getMovieById(idFilm)
    //     .then(data => {
    //       console.log('dataApi', data)
    //       this.setState({
    //         urlImage: data.poster_path,
    //         name: data.title,
    //         stars: data.vote_average / 2,
    //         description: data.overview,
    //         genres: (data.genres),
    //         release_date: data.release_date,
    //         videoId: data.videos.results.find(({key}) => key)
    //       })
    //     })

    return (
      <Row>
        <Col span={8} offset={1}>
          <img alt={name} width='85%' src={`https://image.tmdb.org/t/p/w500${urlImage}`} />
        </Col>
        <Col span={12} offset={1}>
          <h1>{name}</h1>
          <hr />
          <strong> Description: </strong>
          <p>{description}</p>
          <hr />
          <div className='genere'>
            <span className='genereTitle'>
              <strong>Generes: </strong>
            </span>
            {/* {genres.map(genere => <Tag color={Utils.randomColor()} key={genere.id}>{genere.name}</Tag>)} */}
          </div>
          <Rate className='rate' value={stars} />
          <hr />
          <div className='trailer'>
            <strong> Trailer: </strong>
          </div>
          {console.log(videoId)}
          {videoId && <YouTube videoId={videoId.key} /> || <></>}
        </Col>
      </Row>
    )
}

export default Movie;