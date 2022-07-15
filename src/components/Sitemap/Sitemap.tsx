import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { getActive } from './utils';

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

  /** get initial dynamic height for each collapsable list element */
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, []);

  /** Change which parent pages are open depending on active branch / selected page */
  useEffect(() => {
    if (ref.current.className !== 'active-branch') {
      setOpen(false);
    }
  }, [activeBranch]);

  /** we have to instantiate it both on initial render and below inside handleSubsequentUls*/
  let isActive;

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    const target = e.target as Element;
    if (id !== target.parentElement!.getAttribute('data-id')) return;
    setOpen((prev) => !prev);
  };

  const handleSubsequentUls = (list.children || []).map((list: SitemapProps) => {
    isActive = getActive(activeBranch, list.id);

    if (list.children === null)
      return (
        <ul key={list.id}>
          <li className={`leaf ${isActive ? 'active-branch' : ''}`}>
            <Link to={`/pages/${list.slug}`}>{list.filename}</Link>
          </li>
        </ul>
      );
    return <Sitemap key={list.id} list={list} activeBranch={activeBranch} />;
  });

  isActive = getActive(activeBranch, list.id);

  return (
    <ul
      {...(!open && { style: { height: `${height}px` } })}
      className={`list ${open ? 'open' : ''}`}
    >
      {list.children ? (
        <li ref={ref} data-id={list.id} className={`${isActive ? 'active-branch' : ''}`}>
          <div className="toggler" onClick={(e) => handleOnClick(e, list.id)}>
            {open ? '[-]' : '[+]'}
          </div>
          <Link to={`/pages/${list.slug}`}>{list.filename}</Link>
        </li>
      ) : (
        <li ref={ref} data-id={list.id}>
          <Link to={`/pages/${list.slug}`}>{list.filename}</Link>
        </li>
      )}
      {handleSubsequentUls}
    </ul>
  );
};

export default Sitemap;
