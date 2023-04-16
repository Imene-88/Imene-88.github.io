import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './TextEditor.module.css';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

/* useRef so that the editor does not re-render each time changes are made,
and since toolbar of editor is seperated from the actual editor, we reference 
the container so that both the toolbar and the editor do not re-render. */

const fontSize = ['8','9','10','11','12','14','18','24','30','36','48','60','72','96'];

var Size = Quill.import('attributors/style/size');
Size.whitelist = fontSize;
Quill.register(Size, true);

const custom_additional_toolbar = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ 'size': fontSize }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { direction: 'rtl' }],
    [{ script:'sub' }, { script:'super' }], 
    ['link', 'image', 'video'],
    ['clean']   
]

const modules = {
    toolbar: custom_additional_toolbar
}

function TextEditor({text}) {
    const { user: loggedInUser} = useContext(AuthContext);
    const userId = loggedInUser._id;
    const {id: document_id} = useParams();
    const [socket, setSocket] = useState(); // have access to socket variable and 
    const [quill, setQuill] = useState(); // quill instance

    // Connection with socket.io
    useEffect(() => {
        const URL = "http://localhost:3003";
        const s = io(URL, { autoConnect: false });
        s.connect();
        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, [])

    useEffect(() => {
        if (socket == null || quill == null) return;

        if (text) {
            quill.setContents(text.content);
            quill.blur();
            const textId = text._id;
            socket.emit("document:send", textId);
            socket.on("document:receive", (delta) => {
                quill.setContents(delta);
            })
        }
        
    }, [socket, quill, document_id]);

    useEffect(() => {
        if (socket == null || quill == null) return;
        const saveWhenIntervalPasses = setInterval(() => {
            const content = quill.getContents();
            socket.emit("document:insertDB", {document_id, userId, content});
            socket.on("document:receive", (delta) => {
                quill.setContents(delta);
            })
        }, 2000);
        return () => {
            clearInterval(saveWhenIntervalPasses);
        }
    }, [socket, quill]);

    // Sending changes to connected users
    useEffect(() => {
        if (socket == null || quill == null) return;
        const whenTextChanges = (delta, oldDelta, source) => {
            if (source !== 'user') return;
            socket.emit("changes:send", delta);
            const content = quill.getContents();
            socket.emit("document:insertDB", {document_id, userId, content});
        };
        quill.on("text-change", whenTextChanges);

        return () => {
            quill.off("text-change", whenTextChanges);
        };
    }, [socket, quill])

    // update contents of editor whenever a user makes changes
    useEffect(() => {
        if (socket == null || quill == null) return;
        const whenTextChanges = (delta, oldDelta, source) => {
            quill.updateContents(delta);
            socket.emit("document:insertDB", {document_id, userId, delta});
        };
        socket.on("changes:receive", whenTextChanges);

        return () => {
            socket.off("changes:receive", whenTextChanges);
        };
    }, [socket, quill])

    const editorContainer = useCallback(textEditor => { /* so that the ref will always be defined because if I use useRef with useEffect, useRef sometimes does not get defined before useEffect, therefore it will not get recognized */
        if (textEditor == null) return;
        textEditor.innerHTML = ''; /* clean up the text editor so that after each change it will not re-render */
        const editor = document.createElement('div'); /* Create a new div that containes the editor and append it to the main container so that the toolbar and the editor are included both in the div */
        textEditor.append(editor);   
        const q = new Quill(editor, { theme: "snow", modules: modules, placeholder: "Type to insert" });
        q.focus();
        setQuill(q);
    }, []);
  return (
    <div className={styles.container} ref={editorContainer}></div>
  )
}

export default TextEditor