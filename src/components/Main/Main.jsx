import React, { useContext, useEffect, useRef, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)
    const [chatHistory, setChatHistory] = useState([])
    const chatContainerRef = useRef(null)

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [chatHistory])

    useEffect(() => {
        if (resultData && !loading) {
            setChatHistory(prev => [...prev, { prompt: recentPrompt, response: resultData }])
            setInput('')
        }
    }, [resultData, loading, recentPrompt])

    const handleSend = () => {
        if (input.trim()) {
            onSent(input)
        }
    }

    const formatResponse = (response) => {
        if (!response) return null

        const paragraphs = response.split('\n').filter(para => para.trim() !== '')

        return paragraphs.map((para, index) => (
            <p key={index}>{para.replace(/\*/g, '')}</p>
        ))
    }

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemining</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="chat-container" ref={chatContainerRef}>
                {chatHistory.length === 0 && (
                    <div className="greet">
                        <p><span>Hallo, Rek.</span></p>
                        <p>How Can I Help You Today?</p>
                    </div>
                )}
                {chatHistory.map((chat, index) => (
                    <div key={index} className="chat-bubble">
                        <div className="user-message">
                            <img src={assets.user_icon} alt="" />
                            <p>{chat.prompt}</p>
                        </div>
                        <div className="ai-response">
                            <img src={assets.gemini_icon} alt="" />
                            <div>{formatResponse(chat.response)}</div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="loading-animation">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                )}
            </div>
            <div className="main-bottom">
                <div className="search-box">
                    <input 
                        onChange={(e) => setInput(e.target.value)} 
                        value={input} 
                        type="text" 
                        placeholder="Enter a prompt here" 
                    />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img onClick={handleSend} src={assets.send_icon} alt="" />
                    </div>
                </div>
                <p className="bottom-info">
                    Gemining may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemining Apps
                </p>
            </div>
        </div>
    )
}

export default Main