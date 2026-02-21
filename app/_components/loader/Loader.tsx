const Loader = () => {
  return (
    <div className='w-full bg-gray-500/50 backdrop-blur-2xl backdrop-grayscale h-screen flex justify-center items-center'>
      {/* ✅ FIX : backdrop-blur-xs n'existe pas en Tailwind v3
          Valeurs valides : none | sm | md | lg | xl | 2xl | 3xl
          → remplacé par backdrop-blur-sm */}
      <div className='mx-auto w-full max-w-sm rounded-md p-4'>
        <div className='flex animate-pulse space-x-4'>
          <div className='size-10 rounded-full bg-gray-200'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='h-2 rounded bg-gray-200'></div>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 h-2 rounded bg-gray-200'></div>
                <div className='col-span-1 h-2 rounded bg-gray-200'></div>
              </div>
              <div className='h-2 rounded bg-gray-200'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;