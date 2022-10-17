import { useState } from 'react'
import { WithContext as ReactTags } from 'react-tag-input-latest';


export default function TagInput(){

  const [tags, setTags] = useState([]);

  const suggestions = [    
    { id: 'Salud', text: 'Salud' },
    { id: 'Tecnologia', text: 'Tecnologia' },
    { id: 'Moda', text: 'Moda' },
    { id: 'Negocios', text: 'Negocios' },
    { id: 'Juegos', text: 'Juegos' },
    { id: 'Arte', text: 'Arte' },
    { id: 'Emergencia', text: 'Emergencia' },
    { id: 'Comida', text: 'Comida' },
    { id: 'Redes Sociales', text: 'Redes Sociales' },

  ];

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = newTag => {
    const tagAlreadyExists = !!tags.find(t => t.id === newTag.id);
    const newTags = tagAlreadyExists ? tags : [...tags, newTag]
    setTags(newTags);
  };

  return (
    <ReactTags tags={tags}
      suggestions={suggestions}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      minQueryLength={1}
      placeholder={suggestions.map((s) => { return s.text })}
      allowDeleteFromEmptyInput={false}
      inputFieldPosition="bottom"
      classNames={{
        tagInputField: "input input-bordered input-primary w-full",
        tag: "indicator-item badge badge-primary mb-2 mr-1",
        suggestions: "bg-white border-black mt-1 kbd border-primary" 
      }}
    />
  )
}