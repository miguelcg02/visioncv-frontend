import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='flex w-full items-center justify-between border-b border-white px-8 py-4'>
      <div className='flex items-center space-x-4'>
        <Link href='/' className='text-xl font-bold'>
          Vision CV
        </Link>
      </div>
      <div className='flex items-center space-x-4'></div>
    </nav>
  );
};

export default Navbar;
