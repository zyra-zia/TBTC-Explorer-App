import * as bitcoinjs from "bitcoinjs-lib"

export function getAddressFromPubKeyXY(pubKeyX, pubKeyY){
    const pk = Buffer.from( "04" + pubKeyX + pubKeyY, 'hex' );
    const kp = bitcoinjs.ECPair.fromPublicKey(pk);
    const address = bitcoinjs.payments.p2wpkh({ pubkey: kp.publicKey })
    return address;
}

export function getTxDetails(tx){
    return fetch(`https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${tx}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`)
    .then((response)=>{
       return response.json();
    })
    .then((data)=>{
        return data.result;
    });
}

export async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
}
