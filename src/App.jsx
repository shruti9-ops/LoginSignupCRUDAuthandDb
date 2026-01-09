import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Components/LoginSignup/Firebase";

import LoginSignup from "./Components/LoginSignup/Loginsignup";
import Todo from "./Components/LoginSignup/Todo";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <h3>Loading...</h3>;

  return user ? <Todo /> : <LoginSignup />;
}

export default App;
