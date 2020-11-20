import *as React from 'react';
import { gql } from "apollo-boost"
import {Query} from "@apollo/client/react/components";
import MiniShop from "./miniShop";
import {ObjectID } from 'mongodb'


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
            <table>
                <thead>
                <tr>
                    <td>Shop</td>
                    <td>Address</td>
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
                                        return <MiniShop storeId={_id}/>
                                    })}
                                </>
                            )
                        }}
                    </Query>
                </tbody>
            </table>
        </>
    )
}
export default ShopList;