import *as React from 'react'
import LoginForm from "./loginForm";

const AppLayout=({children}:any)=>{
    return (
        <>
            <header>
                <ul className="main-list">
                    <li>홈</li>
                    <li>가게별</li>
                    <li>검색</li>
                    <li>
                        <LoginForm/>
                    </li>
                </ul>
            </header>
            <section>
                {children}
            </section>
            <footer>
                <p>
                    Made by <a href="https://github.com/SuhyeonP">Su hyeon Park</a>
                </p>
                <p>You can see this project code in</p>
                <a href="https://github.com/SuhyeonP/samdeok-front">Here~</a>
            </footer>
        </>
    )
}
export default AppLayout;