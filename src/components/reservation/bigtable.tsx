import *as React from 'react';
import Calendar from "react-calendar";
import {useState} from 'react';
import useInput from "../../config/useInput";


const BigTable:React.FunctionComponent=()=>{
    const days=['sun','mon','tue','wed','thu','fri','sat']

    let theDay=new Date()

    const [year,setYear]=useState(theDay.getFullYear())
    const [month,setMoth]=useState(theDay.getMonth()+1)
    const [date,setDate]=useState(theDay.getDate())
    const [day,setDay]=useState(theDay.getDay()-1)

    const openReserve=(day:string)=>{

    }


    console.log(year,month,date,days[day])
    return(
        <>
            <div>
                {days.map((ele,ind)=>{
                    return(
                        <>
                            <div className="take-day">
                                <div onClick={()=>openReserve(ele)} id={ele}>
                                    {ele}()
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default BigTable;