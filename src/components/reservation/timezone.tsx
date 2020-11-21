import *as React from 'react'
import {Tabs} from "antd";
import {days} from "./bigtable";
import {useEffect, useState} from "react";
import { ObjectID } from 'mongodb';

const {TabPane}=Tabs;

interface Props{
    master:ObjectID;
    addId:number;
    open:number;
    close:number;
    name:string;
}

const TimeZone:React.FunctionComponent<Props>=({master,addId,open,close,name})=>{
    const newId=master!.toString().slice(master.toString().length-4,master.toString().length)
    const divId="reservation-time"+addId.toString()+newId
    const [timeArr,setTimeArr]=useState<number[]>([])
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
                                return <TabPane tab={ele+"시"} key={ind+1}/>
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