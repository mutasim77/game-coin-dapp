import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Web3 } from 'web3';

const Register = ({ contract }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {

            if (!username || !email) {
                setErrorMessage('Fill the form please!');
                return;
            }
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(window.ethereum);

            // Get user account address
            const accounts = await web3.eth.getAccounts();
            const userAddress = accounts[0];

            await contract.methods.registerUser(username, email).send({ from: userAddress });
            navigate('/login');
        } catch (err) {
            setErrorMessage('Registration failed. Please try again.');
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full mx-auto p-6 bg-gray-500  border border-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-4">Create an Account 🚀</h2>
                <p className="text-lg text-center text-gray-300 mb-4">Sign up to start managing your game currency securely!</p>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Register
                </button>
                {errorMessage && <p className="text-red-500 mt-5 text-center">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Register;
