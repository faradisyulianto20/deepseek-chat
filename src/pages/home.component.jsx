import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <h1>This is Home Page</h1>
            <Link to='/chat'>Chat</Link>
        </>
    )
}

export default Home