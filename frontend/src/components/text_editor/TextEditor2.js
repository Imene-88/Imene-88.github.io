import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './TextEditor.module.css';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import socket from '../../SOCKET_CONNECTION';

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

function TextEditor2() {
    const { user: loggedInUser} = useContext(AuthContext);
    const userId = loggedInUser._id;
    const {id: document_id} = useParams();
    const [quill, setQuill] = useState(); // quill instance

    useEffect(() => {
        if (socket == null || quill == null) return;

        
        
        socket.on(`document:receive-${document_id}`, (content) => {
            quill.setContents(content);
        })
        
        socket.emit("document:send", document_id, userId);
        
    }, [quill, document_id, userId]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        const interval = setInterval(() => {
            socket.emit(`document:saveChangesToDB-${document_id}`, quill.getContents());
        }, 2000);

        return () => {
            clearInterval(interval);
        };

    }, [quill]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        const handler = (delta) => {
            quill.updateContents(delta);
        };

        socket.on(`changes:receive-${document_id}`, handler);

        return () => {
            socket.off(`changes:receive-${document_id}`, handler);
        };
    }, [quill]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return;
            socket.emit(`changes:send-${document_id}`, delta, "hello3");
        };

        quill.on("text-change", handler);

        return () => {
            quill.off("text-change", handler);
        };
    }, [quill]);

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

export default TextEditor2