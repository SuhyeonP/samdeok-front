import *as React from "react";
import {gql} from "apollo-boost"
import {ObjectID} from 'mongodb'
import {Query} from "@apollo/client/react/components";
import {useCallback, useState} from "react";
import BigTable from "../reservation/bigtable";
import TimeZone from "../reservation/timezone";


interface Props {
    getStore: {
        shopName: string,
        shopSns: string | null,
        address: string,
        part: string,
        _id: ObjectID
    }
}

interface SID {
    storeId: ObjectID | string
}

const MiniShop: React.FunctionComponent<SID> = ({storeId}) => {

    const ID = "\"" + storeId + "\""
    const GET_STORE = gql`
        query {
            getStore(storeId:${ID}){
                shopName
                shopSns
                address
                part
                _id
            }
        }
    `
    const gotoReservation=useCallback((id:ObjectID,shopName:string)=>{
        console.log(id)
        const uid=document.getElementById('user-info')
        if(uid){
            document.getElementById(`${id}`)!.style.display='block';
        }else{
            alert('사용자 로그인이 필요합니다.')
        }

    },[])



    return (
        <>
            <Query<Props, {}> query={GET_STORE}>
                {({loading, error, data}) => {
                    if (loading) return <p>wait a sec</p>
                    if (error) return <p>try later</p>
                    return (
                        <>
                            {Array(data!.getStore).map(({_id, shopName, address, part, shopSns}) => {
                                return (
                                    <>
                                        <tr>
                                            <td className="table-id">{_id}</td>
                                            <td>{shopName}</td>
                                            <td>{address}</td>
                                            <td>{part}</td>
                                            <td>{shopSns === null ? null : shopSns}</td>
                                            <button onClick={()=>gotoReservation(_id,shopName)}>
                                                예약하기
                                            </button>
                                        </tr>
                                    </>
                                )
                            })}
                        </>
                    )
                }}
            </Query>
        </>
    )
}

export default MiniShop;