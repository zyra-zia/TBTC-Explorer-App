import React from 'react';
import moment from "moment";
import * as Constants from "../Constants";
import External from "./Icons/External"
import More from "./Icons/More";
import {Link} from "react-router-dom";

class Transaction extends React.Component {

  progressCircle(){
    document.querySelectorAll(".progress").forEach((progressCircle) => {
    
        var value = progressCircle.getAttribute('data-value');
        var left = progressCircle.querySelector('.progress-left .progress-bar');
        var right = progressCircle.querySelector('.progress-right .progress-bar');
    
        if (value > 0) {
          if (value <= 50) {
            right.style.transform = 'rotate(' + this.percentageToDegrees(value) + 'deg)';
          } else {
            right.style.transform = 'rotate(180deg)';
            left.style.transform = 'rotate(' + this.percentageToDegrees(value - 50) + 'deg)';
          }
        }
      })
  }

  percentageToDegrees(percentage) {
    
    return percentage / 100 * 360

  }

  componentDidUpdate(){
    //this.progressCircle();
  }
  componentDidMount(){
    this.progressCircle();
  }

  render(){
    let tx = this.props.tx;

    let txType = "deposit"
    let progressText = "0/4";
    let progressValue = "0";
    if(tx.type === Constants.CREATION){
      progressText = "1/4";
      progressValue = "25";
    }
    else if(tx.type === Constants.PUBKEY){
      progressText = "2/4";
      progressValue = "50";
    }
    else if(tx.type === Constants.ADDRESS || tx.type === Constants.FUNDING){
      progressText = "3/4";
      progressValue = "75";
    }
    else if(tx.type === Constants.MINTING){
      progressText = "4/4";
      progressValue = "100";
    }

    if(tx.type === Constants.REQUEST){
      progressText = "1/3";
      progressValue = "33";
      txType = "redemption"
    }
    else if(tx.type === Constants.SIGNATURE){
      progressText = "2/3";
      progressValue = "66";
      txType = "redemption"
    }
    else if(tx.type === Constants.REDEEM){
      progressText = "3/3";
      progressValue = "100";
      txType = "redemption"
    }

    return (
      <li key={tx.id} className={`list-group-item transaction ${txType}`}>
          <div className="row">
              {/*<!-- Progress bar circle -->*/}
              <div className="col-1">
                <div className="progress mx-auto" data-value={progressValue}>
                  <span className="progress-left">
                      <span className="progress-bar border-primary"></span>
                  </span>
                  <span className="progress-right">
                        <span className="progress-bar border-primary"></span>
                  </span>
                  <div className="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                    <div className="font-weight-bold">{progressText}</div>
                  </div>
                </div>
              </div>
              {/*<!-- END -->*/}
              <span className="hash col-3">
                  <span className="truncate hash">
                    <a href={`https://etherscan.io/address/${tx.deposit.owner}`}>{tx.deposit.owner}</a>
                  </span>
                  <a href={`https://etherscan.io/address/${tx.deposit.owner}`}><External/></a>
              </span>
              <span className="hash col-3">
                  <span className="truncate hash">
                    <a href={`https://etherscan.io/tx/${tx.id}`}>{tx.id}</a>
                  </span>
                  <a href={`https://etherscan.io/tx/${tx.id}`}><External/></a>
              </span>
              {(tx.type === Constants.ADDRESS)?
              <span className="lotSize col-1">{tx.lotSize/100000000} BTC</span>
              :
              <span className="lotSize col-1">{tx.deposit.lotSize/100000000} BTC</span>}
              <span className="type col-2">{tx.type}</span>
              <span className="timestamp col-2">
                {tx.timestamp?
                moment.unix(tx.timestamp).fromNow()
                :
                "-"
                }
                <Link to={`/details/${tx.deposit.id}`}><More/></Link>
              </span>
          </div>
      </li>
    );
  }
}

export default Transaction;
