const page = () => {
  return (
    <div className='flex h-screen flex-col text-lg'>
      <div className='flex w-full flex-1 items-center justify-center bg-background'>Background</div>
      <div className='flex w-full flex-1 items-center justify-center bg-foreground'>Foreground</div>
      <div className='flex w-full flex-1 items-center justify-center bg-primary'>Primary default</div>
      <div className='flex w-full flex-1 items-center justify-center bg-primary-foreground'>Primary foreground</div>
      <div className='bg-primary-dark flex w-full flex-1 items-center justify-center'>Primary dark</div>
      <div className='flex w-full flex-1 items-center justify-center bg-secondary'>Secondary</div>
      <div className='flex w-full flex-1 items-center justify-center bg-secondary-foreground'>Secondary foreground</div>
      <div className='flex w-full flex-1 items-center justify-center bg-ring'>Ring</div>
      <div className='flex w-full flex-1 items-center justify-center bg-destructive'>Destructive</div>
      <div className='flex w-full flex-1 items-center justify-center bg-destructive-foreground'>
        Destructive foreground
      </div>
      <div className='flex w-full flex-1 items-center justify-center bg-muted'>Muted</div>
      <div className='flex w-full flex-1 items-center justify-center bg-muted-foreground'>Muted foreground</div>
      <div className='flex w-full flex-1 items-center justify-center bg-accent'>Accent</div>
      <div className='flex w-full flex-1 items-center justify-center bg-accent-foreground'>Accent foreground</div>
      <div className='flex w-full flex-1 items-center justify-center bg-popover'>Popover</div>
      <div className='flex w-full flex-1 items-center justify-center bg-popover-foreground'>Popover foreground</div>
      <div className='flex w-full flex-1 items-center justify-center bg-card'>Card</div>
      <div className='flex w-full flex-1 items-center justify-center bg-card-foreground'>Card foreground</div>
      <div className='flex w-full flex-1 items-center justify-center bg-[#334155]'>#334155</div>
    </div>
  );
};

export default page;
