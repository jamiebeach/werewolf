import React, { Component } from 'react';

function Button (props) {
  return <button disabled={props.disabled} 
                 className={"btn " + props.className}
                 onClick={props.onClick} 
                 type={props.type}>
    {props.children}
  </button>
}

Button.defaultProps = {
  className: "",
  type: "button",
  disabled: false,
  onClick: () => null,
};

export default Button