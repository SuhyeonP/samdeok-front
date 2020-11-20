import *as React from 'react'
import {Tabs} from "antd";

const {TabPane}=Tabs;


const TimeZone:React.FunctionComponent=()=>{
    return(
        <>
            <div className="time-zone" id="reservation-time">
                <div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="10시" key="1"/>
                        <TabPane tab="11시" key="2"/>
                        <TabPane tab="12시" key="3"/>
                        <TabPane tab="13시" key="4"/>
                        <TabPane tab="14시" key="5"/>
                        <TabPane tab="15시" key="6"/>
                        <TabPane tab="16시" key="7"/>
                        <TabPane tab="17시" key="8"/>
                        <TabPane tab="18시" key="9"/>
                        <TabPane tab="19시" key="10"/>
                        <TabPane tab="20시" key="11"/>
                        <TabPane tab="21시" key="12"/>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default TimeZone;