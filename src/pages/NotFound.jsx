import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { EmptyState } from '../components/ui';

export default function NotFound() {
  return (
    <div className="container-page py-16">
      <EmptyState icon={Compass} title="We couldn’t find that page" action={<Link to="/" className="btn-navy">Back to home</Link>}>
        The link may be out of date. Try search (Ctrl K) or start from the home page.
      </EmptyState>
    </div>
  );
}
