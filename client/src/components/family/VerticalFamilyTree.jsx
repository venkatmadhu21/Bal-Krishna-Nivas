import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './VerticalFamilyTree.css';

const VerticalFamilyTree = ({ data }) => {
  if (!data) return null;
  
  return (
    <div className="vertical-tree-container">
      <VerticalTreeNode node={data} level={0} />
    </div>
  );
};

const VerticalTreeNode = ({ node, level }) => {
  const [expanded, setExpanded] = useState(true);
  
  const toggleExpand = () => {
    if (node.children && node.children.length > 0) {
      setExpanded(!expanded);
    }
  };
  
  const hasChildren = node.children && node.children.length > 0;
  const nodeClasses = `vertical-tree-node ${node.attributes.gender === 'Male' ? 'male' : 'female'} ${hasChildren ? 'has-children' : ''}`;
  
  return (
    <div className="vertical-tree-item" style={{ paddingLeft: `${level * 20}px` }}>
      <div className={nodeClasses} onClick={toggleExpand}>
        <div className="node-connector"></div>
        <div className="node-content">
          <div className="node-photo">
            <img 
              src={node.attributes.profilePicture || (node.attributes.gender === 'Male' ? `/images/profiles/male${(node.attributes.serNo % 8) + 1}.jpg` : `/images/profiles/female${(node.attributes.serNo % 8) + 1}.jpg`)}
              alt={node.name}
              className="profile-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = node.attributes.gender === 'Male' ? '/images/profiles/male1.jpg' : '/images/profiles/female1.jpg';
              }}
            />
          </div>
          <Link to={`/family/member/${node.attributes.serNo}`} className="node-name">
            {node.name}
          </Link>
          <div className="node-details">
            <span className="node-id">#{node.attributes.serNo}</span>
            {node.attributes.vansh && <span className="node-vansh">{node.attributes.vansh}</span>}
            {node.attributes.spouse && <span className="node-spouse">Spouse: {node.attributes.spouse}</span>}
          </div>
          {hasChildren && (
            <div className="expand-icon">{expanded ? '−' : '+'}</div>
          )}
        </div>
      </div>
      
      {hasChildren && expanded && (
        <div className="vertical-tree-children">
          {node.children.map((child, index) => (
            <VerticalTreeNode key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VerticalFamilyTree;