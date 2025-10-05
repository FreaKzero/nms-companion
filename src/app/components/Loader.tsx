export default function Loader () {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm'>
      <div className='flex space-x-2 ml-10'>
        <div className='w-5 h-5 bg-purple-500 rounded-full animate-ping' />
        <div className='w-5 h-5 bg-pink-500 rounded-full animate-ping delay-200' />
        <div className='w-5 h-5 bg-indigo-500 rounded-full animate-ping delay-400' />
      </div>
    </div>
  );
}
