import React, { useState } from 'react';
import '../../styles/form.css';
const Bouton = ({titre, url}) => (
  <a href={url} className="bouton">
     {titre}
  </a>
 );
 

const Form = ({ fields, buttonText, onSubmit, clickableText, clickableHref }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.label}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">{buttonText}</button>
      {clickableText && clickableHref && (
        <p>
          <a href={clickableHref} target="_self" rel="noopener noreferrer">
            {clickableText}
          </a>
        </p>
      )}
    </form>
  );
};

export default Form;
