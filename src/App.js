import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap'
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
      <Col xs={12} sm={12} md={12} lg={12}>
        {
          posts.map(post =>{
            let postComments = comments.find(comments => comments.id === post.id)
            if(postComments === undefined)
              postComments = []
            else
              postComments = postComments.comments
            return(
              <Container key={post.id} className="mt-3">
                <h2>{post.title}</h2>
                <h4>{post.body}</h4>
                {
                  postComments.length > 0
                  ? <React.Fragment>
                    {
                      postComments.map(comment =>(
                        <Container key={comment.id}>
                          <p>{comment.name}</p>
                          <p>{comment.email}</p>
                          <p>{comment.body}</p>
                        </Container>
                      ))
                    }
                    <button onClick={e => removeComments(post.id)}>Hide comments</button> 
                  </React.Fragment>
                    
                  
                  :  <button onClick={e => getComments(post.id)}>Show comments</button> 
                }
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
