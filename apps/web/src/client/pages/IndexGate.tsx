import { Navigate } from 'react-router';
import { HomePage } from './Home';
import { hasSeenWelcome } from '@/lib/welcomeFlag';

/**
 * Index route gate.
 *
 * On first launch (welcome not yet seen) redirects to the branded /welcome
 * screen; otherwise renders the normal Home page. This keeps Home.tsx itself
 * untouched — the only behavioural change lives here, in an additive file.
 */
export function IndexGate() {
  if (!hasSeenWelcome()) {
    return <Navigate to="/welcome" replace />;
  }
  return <HomePage />;
}
