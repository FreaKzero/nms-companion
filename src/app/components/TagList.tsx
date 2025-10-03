import React from 'react';

interface TagListProps {
  tags: string;
}

interface TagPillProps {
  children: React.ReactNode;
}

export const TagPill: React.FC<TagPillProps> = ({ children }) => {
  return (
    <span className='inline-block rounded-full border border-green-400 bg-green-900/50 px-3 py-1 text-xs font-bold uppercase text-green-300'>
      {children}
    </span>
  );
};

export const TagList: React.FC<TagListProps> = ({ tags }) => {
  if (!tags) return null;

  const tagArray = tags.split(',').map((t) => t.trim())
    .filter((t) => t.length > 0);

  return (
    <div className='flex flex-wrap gap-2'>
      {tagArray.map((tag, i) => (
        <TagPill key={`tag-${i}`}>{tag}</TagPill>
      ))}
    </div>
  );
};
