import *as React from 'react';
import { gql } from "apollo-boost"
import {Query} from "@apollo/client/react/components";
import MiniShop from "./miniShop";
import {ObjectID } from 'mongodb'
import BigTable from "../reservation/bigtable";
import {useCallback, useState} from "react";


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
    const [eraseEle,setErase]=useState('a123')
    const gotoReservation=useCallback((id:string)=>{
        const uid=document.getElementById('user-info')
        if(uid===null){
            return alert('잘못된 접근입니다.')
        }
        setErase((prev)=>{
            document.getElementById(`str-${prev}`)!.style.display='none'
            return id;
        })
        console.log(eraseEle)
        document.getElementById(`str-${id}`)!.style.display='block';

    },[eraseEle])


    return (
        <>
            <input hidden id="str-a123"/>
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
                                                <button onClick={()=>gotoReservation(_id!.toString().slice(_id.toString().length-4,_id.toString().length))}>
                                                    예약하기
                                                </button>
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
                                            <div className="reservation-store" id={"str-"+_id!.toString().slice(_id.toString().length-4,_id.toString().length)}>
                                                <BigTable catchId={_id}/>
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
