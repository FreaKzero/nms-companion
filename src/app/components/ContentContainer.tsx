import TopNavigation from './TopNavigation';

const ContentContainer: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <div className='content-container w-full'>
      <TopNavigation />
      <div className='content-list m-5'>
        {children}
      </div>
    </div>
  );
};
export default ContentContainer;
