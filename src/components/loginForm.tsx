import *as React from "react";
import {createContext, useCallback, useEffect, useState} from 'react';
import {gql} from 'apollo-boost';
import {Query} from "@apollo/client/react/components";
import {Context} from "@apollo/client";


interface User {
    loginUser:{
        name: string,
        birth: string,
        age: number,
        snsId: string,
        _id: string
    }
}

interface Shop {
    getStore:{
        shopName: string,
        address: string,
        part: string
    }
}




const LoginForm: React.FunctionComponent = () => {
    const [userName, setUserName] = useState('test')
    const [userId, setUserId] = useState('test')
    const [storeId, setStoreId] = useState('test')
    const [login, logout] = useState(false);
    const [user, shop] = useState(false)

    const jointoUser = useCallback((snsId: string, name: string) => {
        const di = "\"" + snsId + "\""
        const dn = "\"" + name + "\""
        setUserId(di)
        setUserName(dn)
        logout(true)
        shop(true)
    }, [])

    const jointoStore = useCallback((storeId: string) => {
        const ID = "\"" + storeId + "\""
        setStoreId(ID)
        logout(true)
        shop(false)
    }, [])


    const GET_USER = gql`
        query{
            loginUser(snsId:${userId},name:${userName}){
                name
                birth
                age
                snsId
                _id
            }
        }
    `
    const GET_STORE = gql`
        query {
            getStore(storeId:${storeId}){
                shopName
                shopSns
                address
                part
                _id
            }
        }
    `

    const Breakout = useCallback(() => {
        logout(false)
        if(document.getElementById('user-info')){
            document.getElementById('user-info')!.removeAttribute('id')
        }
    }, [])


    return (
        <>
            {login ?
                <div>
                    <h4>just enjoy</h4>
                    {user ?
                        <>
                            <Query<User,{}> query={GET_USER}>
                                {({loading,error,data})=>{
                                    if(loading)return <p>wait</p>
                                    if(error)return <p>retry</p>
                                    return(
                                        <>
                                            {Array(data!.loginUser).map(({name,snsId})=>{
                                                return(
                                                    <>
                                                        <div>Hi<p id="user-info">{name}</p></div>
                                                        <input hidden id="user-value" value={snsId}/>
                                                    </>
                                                )
                                            })}
                                        </>
                                    )
                                }}
                            </Query>
                        </>
                        :
                        <>
                            <Query<Shop> query={GET_STORE}>
                                {({loading,error,data})=>{
                                    if(loading)return <p>wait</p>
                                    if(error)return <p>retry</p>
                                    return(
                                        <>
                                            {Array(data!.getStore).map(({shopName,address,part})=>{
                                                return(
                                                    <>
                                                        <div>Hi {shopName}</div>
                                                        <div>{address}</div>
                                                        <div>{part}</div>
                                                    </>
                                                )
                                            })}
                                        </>
                                    )
                                }}
                            </Query>
                        </>
                    }
                    <button onClick={Breakout}>logout</button>
                </div>
                :
                <div>
                    <h4>just test account</h4>
                    <h4>Click to login dummyAccount</h4>
                    <ul className="select-login">
                        <li onClick={() => jointoUser("naverId", '사용자1')}>user1</li>
                        <li onClick={() => jointoUser("naro", '사용자2')}>user2</li>
                        <li onClick={() => jointoStore("5fb605ccd4d9643f3cabc411")}>shop1</li>
                        <li onClick={() => jointoStore("5fb71b4065c20255c43cbcf3")}>shop2</li>
                    </ul>
                </div>
            }
        </>
    )
}

export default LoginForm;
