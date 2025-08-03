import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GraphicalFamilyTree.css';

const GraphicalFamilyTree = ({ data }) => {
  if (!data) return null;
  
  return (
    <div className="graphical-tree-container">
      <div className="tree">
        <ul>
          <TreeNode node={data} />
        </ul>
      </div>
    </div>
  );
};

const TreeNode = ({ node }) => {
  const [expanded, setExpanded] = useState(true);
  
  const toggleExpand = () => {
    if (node.children && node.children.length > 0) {
      setExpanded(!expanded);
    }
  };
  
  const hasChildren = node.children && node.children.length > 0;
  
  return (
    <li>
      <div 
        className={`tree-node ${node.attributes.gender === 'Male' ? 'male' : 'female'}`}
        onClick={toggleExpand}
      >
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
        <ul>
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default GraphicalFamilyTree;