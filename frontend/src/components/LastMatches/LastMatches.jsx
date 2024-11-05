
import { useEffect, useState } from 'react';

const RECENT_MATCHES_KEY = "recentMatches"; // Clé pour `localStorage`
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

function LastMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const LEAGUE_ID = '61'; // Ligue 1
  const SEASON = '2024'; 

  // useEffect(() => {
  //   const fetchMatches = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=${LEAGUE_ID}&season=${SEASON}`, {
  //         method: 'GET',
  //         headers: {
  //           'x-rapidapi-key': '68e2a49db47c1629842b2e257411b7a9', 
  //           'x-rapidapi-host': 'v3.football.api-sports.io'
  //         },
  //         redirect: 'follow'
  //       });

  //       if (!response.ok) throw new Error('Erreur lors de la récupération des données');
        
  //       const data = await response.json();
  //       console.log(data)
  //       setMatches(data.response);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMatches();
  // }, []);

  // if (loading) return <p>Chargement des matchs...</p>;
  // if (error) return <p>Erreur : {error}</p>;

  useEffect(() => {
    // Vérifiez si les données existent dans `localStorage` et ne sont pas expirées
    const cachedData = localStorage.getItem(RECENT_MATCHES_KEY);
    const cachedTimestamp = localStorage.getItem(`${RECENT_MATCHES_KEY}_timestamp`);
    const now = new Date().getTime();

    if (cachedData && cachedTimestamp && now - cachedTimestamp < CACHE_EXPIRATION) {
      try {
        // Valider la présence de `cachedData` avant de parser
        const parsedData = JSON.parse(cachedData);
        if (parsedData) {
          setMatches(parsedData);
        } else {
          fetchMatchesFromAPI(); // Si les données sont invalides, on appelle l'API
        }
      } catch (error) {
        console.error("Erreur lors du parsing JSON:", error);
        fetchMatchesFromAPI(); // Recharger les données en cas d'erreur de parsing
      }
    } else {
      fetchMatchesFromAPI();
    }
  }, []);

  const fetchMatchesFromAPI = async () => {
    try {
      const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=${LEAGUE_ID}&season=${SEASON}`); // Remplacez avec votre URL API
      if (!response.ok) throw new Error("Erreur de récupération des données de l'API");
  
      const data = await response.json();
      setMatches(data.matches);

      // Stockez les données et le timestamp dans `localStorage`
      localStorage.setItem(RECENT_MATCHES_KEY, JSON.stringify(data.matches));
      localStorage.setItem(`${RECENT_MATCHES_KEY}_timestamp`, new Date().getTime());
    } catch (error) {
      console.error("Erreur lors de la récupération des matchs:", error);
    }
  };

  return (
    <div className="recent-matches">
      <h2>Derniers matchs de Ligue 1</h2>
      <table className="border">
        <thead>
          <tr>
            <td>Date</td>
            <td>Domicile</td>
            <td></td>
            <td></td>
            <td>Visiteur</td>
            {/* <td>Lieu</td> */}
            <td>Score</td>
            {/* <td>Arbitre</td> */}
          </tr>
        </thead>

        <tbody>
        {matches.map((match) => (

        
          <tr key={match.fixture.id} className="border">
            <td>{ match.fixture.date }</td>

            <td>{ match.teams.home.name } </td>
            <td className="min-w-[50px]"><img src={`https://media.api-sports.io/football/teams/${match.teams.home.id}.png`} className="w-12 h-12 rounded-full border border-gray-300 shadow-sm object-cover" /></td>
            
            <td className="min-w-[50px]"><img src={`https://media.api-sports.io/football/teams/${match.teams.away.id}.png`} className="w-12 h-12 rounded-full border border-gray-300 shadow-sm object-cover" /></td>
            <td>{ match.teams.away.name } </td>

            {/* <td>{ match.fixture.venue.name } </td> */}
            <td>{ match.score.fulltime.home } - { match.score.fulltime.home }</td>
            {/* <td>{ match.fixture.referee }</td> */}
            
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default LastMatches;
