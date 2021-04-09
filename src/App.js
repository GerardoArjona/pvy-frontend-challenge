import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

import './App.css';

function App() {

  const [posts, setPosts] = useState([])

  useEffect(()=>{
    getPosts()
	},[])

  const getPosts = () =>{
    axios.get(`${process.env.REACT_APP_API}/posts`)
    .then(res =>{
      setPosts(res.data)
    })
  }

  return (
    <div className="App">
    <Row>
      <Col xs={12} sm={12} md={12} lg={12}>
        {
          posts.map(post =>(
            <React.Fragment key={post.id}>
              <h2>{post.title}</h2>
              <h4>{post.body}</h4>
            </React.Fragment>
          ))
        }
      </Col>
    </Row>
    </div>
  );


}

export default App;
