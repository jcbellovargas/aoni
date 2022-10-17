import { useState } from 'react'
import { WithContext as ReactTags } from 'react-tag-input-latest';


export default function TagInput(props){

  const handleDelete = i => {
    props.setTags(props.tags.filter((tag, index) => index !== i));
  };

  const handleAddition = newTag => {
    const tagAlreadyExists = !!props.tags.find(t => t.id === newTag.id);
    const newTags = tagAlreadyExists ? props.tags : [...props.tags, newTag]
    props.setTags(newTags);
  };

  return (
    <ReactTags tags={props.tags}
      suggestions={props.suggestions}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      minQueryLength={1}
      placeholder={props.suggestions.map((s) => { return s.text })}
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