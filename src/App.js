import './App.css';
import { useState, useEffect } from 'react';
import './App.css';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

function App() {
  const [email, setEmail] = useState("");
  const supabase = useSupabaseClient();

  return (
    <Container align="center" className="container-sm mt-4">
      {

      }
    </Container>
  );
}

export default App;
