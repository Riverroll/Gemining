import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'

const Main = () => {
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemining</p>
            <img src={assets.user_icon} alt="" className="" />
        </div>
        <div className="main-container">
            <div className="greet">
                <p className=""><span>Halo, Rek.</span></p>
                <p>How Can I Help You Today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readibility of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder="Enter a prompt here" />
                    <div>
                        <img src={assets.gallery_icon}alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img src={assets.send_icon_icon} alt="" />
                    </div>
                </div>
                <p className="bottom-info">
                    Gemining may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemining Apps
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main