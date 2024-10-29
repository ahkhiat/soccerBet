import { useEffect, useState } from "react";

function Users() {
  const [data, setData] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:5001/admin/users') 
      .then(response => {
        if (!response.ok) { 
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
      <h1 className="bg-slate-200">Users</h1>
      <ul>
        {data.map(user => (
          <li key={user.user_id}>{user.firstname} {user.lastname}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
