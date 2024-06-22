import { Link } from 'react-router-dom';
import CoinImage from '/game-currency.jpeg';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center justify-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <img className='rounded-md border shadow-lg' src={CoinImage} alt="Game Currency" />
                </div>
                <div className="md:w-1/2 md:ml-8 text-center md:text-left">
                    <h1 className="text-5xl font-bold mb-8">Welcome to the Game Currency App</h1>
                    <p className="text-lg text-gray-300 mb-4">This app allows you to manage your game currency using blockchain technology. You can register, log in, and view your profile. 🎮</p>
                    <p className="text-lg text-gray-300 mb-8">Get started by registering or logging in using your Ethereum account! 🔒</p>
                    <div className="space-x-4">
                        <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded">
                            Register
                        </Link>
                        <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
