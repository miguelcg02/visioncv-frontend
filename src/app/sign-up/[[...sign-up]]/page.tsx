import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex min-h-screen-minus-nav items-center justify-center'>
      <SignUp afterSignOutUrl='/' />
    </div>
  );
}
