import React from 'react';
import {Link, useRouteMatch} from "react-router-dom"
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import External from "./Icons/External";
import * as Utils from "../Utils"

function Details() {
  
    let match = useRouteMatch();
    let depositId = match.params.depositId;

  return (
    <div className="details container">
        <Link className="back" to="/">&lt; Back</Link>

        <div className="row">
        <Query
                query={gql`
                {
                        deposit(id: "${depositId}") {
                            id
                            owner
                            lotSize
                            depositContract
                            publicKeyX
                            publicKeyY
                            creationTx {
                                id
                                timestamp
                            }
                            pubKeyTx {
                                id
                                timestamp
                            }
                            fundingTx {
                                id
                                timestamp
                            } 
                            mintingTx {
                                id
                                timestamp
                            }
                            redemption {
                                owner
                                requestTx {
                                    id
                                    timestamp
                                }
                                signatureTx {
                                    id
                                    timestamp
                                }
                                redeemTx {
                                    id
                                    timestamp
                                }
                            }
                        }
                }
                `}
            >
                {({ loading, error, data }) => {
                     if(loading){
                        return <li key="Loading" className="list-group-item">Loading...</li>;
                    }
                    else if(error){
                        return <li key="Loading" className="list-group-item">An error has occurred, please refresh and try again.</li>;
                    }
                    
                    let deposit = data.deposit;
                    let redemption = data.deposit.redemption;

                    let bitcoinAddress = Utils.getAddressFromPubKeyXY(deposit.publicKeyX.substr(2), deposit.publicKeyY.substr(2)).address;

                    return (
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Deposit Details</h5>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <span className="h6">Lot Size: </span> {deposit.lotSize/100000000} BTC
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="h6">
                                                        Bitcoin Funding Address:
                                                    </span> 
                                                    <a href={`https://blockchain.com/btc/address/${bitcoinAddress}`}>
                                                        {bitcoinAddress}
                                                        <External/>
                                                    </a>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="h6">
                                                        Deposit Contract:
                                                    </span>
                                                    <a href={`https://etherscan.io/address/${deposit.id}`}>
                                                       {deposit.id}
                                                        <External/>
                                                    </a>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="h6">
                                                        User Address:
                                                    </span>
                                                    <a href={`https://etherscan.io/address/${deposit.owner}`}>
                                                        {deposit.owner}
                                                        <External/>
                                                    </a> 
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-title">Deposit Transactions</h6>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <a href={`https://etherscan.io/tx/${deposit.creationTx.id}`}>
                                                        {deposit.creationTx.id}
                                                        <External/>
                                                    </a>
                                                    <span className="timestamp">
                                                        {moment.unix(deposit.creationTx.timestamp).format("HH:mm:ss DD/MM/YYYY")}
                                                    </span>
                                                </li>
                                                {deposit.pubKeyTx !== null?
                                                    <li className="list-group-item">
                                                        <a href={`https://etherscan.io/tx/${deposit.pubKeyTx.id}`}>
                                                            {deposit.pubKeyTx.id}
                                                            <External/>
                                                        </a>
                                                        <span className="timestamp">
                                                            {moment.unix(deposit.pubKeyTx.timestamp).format("HH:mm:ss DD/MM/YYYY")}
                                                        </span>
                                                    </li>
                                                    :
                                                    <li className="list-group-item">--</li>
                                                }
                                                {deposit.fundingTx !== null?
                                                    <li className="list-group-item">
                                                        <a href={`https://etherscan.io/tx/${deposit.fundingTx.id}`}>
                                                            {deposit.fundingTx.id}
                                                            <External/>
                                                        </a>
                                                        <span className="timestamp">
                                                            {moment.unix(deposit.fundingTx.timestamp).format("HH:mm:ss DD/MM/YYYY")}
                                                        </span>
                                                    </li>
                                                    :
                                                    <li className="list-group-item">--</li>
                                                }
                                                {deposit.mintingTx !== null?
                                                    <li className="list-group-item">
                                                        <a href={`https://etherscan.io/tx/${deposit.mintingTx.id}`}>
                                                            {deposit.mintingTx.id}
                                                            <External/>
                                                        </a>
                                                        <span className="timestamp">
                                                            {moment.unix(deposit.mintingTx.timestamp).format("HH:mm:ss DD/MM/YYYY")}
                                                        </span>
                                                    </li>
                                                    :
                                                    <li className="list-group-item">--</li>
                                                }
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-title">Redemption Transactions</h6>
                                            <ul className="list-group list-group-flush">
                                                {redemption !== null && redemption.requestTx !== null?
                                                    <li className="list-group-item">
                                                        <a href={`https://etherscan.io/tx/${redemption.requestTx.id}`}>
                                                            {redemption.requestTx.id}
                                                            <External/>
                                                        </a>
                                                        <span className="timestamp">
                                                            {moment.unix(redemption.requestTx.timestamp).format("HH:mm:ss DD/MM/YYYY")}
                                                        </span>
                                                    </li>
                                                    :
                                                    <li className="list-group-item">--</li>
                                                }
                                                {redemption !== null && redemption.signatureTx !== null?
                                                    <li className="list-group-item">
                                                        <a href={`https://etherscan.io/tx/${redemption.signatureTx.id}`}>
                                                            {redemption.signatureTx.id}
                                                            <External/>
                                                        </a>
                                                        <span className="timestamp">
                                                            {moment.unix(redemption.signatureTx.timestamp).format("HH:mm:ss DD/MM/YYYY")}
                                                        </span>
                                                    </li>
                                                    :
                                                    <li className="list-group-item">--</li>
                                                }
                                                {redemption !== null && redemption.redeemTx !== null?
                                                    <li className="list-group-item">
                                                        <a href={`https://etherscan.io/tx/${redemption.redeemTx.id}`}>
                                                            {redemption.redeemTx.id}
                                                            <External/>
                                                        </a>
                                                        <span className="timestamp">
                                                            {moment.unix(redemption.redeemTx.timestamp).format("HH:mm:ss DD/MM/YYYY")}
                                                        </span>
                                                    </li>
                                                    :
                                                    <li className="list-group-item">--</li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                </div>
                            </div>
                        </div>
                        );
                }}
            </Query>
        </div>
    </div>
  );
}

export default Details;
