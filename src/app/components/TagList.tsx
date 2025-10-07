import React from 'react';

interface TagListProps {
  tags: string;
  onClick?: (tag: string) => void;
}

interface TagPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const TagPill: React.FC<TagPillProps> = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className='inline-block rounded-full border border-green-400 bg-green-900/50 px-3 py-1 text-xs font-bold uppercase text-green-300 cursor-pointer
                 hover:bg-green-800/70 hover:text-green-200 transition-colors duration-200'
    >
      {children}
    </span>
  );
};

export const TagList: React.FC<TagListProps> = ({ tags, onClick }) => {
  if (!tags) return null;

  const tagArray = tags
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  return (
    <div className='flex flex-wrap gap-2'>
      {tagArray.map((tag, i) => (
        <TagPill
          key={`tag-${i}`}
          onClick={() => onClick?.(tag)}
        >
          {tag}
        </TagPill>
      ))}
    </div>
  );
};
