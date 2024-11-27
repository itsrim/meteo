import React from 'react';
import './button.css'

export default function Button(props: { label: string }) {
  return (
    <div data-testid="button" className="button-style">
      {props.label}
    </div>
  );
}
