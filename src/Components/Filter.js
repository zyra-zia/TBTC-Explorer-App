import React from 'react';

class Filter extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
            filter: {
                deposits: true,
                created: true,
                address: true,
                funded: true,
                minted: true,

                redemptions: true,
                requested: true,
                signature: true,
                redeemed: true
            },
            search: ""
        }

        this.depositsClicked = this.depositsClicked.bind(this);
        this.createdClicked = this.createdClicked.bind(this);
        this.addressClicked = this.addressClicked.bind(this);
        this.fundedClicked = this.fundedClicked.bind(this);
        this.mintedClicked = this.mintedClicked.bind(this);

        this.redemptionsClicked = this.redemptionsClicked.bind(this);
        this.requestedClicked = this.requestedClicked.bind(this);
        this.signatureClicked = this.signatureClicked.bind(this);
        this.redeemedClicked = this.redeemedClicked.bind(this);

        this.searchClicked = this.searchClicked.bind(this);
    }

    depositsClicked(event){
        console.log(event);
    }
    createdClicked(event){
        console.log(event);
    }
    addressClicked(event){
        console.log(event);
    }
    mintedClicked(event){
        console.log(event);
    }
    fundedClicked(event){
        console.log(event);
    }

    redemptionsClicked(event){
        console.log(event);
    }
    requestedClicked(event){
        console.log(event);
    }
    signatureClicked(event){
        console.log(event);
    }
    redeemedClicked(event){
        console.log(event);
    }
    searchClicked(event){
        console.log(event);
    }

    render(){
        return (
            <div className="filter accordion col" id="accordionExample">
                <div className="card">
                <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Advanced Search and Filter
                    </button>
                    </h5>
                </div>

                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="card-body">
                    <input type="checkbox" checked onChange={this.depositsClicked}/> Deposits<br/>
                    <input type="checkbox" checked onChange={this.createdClicked}/> Deposit Created 
                    <input type="checkbox" checked onChange={this.addressClicked}/> Address Generated 
                    <input type="checkbox" checked onChange={this.fundedClicked}/> Deposit Funded 
                    <input type="checkbox" checked onChange={this.mintedClicked}/> TBTC Minted   
                    <hr/> 
                    <input type="checkbox" checked onChange={this.redemptionsClicked}/> Redemptions<br/>
                    <input type="checkbox" checked onChange={this.requestedClicked}/> Redemption Requested  
                    <input type="checkbox" checked onChange={this.signatureClicked}/> Redemption Signature 
                    <input type="checkbox" checked onChange={this.redeemedClicked}/> BTC Redeemed 
                    <hr/>
                    Search User Address: <input type="text" placeholder="Search Deposits and Redemptions by User"/>
                    <button onClick={this.searchClicked}>Search</button>
                    </div>
                </div>
                </div>
            </div>
            );
        }
}

export default Filter;
