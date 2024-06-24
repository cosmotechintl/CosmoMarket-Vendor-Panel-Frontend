import React, { useState } from 'react';
import './CustomForm.scss';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const CustomForm = ({
  header = 'Default Header',
  fields = [],
  flexDirection = 'column',
  createButtonLabel = 'Create',
  onSubmit,
  isSubmitting = false
}) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="createPageContainer">
      <div className="createPageContents">
        <div className="top">
          <span className="backIcon" onClick={handleBackClick}>
            <FaArrowLeftLong />
          </span>
          <span className="headerTitle">{header}</span>
        </div>
        <div className="bottom">
          <form style={{ flexDirection: flexDirection }} onSubmit={onSubmit} encType='multipart/form-data'>
            {fields.map((field, index) => (
              <div className="inputGroup" key={index}>
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === 'select' ? (
                  <select name={field.name} id={field.name} value={field.value} onChange={field.onChange}>
                    <option value="" selected disabled>Select access group</option>
                    {field.options.map((option, index) => (
                      <option value={option.value} key={index}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea name={field.name} id={field.name} value={field.value} onChange={field.onChange} />
                ) : field.type === 'file' ? (
                  <div className="fileInput">
                    <input type="file" name={field.name} id={field.name} onChange={handleImageChange} />
                    {image && <img src={image} alt="Company Logo" className="uploadedImage" />}
                  </div>
                ) : (
                  <input type={field.type} name={field.name} id={field.name} value={field.value} onChange={field.onChange} />
                )}
                <small className="tailText">{field.tail}</small>
              </div>
            ))}
            <div className="btn-group">
              <button type="submit" className="create-btn" disabled={isSubmitting}>
                {createButtonLabel}
              </button>
              <button type="button" className="cancel-btn" disabled={isSubmitting} onClick={handleBackClick}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomForm;
