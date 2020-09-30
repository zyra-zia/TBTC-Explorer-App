import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import * as Utils from "../Utils"
import Deposit from "./Deposit"

const Deposits = () => (
  <Query
    query={gql`
      {
        deposits(first : 50) {
            id
            owner
            lotSize
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
        }
      }
    `}
  >
    {({ loading, error, data }) => {
        if(loading){
            return "Loading...";
        }
        else if(error){
            return "An error has occurred. Please refresh and try again.";
        }

        data.deposits.forEach(deposit => {
            if(deposit.fundingTx) {
                let bitcoinAddress = Utils.getAddressFromPubKeyXY(deposit.publicKeyX.substr(2), deposit.publicKeyY.substr(2))
                
                deposit.bitcoinTx = ({id:bitcoinAddress.address, timestamp: deposit.fundingTx.timestamp});

            }
        });

        data.deposits.sort((a, b)=>{
            return b.creationTx.timestamp - a.creationTx.timestamp;
        });

        let mapped = data.deposits.map((deposit) => (
                <Deposit deposit={deposit} />
          ));
        
        return mapped;
    }}
  </Query>
);
export default Deposits;