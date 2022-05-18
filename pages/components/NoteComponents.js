import styles from '../../styles/Layout.module.scss'
import { useState, useEffect } from "react";
import { app, database } from '../api/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const dbInstance = collection(database, 'notes');

export default function NoteOperations({getSingleNote}) {
    const [isInputVisible, setInputVisible] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDesc, setNoteDesc] = useState('')
    const [notesArray, setNotesArray] = useState([]);
    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    }

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setNotesArray(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }));
            })
    }

    const saveNote = () => {
        addDoc(dbInstance, {
            noteTitle: noteTitle,
            noteDesc: noteDesc
        })
            .then(() => {
                setNoteTitle('')
                setNoteDesc('')
                getNotes();
            })
    }

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            <div className={styles.btnContainer}>
                <button
                    onClick={inputToggle}
                    className={styles.button}>
                    Add a New Note
                </button>
            </div>

            {isInputVisible ? (
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        placeholder='Enter the Title..'
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={noteTitle}
                    />
                    <div className={styles.textareaContainer}>
                        <textarea
                            className={styles.textarea}
                            onChange={(e) => setNoteDesc(e.target.value)}
                            value={noteDesc}
                            rows={6}
                        />
                    </div>
                    <button
                        onClick={saveNote}
                        className={styles.saveBtn}>
                        Save Note
                    </button>
                </div>
            ) : (
                <></>
            )}
            <div className={styles.notesDisplay}>
                {notesArray.map((note) => {
                    return (
                        <div
                            key={note.id}
                            className={styles.notesInner}
                            onClick={() => getSingleNote(note.id)}
                        >
                            <h4>{note.noteTitle}</h4>
                            <p>{note.noteDesc}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}