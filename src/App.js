import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'

import './App.css';

function App() {

  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])

  useEffect(()=>{
    getPosts()
	},[])

  const getPosts = () =>{
    axios.get(`${process.env.REACT_APP_API}/posts`)
    .then(res =>{
      setPosts(res.data)
    })
  }

  const getComments = (postId) =>{
    setComments([])
    axios.get(`${process.env.REACT_APP_API}/comments?postId=${postId}`)
    .then(res =>{
      let tempComments = comments
      tempComments.push(
        {
          id: res.data[0].postId,
          comments: res.data
        }
      )
      setComments(tempComments)
    })
  }

  const removeComments = (postId) =>{
    let tempComments = comments
    tempComments = tempComments.filter(comments => comments.id !== postId)
    setComments(tempComments)
  }

  return (
    <div className="App">
    <Row>
      <Col xs={12} sm={12} md={{span: 4, offset:4}} lg={{span: 4, offset:4}}>
        {
          posts.map(post =>{
            let postComments = comments.find(comments => comments.id === post.id)
            if(postComments === undefined)
              postComments = []
            else
              postComments = postComments.comments
            return(
              <Container key={post.id} className="mt-3">
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {post.body}
                  </Card.Text>
                </Card.Body>
                {
                  postComments.length > 0
                  ? <React.Fragment>
                    <hr></hr>
                    {
                      postComments.map((comment, index) =>(
                        <React.Fragment key={comment.id}>
                          {index > 0 ? <hr></hr> : <React.Fragment></React.Fragment>}
                          <Container key={comment.id}>
                              <Row>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                  <p>{comment.name}</p>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                  <p>{comment.email}</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                  <p>{comment.body}</p>
                                </Col>
                              </Row>
                          </Container>
                        </React.Fragment>
                      ))
                    }
                    <button onClick={e => removeComments(post.id)}>Hide comments</button> 
                  </React.Fragment>
                    
                  
                  :  <button onClick={e => getComments(post.id)}>Show comments</button> 
                }
              </Card>
              </Container>
            )
          }
            
          )
        }
      </Col>
    </Row>
    </div>
  );


}

export default App;
