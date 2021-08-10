import React, { useRef, useState, useEffect } from "react";
import styles from "./ChatApp.module.css";
import Avatar from "./avatar.png";

import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const auth = firebase.auth();
const firestore = firebase.firestore();

function ChatApp() {
  return (
    <div className={styles.App}>
      <header>
        <h3>Chat</h3>
      </header>
      <section>{<ChatRoom />}</section>
    </div>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");

  const query = messagesRef.orderBy("createdAt").limit(50);
  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <main className={styles.main}>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage} className={styles.form}>
        <input
          className={styles.input}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type Something"
        />

        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  const messageClass =
    uid === auth.currentUser.uid ? styles.sent : styles.received;

  return (
    <>
      <div className={`${styles.message} ${messageClass}`}>
        <img className={styles.img} src={Avatar} />
        <p className={styles.p}>{text}</p>
      </div>
    </>
  );
}

export default ChatApp;
