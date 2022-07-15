import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './Sitemap.scss';

type SitemapProps = {
  id: string;
  filename: string;
  slug: string;
  children: SitemapProps[] | null;
};

const Sitemap: React.FC<{ list: SitemapProps; activeBranch?: any }> = ({ list, activeBranch }) => {
  const [open, setOpen] = useState(true);
  const [height, setHeight] = useState(true);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, []);

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    const target = e.target as Element;
    if (id !== target.parentElement!.getAttribute('data-id')) return;
    setOpen((prev) => !prev);
  };

  const handleSubsequentUls = (list.children || []).map((list: SitemapProps) => {
    if (list.children === null)
      return (
        <ul key={list.id}>
          <li className={`leaf ${activeBranch && activeBranch.find((item:any) => item === list.id) ? 'active-branch' : ''}`}>
            <Link to={`/pages/${list.slug}`}>{list.filename}</Link>
          </li>
        </ul>
      );
    return <Sitemap key={list.id} list={list} />;
  });

  return (
    <ul
      {...(!open && { style: { height: `${height}px` } })}
      className={`list ${open ? 'open' : ''}`}
    >
      {list.children ? (
        <li ref={ref} data-id={list.id}>
          {console.log(activeBranch)}
          <div className="toggler" onClick={(e) => handleOnClick(e, list.id)}>
            {open ? '[-]' : '[+]'}
          </div>
          <Link to={`/pages/${list.slug}`}>{list.filename}</Link>
        </li>
      ) : (
        <li className="leaf" ref={ref} data-id={list.id}>
          <Link to={`/pages/${list.slug}`}>{list.filename}</Link>
        </li>
      )}
      {handleSubsequentUls}
    </ul>
  );
};

export default Sitemap;
