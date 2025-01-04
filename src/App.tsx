import './App.css'

function App() {
  const play = () => {
    console.log("finding match");
  }
  
  return (
    <>
      <div className='bg-zinc-900 h-full w-full flex flex-col justify-center items-center text-white'>
        <img src="/wall_image.jpg" alt="chess pieces image" className='h-[50%]' />
        <button className='bg-green-700 font-medium text-xl p-2 rounded-md m-2 hover:bg-green-600' onClick={play}>Play</button>
      </div>
    </>
  )
}

export default App
