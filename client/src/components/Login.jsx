import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';

const Login = ({ contract }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const history = useNavigate();

    const handleLogin = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);

        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        const isUserRegistered = await contract.methods.isRegistered(userAddress).call();
        if (!isUserRegistered) {
            setErrorMessage('Please register first then come back!');
        }
        history('/profile');
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full mx-auto p-6 bg-gray-500  border border-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-4">Welcome Back! 🎮</h2>
                <p className="text-lg text-center text-gray-300 mb-4">Log in to your account to manage your game currency with ease.</p>
                {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login;