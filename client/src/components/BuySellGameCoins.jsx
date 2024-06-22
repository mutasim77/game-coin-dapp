import { useState } from 'react';
import toast from 'react-hot-toast';

const BuySellGameCoins = ({ getUserInfo, gameContract }) => {
    const [buyAmount, setBuyAmount] = useState('');
    const [sellAmount, setSellAmount] = useState('');

    const buyGameCoins = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            const amount = BigInt(buyAmount);
            const sellRate = await gameContract.methods.sellRate().call();
            const ethAmount = amount * sellRate;

            await gameContract.methods.buy(amount).send({
                from: accounts[0],
                value: ethAmount
            });

            handleBuySuccess('bought');

            getUserInfo();
        } catch (error) {
            console.error('Error buying game coins:', error);
            toast.error('Error buying game coins. Please try again later.');
        }
    }

    const sellGameCoins = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            const amount = parseInt(sellAmount);
            await gameContract.methods.sell(amount).send({
                from: accounts[0],
            });

            handleBuySuccess('sold');

            getUserInfo();
        } catch (error) {
            console.error('Error selling game coins:', error);
            toast.error('Error selling game coins. Please try again later.');
        }
    }

    const handleBuySuccess = (action) => {
        toast.success(`Game coins ${action} successfully.`);
        setBuyAmount('');
        setSellAmount('');
    }

    return (
        <div className="flex mt-10 flex-col items-center gap-5 text-gray-500 mb-7">
            <div className='flex justify-between gap-5'>
                <button
                    onClick={buyGameCoins}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                >
                    Buy GC
                </button>
                <input
                    type="number"
                    placeholder="Amount to Buy"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                />
            </div>

            <div className='flex justify-between w-full'>
                <button
                    onClick={sellGameCoins}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
                >
                    Sell GC
                </button>
                <input
                    type="number"
                    placeholder="Amount to Sell"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                />
            </div>
        </div>
    );
}

export default BuySellGameCoins;
