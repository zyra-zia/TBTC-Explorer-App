import React from 'react';
import Transactions from "./Transactions";

export class TransactionTable extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            sortBy: "addressUp"
        }
        this.sortByAddress = this.sortByAddress.bind(this);
    }

    sortByAddress(){
        /*if(this.state.sortBy === "addressUp"{
            this.setState({
                sortBy: "addressDown"
            });
        })
        else {
            this.setState({
                sortBy: "addressUp"
            });
        }*/
    }

    render(){
        return (
            <div className="txTable col-sm" id="txTable">
                <ul className="list-group">
                    <li key="0" className="list-group-item heading">
                        <div className="row">
                            <div className="col-1">Step</div>
                            <div className="col-3">User Address</div>
                            <div className="col-3">Transaction Hash</div>
                            <div className="col-1 lotSize">Lot Size</div>
                            <div className="col-2">Type</div>
                            <div className="col-2">Time</div>
                        </div>
                    </li>
                    <Transactions sortBy={this.state.sortBy} />
                </ul>
            </div>
        );
    }
}

export default TransactionTable;
