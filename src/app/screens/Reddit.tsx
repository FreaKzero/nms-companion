import noscreen from 'assets/noscreen.png';

import React, { useEffect, useState } from 'react';

import { FormInput } from '../components/FormInput';
import Loader from '../components/Loader';
import { redditFeed } from '../lib/redditParser';
import useRedditStore from '../stores/useRedditStore';

const Thumbnail: React.FC<{ screen?: string; alt: string; onClick: () => void }> = ({ screen, alt, onClick }) => (
  <img
    src={screen || noscreen}
    alt={alt}
    className='rounded-md object-cover h-40 aspect-video border-4 border-indigo-500 hover:border-indigo-400 transition-all duration-200 cursor-pointer'
    onClick={onClick}
  />
);

const RedditPost: React.FC<redditFeed & {
  onSelect: (link: string) => void;
}> = ({ title, author, imageUrl, link, published, onSelect }) => (
  <div className='flex flex-col gap-3 py-4 hover:bg-gray-800 transition rounded-lg px-2'>
    <div className='flex gap-4'>
      <Thumbnail screen={imageUrl} alt={title} onClick={() => onSelect(link)} />
      <div className='flex-1'>
        <h3 className='font-nms text-indigo-400 hover:text-indigo-300 font-bold text-2xl cursor-pointer transition-colors duration-300' onClick={() => onSelect(link)}>
          {title}
        </h3>
        <div className='text-sm text-gray-400 mt-5'>from: {author} </div>
        <div className='text-sm text-gray-400'>published:  {new Date(published).toLocaleDateString('en-EN')} </div>

      </div>
    </div>
  </div>
);

export default function RedditPage () {
  const entries = useRedditStore((s) => s.entries);
  const getFeed = useRedditStore((s) => s.getFeed);
  const loading = useRedditStore((s) => s.loading);

  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<redditFeed[]>([]);

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filteredEntries = entries.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase()));
      setFiltered(filteredEntries);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, entries]);

  const handleSelect = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className='bg-gray-900 text-white rounded-lg shadow-md p-4 w-full'>
      {loading && <Loader message='Loading Feed ...' />}
      <div className='mb-4'>
        <FormInput
          id='search'
          label='Search'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />
      </div>
      <div className='divide-y divide-gray-800'>
        {filtered.map((post, idx) => (
          <RedditPost key={`reddit-${idx}`} {...post} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
