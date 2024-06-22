import Web3 from 'web3';
import { useState, useEffect } from 'react';

export default function useContract(contractData) {
    const [contracts, setContracts] = useState({});

    useEffect(() => {
        const connectToEthereum = async () => {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const web3Instance = new Web3(window.ethereum);
                    const updatedContracts = {};

                    // Iterate over each contract data and create contract instances
                    for (const contractName in contractData) {
                        const { abi, address } = contractData[contractName];
                        const contractInstance = new web3Instance.eth.Contract(abi, address);
                        updatedContracts[contractName] = contractInstance;
                    }

                    // Set the contracts state with the updated contract instances
                    setContracts(updatedContracts);
                } catch (error) {
                    console.error('Error connecting to Ethereum:', error);
                }
            } else {
                console.error('Ethereum provider not found');
            }
        }
        connectToEthereum();

        // eslint-disable-next-line
    }, [contractData]);

    return contracts;
}


