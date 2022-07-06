import React, { useState } from 'react';
import './RecursiveUl.scss';

type RecursiveUlProps = {
  id: number;
  filename: string;
  children: RecursiveUlProps[] | null;
};

const RecursiveUl: React.FC<{ list: RecursiveUlProps }> = ({ list }) => {
  const [open, setOpen] = useState(true);

  const handleOnClick = (e: React.MouseEvent<HTMLUListElement, MouseEvent>, id: number) => {
    const target = e.target as Element;
    // @ts-ignore
    if (id !== +target.parentElement.getAttribute('data-id')) return;
    setOpen((prev) => !prev);
  };

  const handleSubsequentUls = (list.children || []).map((list: RecursiveUlProps) => {
    if (list.children === null)
      return (
        <ul key={list.id}>
          <li className="leaf">{list.filename}</li>
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
