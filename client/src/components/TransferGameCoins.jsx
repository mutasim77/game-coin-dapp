import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const TransferGameCoins = ({ contract }) => {
    const [receiverAddress, setReceiverAddress] = useState('');
    const [gcAmount, setGCAmount] = useState('');
    const history = useNavigate();

    const handleTransfer = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            await contract.methods.send(receiverAddress, gcAmount).send({
                from: accounts[0]
            });

            toast.success('Game coins transferred successfully.');
        } catch (error) {
            console.error('Error transferring game coins:', error);
            toast.error('Error transferring game coins!');
        }
    }

    const handleSendToOwner = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            const userAddress = accounts[0];

            const ownerAddress = await contract.methods.owner().call();

            const isOwner = userAddress.toLowerCase() === ownerAddress.toLowerCase();

            if (!isOwner) {
                toast.error('This action is only allowed for the contract owner');
                return
            }
            await contract.methods.sendToOwner(gcAmount).send({
                from: userAddress
            });

            toast.success('Game coins sent to owner successfully.');
        } catch (error) {
            console.error('Error sending game coins to owner:', error);
            toast.error('Error sending game coins to owner!');
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full mx-auto p-6 bg-gray-500  border border-white shadow-lg rounded-lg">
                <h2 className="text-4xl font-bold text-center mb-4">Transfer Game Coins 💰</h2>
                <p className="text-2xl text-center text-gray-300 mb-4">Send your GC 🪙 to friends or anyone else by providing their address and the amount of coins you wish to transfer.</p>
                <div className=''>
                    <input
                        type="text"
                        placeholder="Receiver Address"
                        value={receiverAddress}
                        onChange={(e) => setReceiverAddress(e.target.value)}
                        className="w-full mb-4 px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:border-blue-500"

                    />
                    <input
                        type="number"
                        placeholder="Amount of GC"
                        value={gcAmount}
                        onChange={(e) => setGCAmount(e.target.value)}
                        className="w-full mb-4 px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <button
                        onClick={handleSendToOwner}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-all"
                    >
                        Send to Owner
                    </button>
                    <button
                        onClick={handleTransfer}
                        className=" w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all"
                    >
                        Transfer
                    </button>
                    <button
                        onClick={() => history('/profile')}
                        className=" w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all"
                    >
                        Back to Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransferGameCoins;
