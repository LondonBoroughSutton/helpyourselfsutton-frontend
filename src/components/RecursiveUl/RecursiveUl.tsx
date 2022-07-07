import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './RecursiveUl.scss';

type RecursiveUlProps = {
  id: string;
  filename: string;
  children: RecursiveUlProps[] | null;
};

const RecursiveUl: React.FC<{ list: RecursiveUlProps, activePage?: string }> = ({ list, activePage }) => {
  const [open, setOpen] = useState(true);

  const handleOnClick = (e: React.MouseEvent<HTMLUListElement, MouseEvent>, id: string) => {
    const target = e.target as Element;
    if (id !== target.parentElement!.getAttribute('data-id')) return;
    setOpen((prev) => !prev);
  };

  const handleSubsequentUls = (list.children || []).map((list: RecursiveUlProps) => {
    if (list.children === null)
      return (
        <ul key={list.id}>
          <li className={`leaf ${activePage === list.id ? 'currentPage' : ''}`}>
            <Link to={`/${list.id}`}>{list.filename}</Link>
          </li>
        </ul>
      );
    return <RecursiveUl key={list.id} list={list} />;
  });

  return (
    <ul
      data-id={list.id}
      className={`list ${open ? 'open' : ''}`}
      onClick={(e) => handleOnClick(e, list.id)}
    >
      <li>{list.filename}</li>
      {handleSubsequentUls}
    </ul>
  );
};

export default RecursiveUl;
