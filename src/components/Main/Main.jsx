import React, { useContext, useEffect, useRef, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)
    const resultRef = useRef(null)
    const [typingText, setTypingText] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [resultData])

    useEffect(() => {
        if (resultData && !loading) {
            setIsTyping(true)
            let i = 0
            const typingInterval = setInterval(() => {
                if (i < resultData.length) {
                    setTypingText(prev => prev + resultData.charAt(i))
                    i++
                } else {
                    clearInterval(typingInterval)
                    setIsTyping(false)
                }
            }, 20) // Adjust typing speed here

            return () => clearInterval(typingInterval)
        }
    }, [resultData, loading])

    const generateHeading = (content) => {
        const words = content.split(' ').slice(0, 5)
        let heading = words.join(' ')
        if (heading.length > 50) {
            heading = heading.substring(0, 50) + '...'
        }
        return heading.charAt(0).toUpperCase() + heading.slice(1)
    }

    const formatResponse = (response) => {
        if (!response) return null

        const heading = generateHeading(response)
        const paragraphs = response.split('\n').filter(para => para.trim() !== '')

        return (
            <>
                <h2>{heading}</h2>
                {paragraphs.map((para, index) => (
                    <p key={index}>{para.replace(/\*/g, '')}</p>
                ))}
            </>
        )
    }

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemining</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult && (
                    <>
                        <div className="greet">
                            <p><span>Hallo, Rek.</span></p>
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
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                )}
                
                {showResult && (
                <div className="result" ref={resultRef}>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading ? (
                            <div className="loading-animation">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                        ) : (
                            <div className="typing-animation">
                                {formatResponse(typingText)}
                                {isTyping && <span className="typing-cursor">|</span>}
                            </div>
                        )}
                    </div>
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
                        <img onClick={() => onSent(input)} src={assets.send_icon} alt="" />
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