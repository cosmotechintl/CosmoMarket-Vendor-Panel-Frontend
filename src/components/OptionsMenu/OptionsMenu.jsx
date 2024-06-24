import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./OptionsMenu.scss";

const OptionsMenu = ({ menuItems, visible }) => {
  if (!visible) return null;

  return (
    <div className="optionsMenuContainer">
      <div className="optionsMenuContents">
        {menuItems.map((item, index) => (
          <div key={index} className="menuListItem">
            <Link to={item.link}>{item.text}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

OptionsMenu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  ).isRequired,
  visible: PropTypes.bool.isRequired,
};

export default OptionsMenu;
