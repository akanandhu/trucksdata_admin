import dynamic from 'next/dynamic'
import React, { SetStateAction } from 'react'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const EditorText = ({ text, setText }: { text: string; setText: React.Dispatch<SetStateAction<string>> }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
      [{ color: [] }, { background: [] }]
    ],
   
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background'
  ]

  const handleChange = (value: string) => {
    setText(value)
  }

  return (
    <>
      <div className='text-editor'>
        <ReactQuill theme='snow' modules={modules} formats={formats} onChange={handleChange} value={text} />
      </div>
    </>
  )
}

export default EditorText
