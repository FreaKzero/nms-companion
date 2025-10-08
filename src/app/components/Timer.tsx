const TimerBar = ({ active }: { active: boolean }) => {
  return active
    ? (
      <div className='h-[3px] bg-gray-800 rounded overflow-hidden mx-2'>
        <div
          className='h-full bg-green-500 rounded'
          style={{
            width: '100%',
            transform: active ? 'scaleX(0)' : undefined,
            transformOrigin: 'left',
            animation: 'progress 120s linear infinite'
          }}
        />
      </div>
      )
    : null;
};

export default TimerBar;
