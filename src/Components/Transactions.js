import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import * as Constants from "../Constants"
import Transaction from "./Transaction"

const Transactions = (props) => (
  <Query
    query={gql`
      {
            creationTxes(first : 50) {
                id
                timestamp
                deposit {
                    id
                    owner
                    lotSize
                }
            }

            pubKeyTxes(first : 50) {
                id
                timestamp
                deposit {
                    id
                    owner
                    lotSize
                }
            }

            fundingTxes(first : 50) {
                id
                timestamp
                deposit {
                    id
                    owner
                    lotSize
                }
            }

            mintingTxes(first : 50) {
                id
                timestamp
                deposit {
                    id
                    owner
                    lotSize
                }
            }

            requestTxes(first : 50) {
                id
                timestamp
                redemption {
                    deposit {
                        id
                        owner
                        lotSize
                    }
                }
            }

            signatureTxes(first : 50) {
                id
                timestamp
                redemption {
                    deposit {
                        id
                        owner
                        lotSize
                    }
                }
            }

            redeemTxes(first : 50) {
                id
                timestamp
                redemption {
                    deposit {
                        id
                        owner
                        lotSize
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

        data.creationTxes.forEach(tx => {
            tx.type = Constants.CREATION;
        });
        data.pubKeyTxes.forEach(tx => {
            tx.type = Constants.PUBKEY;
        });
        data.fundingTxes.forEach(tx => {
            tx.type = Constants.FUNDING;
        });
        data.mintingTxes.forEach(tx => {
            tx.type = Constants.MINTING;
        });
        data.requestTxes.forEach(tx => {
            tx.deposit = tx.redemption.deposit;
            tx.type = Constants.REQUEST;
        });
        data.signatureTxes.forEach(tx => {
            tx.deposit = tx.redemption.deposit;
            tx.type = Constants.SIGNATURE;
        });
        data.redeemTxes.forEach(tx => {
            tx.deposit = tx.redemption.deposit;
            tx.type = Constants.REDEEM;
        });

        let txs = [...data.creationTxes, ...data.pubKeyTxes, ...data.fundingTxes, ...data.mintingTxes, ...data.requestTxes, ...data.signatureTxes, ...data.redeemTxes];
        
        txs = txs.sort((a, b)=>{
            return b.timestamp - a.timestamp;
        });

        if(props.sortBy === "address"){
            txs = txs.sort((a, b)=>{
                if(a.deposit.owner === b.deposit.owner)
                    return 0;
                else if(a.deposit.owner > b.deposit.owner){
                    return 1;
                }
                else {
                    return -1;
                }
            });
        }

        let mapped = txs.map((tx) => (
                <Transaction tx={tx} />
          ));
        return mapped;
    }}
  </Query>
);
export default Transactions;