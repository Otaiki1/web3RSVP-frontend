import { Web3Storage, File, getFilesFromPath } from "web3.storage";
const resolve = require("path")

//function for handling requests
export default async function handler(req, res){

    //ensure its a post request
    if(req.method === "POST"){
        return await storeEventData(req, res);
    }else{
        return res
            .status(405)
            .json({message: "Method not allowed ", success: false})
    }
}

async function storeEventData(req, res){

    const body  = req.body;
    try{
        const files = await makeFileObjects(body);
        const cid = await storeFiles(files);
        return res.status(200).json({success: true, cid: cid,})
    }catch(err){
        return res
            .status(500)
            .json({error: "Error Creating event", success: false});
    }
}