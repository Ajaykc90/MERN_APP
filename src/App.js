import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notifications from './components/Notifications';
import Popup from './components/Popup';
import { showNotifications as show } from './helpers/helpers';
import "./App.css";


const words = ['application', 'programming', 'interface', 'wizard', 'nightmare', 'australia', 'happy', 'english', 'funny', 'bread', 'pneumonia', 'naruto', 'kangaroo'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const App = () => {
    const [playable, setPlayable] = useState(true);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    useEffect(() => {
        const handlekeydown = event => {
            const { key, keyCode } = event;
            if (playable && keyCode >= 65 && keyCode <= 95) {
                const letter = key.toLowerCase();
                if (selectedWord.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        setCorrectLetters((currentLetter) => [...currentLetter, letter])
                    } else {
                        show(setShowNotification)
                    }

                } else {
                    if (!selectedWord.includes(letter)) {
                        setWrongLetters((currentLetter) => [...currentLetter, letter])
                    } else {
                        show(setShowNotification)
                    }

                }
            }

        }
        window.addEventListener('keydown', handlekeydown);
        return () => window.removeEventListener('keydown', handlekeydown);

    }, [playable, correctLetters, wrongLetters])

    const playAgain = () => {
        setPlayable(true);
        setWrongLetters([]);
        setCorrectLetters([]);
        const random = Math.floor(Math.random() * words.length);
        selectedWord = words[random];

    }
    return (
        <>
            <Header />
            <div className="game-container">
                <Figure wrongLetters={wrongLetters} />
                <WrongLetters wrongLetters={wrongLetters} />
                <Word selectedWord={selectedWord} correctLetters={correctLetters} />
            </div>
            <Popup selectedWord={selectedWord} correctLetters={correctLetters} wrongLetters={wrongLetters} setPlayable={setPlayable} playable={playable} playAgain={playAgain} />
            <Notifications showNotification={showNotification} />
        </>
    )
}

export default App
