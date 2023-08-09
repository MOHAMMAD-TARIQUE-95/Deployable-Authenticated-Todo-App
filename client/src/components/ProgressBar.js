

const ProgressBar=({progress})=>{
  const color=[
    'rgb(255,214,161)',
    'rgb(255,175,163)',
    'rgb(108,115,148)',
    'rgb(141,181,141)'
  ]
  const randomcolors=color[Math.floor(Math.random()*color.length)]
  return (
    
    <div className='outer-bar'>
    <div className='inner-bar' style={{width:`${progress}%`,backgroundColor :`${randomcolors}`}} >
    </div>
    </div>
  
  );
}

export default ProgressBar;
