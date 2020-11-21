import *as React from 'react'
import {Tabs} from "antd";
import {days} from "./bigtable";
import { useCallback, useEffect, useState,memo,useMemo} from "react";
import { ObjectID } from 'mongodb';
import {gql} from "apollo-boost";
import {Mutation, Query} from "@apollo/client/react/components";
import {useMutation} from "@apollo/client";

const {TabPane}=Tabs;

interface Props{
    master:ObjectID;
    takeDay:number;
    theDay:Date;
    addId:number;
    open:number;
    close:number;
    name:string;
}

interface dupCheck{
    dupCheckReservation:[{
        checkShop:ObjectID;
        checkUser:ObjectID;
        time:Date;
    }]
}

const TimeZone:React.FunctionComponent<Props>=memo(({master,takeDay,theDay,addId,open,close,name})=>{
    const newId=master!.toString().slice(master.toString().length-4,master.toString().length)
    const divId="reservation-time"+addId.toString()+newId
    const [timeArr,setTimeArr]=useState<number[]>([])
    const [dayArr,setDayArr]=useState<Date[]>([])
    const [dayArr2,setDayArr2]=useState<string[]>([])
    const [load,setLoad]=useState(false)
    const [secLoad,setSLoad]=useState(false)

    const [timeSet,setTime]=useState<Date>(new Date())

    useEffect(()=>{
        setTime(prev=>{
            prev.setSeconds(0)
            prev.setMinutes(0)
            return prev;
        })
    },[])

    const DUP_RESERVE=gql`
        query{
          dupCheckReservation(checkShop:${"\""+master+"\""},time:${"\""+timeSet+"\""}){
            checkShop
            checkUser
            time
          }
        }
    `
    useEffect(()=>{
        setLoad(true)
        if(load){
            setTimeArr((prev)=>{
                for(let i=0;i<close-open+2;i++){
                    prev[i]=open+i
                }
                return prev
            })
            setDayArr((prev)=>{
                for(let i=0;i<7;i++){
                    theDay.setDate(takeDay)
                    theDay.setHours(timeArr[i])
                    theDay.setMinutes(0)
                    theDay.setSeconds(0)
                    prev[i]=theDay
                }
                return prev;
            })
            setDayArr2((prev)=>{
                for(let i=0;i<7;i++){
                    prev[i]=dayArr[i].toLocaleString()
                }
                return prev;
            })
            setSLoad(true)
        }
    },[load])

    return(
        <>
            <div className="time-zone" id={divId}>
                <div>
                    <h2>{name}&nbsp;:&nbsp;{days[addId].toUpperCase()}</h2>
                    {secLoad?
                        <Tabs defaultActiveKey="1">
                            {timeArr.map((ele,ind)=>{
                                return (
                                    <>
                                        <TabPane id={"asdf"+ind} tab={ele+"시"} key={ind+1}>
                                            <br/>
                                            <Query<dupCheck> query={DUP_RESERVE}>
                                                {({loading,error,data})=>{
                                                    if(loading)return <p>wait</p>
                                                    if(error)return <p>we try best</p>
                                                    if(data===null){
                                                        return <p>{dayArr2[ind]}</p>
                                                    }
                                                    return(
                                                        <>
                                                            <p>{dayArr2[ind]}밖data null아닐때</p>
                                                        </>
                                                    )
                                                }}
                                            </Query>
                                        </TabPane>
                                    </>
                                    )
                            })}
                        </Tabs>
                        :
                        <div>
                            wait a sec
                        </div>
                    }
                </div>
            </div>
        </>
    )
})

export default TimeZone;


// const CHECK_RESERVE=gql`
//                         mutation{
//                             createReservation(input:{
//                                 time:$sTime
//                                 checkShop:$Sid
//                                 checkUser:$uid
//                               }){
//                                 time
//                                 checkShop
//                                 checkUser
//                               }
//                         }
//                     `
// const mutation=useMutation(CHECK_RESERVE,{
//     variables:{
//         sTime,
//         Sid,
//         uid
//     }
// })