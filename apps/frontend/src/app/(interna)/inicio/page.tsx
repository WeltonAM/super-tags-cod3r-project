'use client'
import useAutenticacao from "@/data/hooks/useAutenticacao"

export default function Inicio() {
    const { logout } = useAutenticacao();

    return (
        <div className="">
            INICIO
        </div>
    )
}

// npm install emoji-picker-react
// import { useState } from 'react';
// import dynamic from 'next/dynamic';
// const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// export default function Home() {
//   const [title, setTitle] = useState('SuperTag 🚀');
//   const [emoji, setEmoji] = useState('🚀');
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [properties, setProperties] = useState([]);

//   const handleEmojiClick = (event, emojiObject) => {
//     setEmoji(emojiObject.emoji);
//     setShowEmojiPicker(false);
//   };

//   const addProperty = (type) => {
//     setProperties([...properties, { id: Date.now(), type, value: '' }]);
//   };

//   const updateProperty = (id, value) => {
//     setProperties(properties.map(prop => prop.id === id ? { ...prop, value } : prop));
//   };

//   const removeProperty = (id) => {
//     setProperties(properties.filter(prop => prop.id !== id));
//   };

//   const handleTitleClick = () => {
//     const newTitle = prompt('Enter new title:', title);
//     if (newTitle) {
//       setTitle(newTitle);
//     }
//   };

//   return (
//     <div>
//       <h1 onClick={handleTitleClick}>
//         {title} <span onClick={() => setShowEmojiPicker(!showEmojiPicker)}>{emoji}</span>
//       </h1>
//       {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
      
//       <button onClick={() => addProperty('text')}>Add Text</button>
//       <button onClick={() => addProperty('integer')}>Add Integer</button>
//       <button onClick={() => addProperty('float')}>Add Float</button>
//       <button onClick={() => addProperty('checkbox')}>Add Checkbox</button>
//       <button onClick={() => addProperty('date')}>Add Date</button>

//       <div>
//         {properties.map((prop) => (
//           <div key={prop.id}>
//             <label>{prop.type}</label>
//             {prop.type === 'text' && <input type="text" value={prop.value} onChange={(e) => updateProperty(prop.id, e.target.value)} />}
//             {prop.type === 'integer' && <input type="number" value={prop.value} onChange={(e) => updateProperty(prop.id, e.target.value)} />}
//             {prop.type === 'float' && <input type="number" step="0.01" value={prop.value} onChange={(e) => updateProperty(prop.id, e.target.value)} />}
//             {prop.type === 'checkbox' && <input type="checkbox" checked={prop.value} onChange={(e) => updateProperty(prop.id, e.target.checked)} />}
//             {prop.type === 'date' && <input type="date" value={prop.value} onChange={(e) => updateProperty(prop.id, e.target.value)} />}
//             <button onClick={() => removeProperty(prop.id)}>Remove</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
