import styles from '../../styles/Layout.module.scss'
import { useEffect, useState } from 'react'
import { app, database } from '../api/firebaseConfig';
import {
    doc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'

const dbInstance = collection(database, 'notes');

export default function NoteDetails({ID}) {
    const [singleNote, setSingleNote] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDesc, setNoteDesc] = useState('');

    const getSingleNote = async () => {
        if (ID) {
            setIsEdit(false);
            const singleNote = doc(database, 'notes', ID)
            const data = await getDoc(singleNote)
            setSingleNote({ ...data.data(), id: data.id })
        }
    }

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setSingleNote(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })[0]);
            })
    }

    const getEditData = () => {
        setIsEdit(true);
        setNoteTitle(singleNote.noteTitle);
        setNoteDesc(singleNote.noteDesc)
    }

    useEffect(() => {
        getNotes();
    }, [])

    useEffect(() => {
        getSingleNote();
    }, [ID])

    const editNote = (id) => {
        const collectionById = doc(database, 'notes', id)

        updateDoc(collectionById, {
            noteTitle: noteTitle,
            noteDesc: noteDesc,
        })
            .then(() => {
                window.location.reload()
            })
    }

    const deleteNote = (id) => {
        const collectionById = doc(database, 'notes', id)

        deleteDoc(collectionById)
            .then(() => {
                window.location.reload()
            })
    }

    return (
        <>
            <button
                className={styles.editBtn}
                onClick={getEditData}
            >Edit
            </button>
            <button
                className={styles.deleteBtn}
                onClick={() => deleteNote(singleNote.id)}
            >Delete
            </button>
            {isEdit ? (
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        placeholder='Enter the Title..'
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={noteTitle}
                    />
                    <div className={styles.ReactQuill}>
                        <textarea
                            className={styles.textarea}
                            onChange={(e) => setNoteDesc(e.target.value)}
                            value={noteDesc}
                            rows={6}
                        />
                    </div>
                    <button
                        onClick={() => editNote(singleNote.id)}
                        className={styles.saveBtn}
                    >
                        Update Note
                    </button>
                </div>
            ) : (
                <></>
            )}
            <h2>{singleNote.noteTitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: singleNote.noteDesc }}></div>
        </>
    )
}