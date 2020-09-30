import React, { Fragment } from 'react';
import moment from "moment";
import Check from "./Icons/External"

function Deposit(props) {
  let deposit = props.deposit;
  return (
    <li key={deposit.id} className="list-group-item deposit">
        <div className="row">
            <a data-toggle="collapse" data-target="#collapse" href="#collapse" role="button">
                <span className="col">{deposit.lotSize/100000000} BTC</span>
                
                <span className="col success">Deposit Created</span>
                <Check className="success"/>

                {deposit.pubKeyTx ?
                <Fragment>
                    <span className="col success">Address Generated</span>
                    <Check className="success"/>
                </Fragment>
                :
                <Fragment>
                    <span className="col">Address Generated</span>
                    <Check/>
                </Fragment>
                }

                {deposit.fundingTx ?
                <Fragment>
                    <span className="col success">Bitcoin Funded</span>
                    <Check className="success"/>
                </Fragment>
                :
                <Fragment>
                    <span className="col">Bitcoin Funded</span>
                    <Check/>
                </Fragment>
                }

            {deposit.mintingTx ?
                <Fragment>
                    <span className="col success">TBTC Minted</span>
                </Fragment>
                :
                <Fragment>
                    <span className="col">TBTC Minted</span>
                </Fragment>
                }
            </a>
        </div>
        <div className ="row collapse card" id="collapse" data-parent="#txTable">
            <div className="container">
                <div className ="row">
                    Creation tx #, timestamp
                </div>
                <div className ="row">
                    Pubkey tx #, timestamp
                </div>
                <div className ="row">
                    Bitooin tx #, timestamp
                </div>
                <div className ="row">
                    Funding tx #, timestamp
                </div>
                <div className ="row">
                    Minting tx #, timestamp
                </div>
            </div>
        </div>
    </li>
  );
}

export default Deposit;
