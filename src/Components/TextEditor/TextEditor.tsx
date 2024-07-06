//import React from "react";
import * as React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './TextEditor.css'
//import 'ckeditor5/ckeditor5.css';


const TextEditor = ({onChange
 
}: {onChange: (data: string) => void;

}) => {

  return (
    <div className="TextEditor">
        <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor&nbsp;5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          //console.log( 'Editor is ready to use!', editor );
        }}
        onChange={(event, editor) => {
          //console.log( "the event is: " + event);
          const data = editor.getData();
          //console.log({ event, editor, data });
          onChange(data);
        }}
        onBlur={(editor) => {
          //console.log( 'Blur.', editor );
        }}
        onFocus={(editor) => {
          //console.log( 'Focus.', editor );
        }}
      />
   
    </div>
  );
};

export default TextEditor;
