import React from 'react';
import './styles.css';
export function TableHeader({ children, title }) {
  return (
    <main className='main-summary'>
      <h1 className='header-summary'>{title}</h1>
      {children}
    </main>
  );
}
