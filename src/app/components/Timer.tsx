const TimerBar = ({ active }: { active: boolean }) => {
  return active
    ? (
      <div className='w-full h-[5px] bg-gray-900 rounded overflow-hidden mt-1'>
        <div
          className='h-full bg-indigo-500 rounded'
          style={{
            width: '100%',
            transform: active ? 'scaleX(0)' : undefined,
            transformOrigin: 'left',
            animation: 'progress 120s linear forwards'
          }}
        />
      </div>
      )
    : null;
};

export default TimerBar;
