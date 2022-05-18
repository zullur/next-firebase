import Head from 'next/head'
import styles from '../styles/Layout.module.scss'
import { useState } from "react";
import NoteOperations from './components/NoteComponents';
import NoteDetails from './components/NoteDetails';

export default function Home() {
    const [ID, setID] = useState(null);
    const getSingleNote = (id) => {
        setID(id)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>ACV - Control panel</title>
                <meta name="description" content="ACV - Control panel"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <NoteOperations getSingleNote={getSingleNote}/>
                    </div>
                    <div className={styles.right}>
                        <NoteDetails ID={ID}/>
                    </div>
                </div>
            </main>
        </div>
    )
}
