import React, { Component, useEffect, useState } from 'react'
import CardTemplate from '../CardTemplate/CardTemplate'
import Api from '../../Services/dataService.js'
import { Row, Col } from 'antd'
import uuidv4 from 'uuidv4'
import './Showfilms.css'
import { useQuery } from 'react-query';

const Showfilms = (props) => {

  const [results, setResults] = useState([]);
  const { data: data1, refetch: refetch1 } = useQuery('showFilmSearch', () =>
    Api.getSearch(props.match.params.query)
      .then(res =>
          res
        ),
        {
          enabled: false
        }
      )
  
  const {data: data2, refetch: refetch2 } = useQuery('showFilm', () =>
      Api.getMovies(props.category)
      .then(res =>
          res
        ),
        {
          enabled: false
        }
      )

  useEffect(() => {
    if(data1) {
      setResults(data1.results);
    }
    if(data2) {
      setResults(data2.results);
    }
  },[data1, data2])
   
  const handleApiCall =  () =>  {
    if (props.match.params.query) {
      console.log('done');
      refetch1();
      // Api.getSearch(props.match.params.query)
      //     .then(data => {
      //       this.setState({
      //         results: data.results
      //       })
      //     })
    } else {
      refetch2();
      // Api.getMovies(props.category)
      //     .then(data => {
      //       this.setState({
      //         results: data.results
      //       })
      //     })
    }
  }

  useEffect(() => {
    handleApiCall();
  },[]);

    return (
      <div>
        <Row>
          {/* <Col span={12} offset={6}>
            <h1 className='title'>{ currentPage } </h1>
          </Col> */}
        </Row>
        <Row gutter={24}>
          {
            results.map(film => {
              return (
                <Col className='gutter-row' span={5} offset={1} key={uuidv4}>
                  <CardTemplate
                    name={film.title}
                    date={film.release_date}
                    vote={film.vote_average}
                    image={film.poster_path}
                    id={film.id}
                  />
                </Col>
              )
            })
          }
        </Row>
      </div>
    )
  }

export default Showfilms;
