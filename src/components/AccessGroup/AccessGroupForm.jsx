import React, { useState, useEffect } from 'react';
import "./CustomForm.scss";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";

const roles = {
  group1: {
    Vendor: ['create vendor', 'update vendor', 'view vendor'],
    Customer: ['create customer', 'view customer', 'block customer'],
    Supplier: ['create supplier', 'update supplier', 'view supplier'],
    Client: ['create client', 'view client', 'block client'],
    Admin: ['create admin', 'update admin', 'view admin'],
    User: ['create user', 'view user', 'block user']
  },
  group2: {
    Supplier: ['create supplier', 'update supplier', 'view supplier'],
    Client: ['create client', 'view client', 'block client']
  },
  group3: {
    Admin: ['create admin', 'update admin', 'view admin'],
    User: ['create user', 'view user', 'block user']
  }
};

const CustomForm = ({ header = "Default Header", fields = [], flexDirection = "column", createButtonLabel = "Create", onSubmit }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedRoles, setSelectedRoles] = useState({});
  const [expandedRoles, setExpandedRoles] = useState({});

  useEffect(() => {
    if (selectedGroup) {
      const initialExpandedRoles = Object.keys(roles[selectedGroup]).reduce((acc, role) => {
        acc[role] = true;
        return acc;
      }, {});
      setExpandedRoles(initialExpandedRoles);
    }
  }, [selectedGroup]);

  const handleSelectChange = (e) => {
    const group = e.target.value;
    setSelectedGroup(group);
    setSelectedRoles({});
    setExpandedRoles({});
  };

  const handleParentRoleChange = (role) => {
    const updatedRoles = { ...selectedRoles };
    if (updatedRoles[role]) {
      delete updatedRoles[role];
    } else {
      updatedRoles[role] = roles[selectedGroup][role];
    }
    setSelectedRoles(updatedRoles);
  };

  const handleChildRoleChange = (parent, child) => {
    const updatedRoles = { ...selectedRoles };
    if (updatedRoles[parent]?.includes(child)) {
      updatedRoles[parent] = updatedRoles[parent].filter(r => r !== child);
      if (updatedRoles[parent].length === 0) {
        delete updatedRoles[parent];
      }
    } else {
      updatedRoles[parent] = [...(updatedRoles[parent] || []), child];
    }
    setSelectedRoles(updatedRoles);
  };

  const isChecked = (parent, child) => {
    return selectedRoles[parent]?.includes(child);
  };

  const toggleExpand = (parentRole) => {
    setExpandedRoles((prevState) => ({
      ...prevState,
      [parentRole]: !prevState[parentRole],
    }));
  };

  return (
    <div className="createPageContainer">
      <div className="createPageContents">
        <div className="top">
          <span className="backIcon" onClick={handleBackClick}><FaArrowLeftLong /></span>
          <span className="headerTitle">{header}</span>
        </div>
        <div className="bottom">
          <form style={{ flexDirection: flexDirection }} onSubmit={onSubmit}>
            {fields.map((field, index) => (
              <div className="inputGroup" key={index}>
                <label htmlFor={field.name}>{field.name}</label>
                {field.type === 'select' ? (
                  <select name={field.name} id={field.name} onChange={handleSelectChange} value={field.value}>
                    <option value="">Select an option</option>
                    {field.options.map((option, index) => (
                      <option value={option.value} key={index}>{option.label}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea name={field.name} id={field.name} value={field.value} onChange={field.onChange} />
                ) : (
                  <input type={field.type} name={field.name} id={field.name} value={field.value} onChange={field.onChange} />
                )}
              </div>
            ))}
            {selectedGroup && roles[selectedGroup] && (
              <div className="rolesContainer">
                {Object.keys(roles[selectedGroup]).map((parentRole) => (
                  <div key={parentRole} className="roleGroup">
                    <div className="parentRole">
                      {expandedRoles[parentRole] ? (
                        <IoMdArrowDropdown className="iconDrop" onClick={() => toggleExpand(parentRole)} />
                      ) : (
                        <IoMdArrowDropright className="iconDrop" onClick={() => toggleExpand(parentRole)} />
                      )}
                      <input className="parentRole__checkbox"
                        type="checkbox"
                        id={parentRole}
                        checked={selectedRoles[parentRole]?.length === roles[selectedGroup][parentRole].length}
                        onChange={() => handleParentRoleChange(parentRole)}
                      />
                      <label htmlFor={parentRole}>{parentRole}</label>
                    </div>
                    {expandedRoles[parentRole] && (
                      <div className="childRoles">
                        {roles[selectedGroup][parentRole].map((childRole) => (
                          <div key={childRole} className="childRole">
                            <input
                              type="checkbox"
                              id={childRole}
                              checked={isChecked(parentRole, childRole)}
                              onChange={() => handleChildRoleChange(parentRole, childRole)}
                            />
                            <label htmlFor={childRole}>{childRole}</label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="btn-group">
              <button type="submit" className='create-btn'>{createButtonLabel}</button>
              <button type="button" className="cancel-btn" onClick={handleBackClick}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomForm;
