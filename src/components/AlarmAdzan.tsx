const AlarmAdzan = (popUp: any) => {
  popUp.show
    ? (document.body.style.overflow = 'hidden')
    : (document.body.style.overflow = 'auto');
  return <div className='w-full h-screen'>AlarmAdzan</div>;
};

export default AlarmAdzan;
