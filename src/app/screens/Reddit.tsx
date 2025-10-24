import noscreen from 'assets/noscreen.png';

import { FileWarning, RefreshCcw, ExternalLink } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { openCustomModal } from '../components/CustomModal';
import { FormInput } from '../components/FormInput';
import IconButton from '../components/IconButton';
import Loader from '../components/Loader';
import getRelativeTime from '../lib/getRelativeTime';
import { redditFeed } from '../lib/redditParser';
import useRedditStore from '../stores/useRedditStore';
import { useAutoRefreshStore } from '../stores/useRefreshStore';

const ContentModal: React.FC<{ content?: string; link: string; title: string }> = ({ content, link, title }) => {
  const handleUrl = (link: string) => electron.ipcRenderer.invoke('OPEN_URL', link);

  return (
    <div className='text-left w-full'>
      <h3 className='font-nms text-indigo-400 font-bold text-2xl transition-colors duration-300 mb-2'>
        {title}
      </h3>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <button className='button tiny mt-5' onClick={() => handleUrl(link)}>
        Open in Browser
      </button>
    </div>
  );
};

const Thumbnail: React.FC<{ screen?: string; alt: string; onClick: () => void }> = ({ screen, alt, onClick }) => (
  <img
    src={screen || noscreen}
    alt={alt}
    className='rounded-md object-cover h-40 aspect-video border-4 border-indigo-500 hover:border-indigo-400 transition-all duration-200 cursor-pointer'
    onClick={onClick}
  />
);

const RedditPost: React.FC<redditFeed & {
  onSelect: (title: string, link: string, content: string) => void;
}> = ({ title, author, imageUrl, link, published, content, isNew, onSelect }) => {
  const openInBrowser = () => electron.ipcRenderer.invoke('OPEN_URL', link);
  const titleColor = isNew ? 'text-amber-400 hover:text-amber-300' : 'text-indigo-400 hover:text-indigo-300';

  return (
    <div className='flex flex-col gap-3 py-4 hover:bg-gray-800 transition rounded-lg px-2 relative'>
      <div className='flex gap-4'>
        <Thumbnail screen={imageUrl} alt={title} onClick={() => onSelect(title, link, content)} />
        <div className='flex-1'>
          <h3
            className={`font-nms font-bold text-2xl cursor-pointer transition-colors duration-300 ${titleColor}`}
            onClick={() => onSelect(title, link, content)}
          >
            {title}
          </h3>
          <span className='text-sm text-gray-400'><strong>From:</strong> {author} • <strong>published:</strong> {getRelativeTime(published)}</span>
          <div className='mt-3 text-sm'>{content.substring(0, 200)} {content.length > 200 ? '...' : ''}</div>
        </div>
      </div>
      <div className='absolute bottom-2 right-2'>
        <button
          className='cursor-pointer'
          onClick={openInBrowser}
        > <ExternalLink size='20' className={`transition duration-250 ${titleColor}`} />
        </button>
      </div>
    </div>
  );
};

export default function RedditPage () {
  const entries = useRedditStore((s) => s.entries);
  const getFeed = useRedditStore((s) => s.getFeed);
  const setRead = useRedditStore((s) => s.setRead);
  const searchFeed = useRedditStore((s) => s.searchFeed);
  const newEntries = useRedditStore((s) => s.newEntries);
  const startAutoRefresh = useAutoRefreshStore((s) => s.start);
  const nav = useNavigate();
  const loading = useRedditStore((s) => s.loading);

  const [search, setSearch] = useState('');

  useEffect(() => {
    startAutoRefresh();
    getFeed();
  }, []);

  useEffect(() => {
    let timeout: any;
    if (search !== '') {
      timeout = setTimeout(() => {
        searchFeed(search);
      }, 400);
    } else {
      getFeed();
    }

    return () => clearTimeout(timeout);
  }, [search]);

  const handleSelect = (title: string, link: string, content: string) => {
    openCustomModal(<ContentModal content={content} link={link} title={title} />, 'w-[90%] relative rounded-xl overflow-hidden flex flex-col items-center justify-center bg-gray-900 p-5 text-left');
  };

  const handleReadAll = async () => {
    setRead();
    await getFeed();
    nav('/');
  };

  return (
    <div className='bg-gray-900 text-white rounded-lg shadow-md p-4 w-full'>
      {loading && <Loader message='Loading Feed ...' />}
      <div className='flex'>
        <div className='mb-4 w-full'>
          <FormInput
            id='search'
            label='Search'
            placeholder='Search NMSCoordinateExchange Reddit ...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
          />
        </div>

        {newEntries > 0 && <IconButton onClick={handleReadAll} label='Mark all as Read' Icon={FileWarning} className='mt-[28px] ml-2' />}
        <IconButton onClick={() => getFeed()} label='Refresh Feed' Icon={RefreshCcw} className='mt-[28px] ml-2' />

      </div>
      <div className='divide-y divide-gray-800'>
        {entries.map((post, idx) => (
          <RedditPost key={`reddit-${idx}`} {...post} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
