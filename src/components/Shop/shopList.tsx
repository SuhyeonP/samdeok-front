import *as React from 'react';
import { gql } from "apollo-boost"
import {Query} from "@apollo/client/react/components";
import MiniShop from "./miniShop";
import {ObjectID } from 'mongodb'
import BigTable from "../reservation/bigtable";
import TimeZone from "../reservation/timezone";


const GET_STORES=gql`
    query{
      allStores{
        _id
      }
    }
`
interface Data{
    allStores:[
        {_id:ObjectID}
    ]
}

const ShopList=()=>{


    return (
        <>
            <table className="store-table">
                <thead>
                <tr>
                    <th>Shop</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                    <Query<Data> query={GET_STORES}>
                        {({loading,error,data})=>{
                            if(loading)return <p>wait a sec</p>
                            if(error)return <p>sorry do later</p>
                            return(
                                <>
                                    {data!.allStores.map(({_id})=>{
                                        return(
                                            <>
                                                <MiniShop storeId={_id}/>
                                            </>

                                        )
                                    })}
                                </>
                            )
                        }}
                    </Query>
                </tbody>
            </table>
            <Query<Data> query={GET_STORES}>
                {({loading,error,data})=>{
                    if(loading)return <p>wait a sec</p>
                    if(error)return <p>sorry do later</p>
                    return(
                        <>
                            <div id="other-erase">
                                {data!.allStores.map(({_id})=>{
                                    return(
                                        <>
                                            <div className="reservation-store" id={_id.toString()}>
                                                <BigTable/>
                                                <TimeZone/>
                                            </div>
                                        </>

                                    )
                                })}
                            </div>
                        </>
                    )
                }}
            </Query>
        </>
    )
}
export default ShopList;

