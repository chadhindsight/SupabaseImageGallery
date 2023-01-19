import './App.css';
import { useState, useEffect } from 'react';
import './App.css';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

function App() {
  const [email, setEmail] = useState("");
  const user = useUser();
  const supabase = useSupabaseClient();

  async function magicLinkLogin() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email
    })

    if (error) {
      alert("There was an error communicating with Supabase, double check email")
      console.log(error);
    } else {
      alert("Check your email for a Supabase Magic Link to log in")
    }
  }

  return (
    <Container align="center" className="container-sm mt-4">
      {
        //Negative case
        <>
          <h1>Welcome to your Image Wall</h1>
          <Form>
            <Form.Group>
              <Form.Label>Enter an email to sign in with a Supabase Magic Link</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </>
      }
    </Container>
  );
}

export default App;
