import *as React from 'react';
import {useCallback, useState} from 'react';
import TimeZone from "./timezone";
import { ObjectId } from 'mongodb';
import {gql} from "apollo-boost";
import{Query} from "@apollo/client/react/components";

interface Props{
    catchId:ObjectId|string
}
interface Shop{
    getStore:{
        shopName:string
        openTime:number
        closeTime:number
        _id:ObjectId
    }
}

export const days=['sun','mon','tue','wed','thu','fri','sat']
const BigTable:React.FunctionComponent<Props>=({catchId})=>{

    const ID = "\"" + catchId + "\""
    const GET_STORE = gql`
        query {
            getStore(storeId:${ID}){
                shopName
                openTime
                closeTime
                _id
            }
        }
    `



    let theDay=new Date()

    const [year,setYear]=useState(theDay.getFullYear())
    const [month,setMoth]=useState(theDay.getMonth()+1)
    const [date,setDate]=useState(theDay.getDate())
    const [day,setDay]=useState(theDay.getDay())
    const [styleId,setStyleId]=useState('100')
    const openReserve=useCallback((day:string,lastID:string)=>{
        document.getElementById(`reservation-time${styleId}`)!.style.display='none'
        setStyleId(day.toString()+lastID)
        document.getElementById(`reservation-time${day}${lastID}`)!.style.display='block'
    },[styleId])
    const week=Array(7).fill(0)
    if(day===0){
        for(let i=0;i<7;i++){
            let h=new Date()
            h.setDate(h.getDate()+i)
            week[i]=h.getDate()
        }
    }else{
        for(let i=day+1;i<7;i++){
            let h=new Date()
            h.setDate(h.getDate()+i)
            week[i]=h.getDate()
        }
        for(let i=0;i<day;i++){
            let h=new Date()
            h.setDate(h.getDate()+7-day+i)
            week[i]=h.getDate()
        }
        week[day]=date;
    }



    console.log(year,month,date,days[day],day)
    return(
        <>
            <Query<Shop,{}> query={GET_STORE}>
                {({loading,error,data})=>{
                    if(loading)return <p>wait a sec</p>
                    if(error) return <p>try later</p>
                    return(
                        <>
                            <div>
                                {days.map((ele,ind)=>{
                                    return(
                                        <>
                                            {Array(data!.getStore).map(({shopName,openTime,closeTime,_id})=>{
                                                return(
                                                    <>
                                                        <div className="take-day">
                                                            <div onClick={()=>openReserve(ind.toString(),_id!.toString().slice(_id.toString().length-4,_id.toString().length))} id={ele}>
                                                                {ele}({week[ind]})
                                                            </div>
                                                        </div>
                                                        <TimeZone master={_id} addId={ind} open={openTime} close={closeTime} name={shopName}/>
                                                    </>
                                                )
                                            })}
                                        </>
                                    )
                                })}
                            </div>
                            <input hidden id="reservation-time100"/>
                        </>
                    )
                }}
            </Query>
        </>
    )
}

export default BigTable;