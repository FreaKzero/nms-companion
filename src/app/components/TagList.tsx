import { HeartIcon, SkullIcon } from 'lucide-react';
import React from 'react';

interface TagListProps {
  tags: string;
  onClick?: (tag: string) => void;
}

interface TagPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  fav: boolean;
  pirate: boolean;
}

export const TagPill: React.FC<TagPillProps> = ({ children, ...props }) => {
  let color = 'border-green-400 bg-green-900/50 text-green-300 hover:bg-green-800/70 hover:text-green-200';

  if (props.fav) {
    color = 'border-yellow-400 bg-amber-900/50 text-yellow-300 hover:bg-amber-800/70 hover:text-yellow-200';
  }

  if (props.pirate) {
    color = 'border-red-400 bg-red-900/50 text-red-300 hover:bg-red-800/70 hover:text-red-200';
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
    .sort((a) => (a.includes('fav') || a.includes('pirate') ? 1 : -1));

  return (
    <div className='flex flex-wrap gap-2'>
      {tagArray.map((tag, i) => {
        const isFav = tag.includes('fav');
        const isPirate = tag.includes('pirate');

        return (
          <TagPill
            key={`tag-${i}`}
            onClick={() => onClick?.(tag)}
            fav={isFav}
            pirate={isPirate}
          >
            {isFav ? <HeartIcon size='15' /> : isPirate ? <SkullIcon size='15' /> : tag}
          </TagPill>
        );
      })}
    </div>
  );
};
