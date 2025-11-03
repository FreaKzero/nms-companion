import { HeartIcon } from 'lucide-react';
import React from 'react';

interface TagListProps {
  tags: string;
  onClick?: (tag: string) => void;
}

interface TagPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  fav: boolean;
}

export const TagPill: React.FC<TagPillProps> = ({ children, ...props }) => {
  let color = 'border-green-400 bg-green-900/50 text-green-300 hover:bg-green-800/70 hover:text-green-200';

  if (props.fav) {
    color = 'border-yellow-400 bg-amber-900/50 text-yellow-300 hover:bg-amber-800/70 hover:text-yellow-200';
  }

  return (
    <span
      {...props}
      className={`inline-block rounded-full border  px-3 py-1 text-xs font-bold uppercase  cursor-pointer transition-colors duration-200 ${color}`}
    >
      {children}
    </span>
  );
};

export const TagList: React.FC<TagListProps> = ({ tags, onClick }) => {
  if (!tags) return null;

  const tagArray = tags
    .split(' ')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
    .sort((a) => (a.includes('fav') ? 1 : -1));

  return (
    <div className='flex flex-wrap gap-2'>
      {tagArray.map((tag, i) => {
        const isFav = tag.includes('fav');

        return (
          <TagPill
            key={`tag-${i}`}
            onClick={() => onClick?.(tag)}
            fav={isFav}
          >
            {isFav ? <HeartIcon size='15' /> : tag}
          </TagPill>
        );
      })}
    </div>
  );
};
