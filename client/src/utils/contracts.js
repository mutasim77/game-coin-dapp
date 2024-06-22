import authABI from './auth_abi.json';
import gameABI from './game_abi.json';

export const contractData = {
    authContract: {
        abi: authABI,
        address: import.meta.env.VITE_AUTH_CONTRACT_ADDRESS
    },
    gameContract: {
        abi: gameABI,
        address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS
    }
};