import *as React from "react";
import {gql} from "apollo-boost"
import {ObjectID} from 'mongodb'
import {Query} from "@apollo/client/react/components";
import {useCallback, useEffect, useState} from "react";


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
    const [removeElement,setRemoveID]=useState<string[]>([])
    const plz:string[]=[];
    const ID = "\"" + storeId + "\""
    const GET_STORE = gql`
        query {
            getStore(storeId:${ID}){
                shopName
                shopSns
                address
                part
                _id
                openTime
                closeTime
            }
        }
    `



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