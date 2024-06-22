import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animePfpPicture } from '../utils/constant';
import BuySellGameCoins from './BuySellGameCoins';

const Profile = ({ contracts }) => {
    const authContract = contracts.authContract;
    const gameContract = contracts.gameContract;

    const [userInfo, setUserInfo] = useState(null);
    const [balance, setBalance] = useState();
    const history = useNavigate();

    const getUserInfo = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (!accounts.length) {
                console.error('No accounts found');
                history('/login');
                return;
            }

            // Get user account address
            const userAddress = accounts[0];

            // Get users balance
            const userBalance = await gameContract.methods.balanceOf(userAddress).call();
            setBalance(userBalance);

            // Call smart contract method to get user info
            const user = await authContract.methods.getUserInfo(userAddress).call();
            setUserInfo(user);
        } catch (error) {
            console.error('Error fetching user info:', error);
            history('/login');
        }
    }

    useEffect(() => {
        getUserInfo();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-center bg-gray-300 h-64">
                    <img src={animePfpPicture[Math.floor(Math.random() * animePfpPicture.length)]} alt="Profile" className="w-40 h-40 rounded-full" />
                </div>
                <div className="p-6">
                    {userInfo ?
                        <>
                            <h2 className="text-3xl text-black font-bold mb-2 text-center bg-yellow-500 border shadow-lg rounded-lg">{userInfo[0]}</h2>
                            <p className="text-gray-700"><span className='font-bold'>Email 📧 : </span> {userInfo[1]}</p>
                            <p className="text-gray-600 mb-5"><span className='font-bold'>Coins 💰 : </span> {parseInt(balance)} GC</p>
                        </> :
                        <p>Loading....</p>
                    }
                    <BuySellGameCoins getUserInfo={getUserInfo} gameContract={gameContract} />
                    <div className="flex items-center justify-between">
                        <button onClick={() => history('/transfer')} className="w-[60%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Transfer</button>
                        <button onClick={() => history('/')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
