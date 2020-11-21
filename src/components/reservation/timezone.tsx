import *as React from 'react'
import {Tabs} from "antd";
import {days} from "./bigtable";
import {useCallback, useEffect, useState} from "react";
import { ObjectID } from 'mongodb';

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

const TimeZone:React.FunctionComponent<Props>=({master,takeDay,theDay,addId,open,close,name})=>{
    const newId=master!.toString().slice(master.toString().length-4,master.toString().length)
    const divId="reservation-time"+addId.toString()+newId
    const [timeArr,setTimeArr]=useState<number[]>([])
    const [dayArr,setDayArr]=useState<Date[]>([])
    const [dayArr2,setDayArr2]=useState<string[]>([])
    const [load,setLoad]=useState(false)
    const [secLoad,setSLoad]=useState(false)

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

    const goToCheck=useCallback((id:ObjectID,time:Date)=>{
        console.log(time,id)
    },[])


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
                                            {dayArr2[ind]}
                                            <br/>
                                            <button onClick={()=>goToCheck(master,dayArr[ind])} className="gotoCheck">예약하기</button>
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
}

export default TimeZone;