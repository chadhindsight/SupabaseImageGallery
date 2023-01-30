import './App.css';
import { useState, useEffect } from 'react';
import './App.css';
import { Container, Form, Button, FormControl, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { v4 as uuidv4 } from 'uuid';

const CDNURL = "https://ahefnrxrupduqwrwinft.supabase.co/storage/v1/object/public/images";

function App() {
  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]);
  const user = useUser();
  const supabase = useSupabaseClient();

  async function getImages() {
    const { data, error } = await supabase
      .storage
      .from('images')
      .list(`${user?.id}/`, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" }
      });

    if (data !== null) {
      setImages(data)
    } else {
      console.log(error)
    }

  }

  useEffect(() => {
    if (user) {
      getImages()
    }
  }, [user]);

  async function magicLinkLogin() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email
    })

    if (error) {
      alert("There was an error communicating with Supabase, double check email")
      console.log(error);
    } else {
      alert("Check your email for a Supabase Magic Link to log in")
    }
  }

  async function signUserOut() {
    const { error } = await supabase.auth.signOut();
  }

  async function uploadImage(event) {
    let file = event.target.files[0];

    const { data, error } = await supabase
      .storage
      .from('images')
      .upload(`${user.id}/${uuidv4()}`, file)

    if (data) {
      getImages()
    } else {
      console.log(error)
    }
  }

  return (
    <Container align="center" className="container-sm mt-4">
      {user === null ?
        <>
          <h1>Welcome to your Image Wall</h1>
          <Form onSubmit={() => magicLinkLogin()}>
            <Form.Group className="mb-3" style={{ maxWidth: "500px" }}>
              <Form.Label>Enter an email to sign in with a Supabase Magic Link</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={() => magicLinkLogin()}>Get Magic Link</Button>
          </Form>
        </>
        :
        <>
          <h1>Your Image Wall </h1>
          <p><strong>Current user:</strong> {user.email} is logged in</p>
          <Button onClick={() => signUserOut()}>Sign Out</Button>
          <p>Choose a file to be uploaded to your gallery</p>
          <Form.Group className="mb-3" style={{ maxWidth: "500px" }}>
            <Form.Control type="file" accept="image/png" onChange={(e) => uploadImage(e)} />
          </Form.Group>
          <hr />
          <h3>Your Images</h3>
          <Row xs={1} md={3} className="g-4">
            {
              images.map(image => {
                return (
                  <Col key={`${CDNURL}${user.id}/${image.name}`}>
                    <Card>
                      <Card.Img variant="top" src={`${CDNURL}${user.id}/${image.name}`} />
                      <Card.Body>
                        {/* <Button variant="danger" onClick={}>Delete Image</Button> */}
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
        </>
      }
    </Container>
  );
}

export default App;
