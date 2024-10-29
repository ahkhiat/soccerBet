import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    // You'll update this function later
  }

  return (
    <div className="mainContainer">
      
      <div>Vous êtes sur votre espace personnel de Soccer Bet !</div>
      
    </div>
  )
}

export default Home