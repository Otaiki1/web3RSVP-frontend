import abiJSON from "./Web3RSVP.json";
import { ethers } from "ethers";

export default function connectContract(){
    const contractAddress = "0xa91cCA0258B23B58d5944cdD5E2872097998f047";
    const contractAbi = abiJSON.abi;
    let rsvpContract;

    try{
        const { ethereum } = window;

        if(ethereum){
            //check for eth object in the window
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            rsvpContract = new ethers.Contract(contractAddress, contractAbi, signer)

        }else{
            console.log("Ethereum OBject does not exist")
        }
    }catch(err){
        console.log("ERROR:___---___", err);
    }

    return rsvpContract
}