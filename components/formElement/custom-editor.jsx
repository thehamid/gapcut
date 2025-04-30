'use client'
import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

const Editor = ({ valueEditor,defaultValue }) => {
	const editor = useRef(null);
  const [content, setContent] = useState(defaultValue);
  


	return (
    <div className='text-zinc-600 max-w-[850px]'>
     <JoditEditor
			ref={editor}
			value={content}
			tabIndex={1} 
        onBlur={newContent => {
          setContent(newContent)
          valueEditor(newContent)
        }
        } 
		/>
    </div>
	);
};
export default Editor
