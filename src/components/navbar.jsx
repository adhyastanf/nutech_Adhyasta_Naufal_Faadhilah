import { Link } from '@tanstack/react-router';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className='flex justify-between items-center py-3 px-4 bg-[#ff257e]'>
      <Link to='/message'>
        <Button>Improve Message</Button>
      </Link>
    </nav>
  );
}
