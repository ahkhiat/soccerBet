import { useEffect, useState } from "react";

function Users() {
  const [data, setData] = useState([]); // Initialise l'état

  useEffect(() => {
    fetch('http://localhost:5001/admin/users') // Spécifie l'URL complète si nécessaire
      .then(response => {
        if (!response.ok) { // Vérifie si la réponse est correcte
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(error => console.error('Erreur:', error));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map(user => (
          <li key={user.user_id}>{user.firstname} {user.lastname}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
