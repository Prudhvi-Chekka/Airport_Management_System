import React, { useState } from 'react';
import './VerticalTabs.css'; // Import the CSS file for styling

const VerticalTab = ({ label, children }) => {
  return (
    <div>
      <div className="vertical-tab-label">{label}</div>
      <div className="vertical-tab-content">{children}</div>
    </div>
  );
};

const VerticalTabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(-1);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="vertical-tabs-container">
      <div className="vertical-tabs">
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={`vertical-tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {child.props.label}
          </div>
        ))}
      </div>
      <div className="vertical-tabs-content">
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={`vertical-tab-content-item ${
              activeTab === index ? 'active' : ''
            }`}
          >
            {child.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export { VerticalTab, VerticalTabs };
