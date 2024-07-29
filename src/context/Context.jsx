import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async (prompt) => {
        if (!prompt.trim()) {
            console.log("Empty prompt, not sending");
            return;
        }
        setLoading(true);
        setRecentPrompt(prompt);
        console.log("Sending prompt:", prompt);
        try {
            const response = await runChat(prompt);
            console.log("Received response:", response);
            setResultData(response);
            setShowResult(true);
            setPrevPrompts(prevPrompts => [...prevPrompts, prompt]);
        } catch (error) {
            console.error("Error in onSent:", error);
            let errorMessage = "An error occurred while processing your request. Please try again.";
            if (error.message) {
                errorMessage += " Error details: " + error.message;
            }
            setResultData(errorMessage);
        } finally {
            setLoading(false);
            setInput(""); // Clear the input after sending
        }
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;