
import React, { useEffect, useState } from 'react';

function LastMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const LEAGUE_ID = 61; // Ligue 1
  const SEASON = 2024; 

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=${LEAGUE_ID}&season=${SEASON}/`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '68e2a49db47c1629842b2e257411b7a9', 
            'x-rapidapi-host': 'v3.football.api-sports.io'
          },
          redirect: 'follow'
        });

        if (!response.ok) throw new Error('Erreur lors de la récupération des données');
        
        const data = await response.json();
        console.log(data)
        setMatches(data.response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p>Chargement des matchs...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="recent-matches">
      <h2>Derniers matchs de Ligue 1</h2>
      <ul>
        {/* {matches.map((match) => (
          <li key={match.fixture.id}>
            <p>{match.teams.home.name} {match.goals.home} - {match.goals.away} {match.teams.away.name}</p>
            <p>Date : {new Date(match.fixture.date).toLocaleDateString()}</p>
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default LastMatches;
