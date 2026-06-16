import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { ArrowRight } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { springs } from '@/lib/animations';
import { markWelcomeSeen } from '@/lib/welcomeFlag';
import logoImage from '/assets/logo-1.png';

/**
 * First-run welcome / landing screen.
 *
 * Branded intro shown once on first launch. "Get Started" records the welcome
 * as seen and navigates to Home. Purely presentational — no Electron bridge or
 * store dependencies — so it renders safely and is trivial to remove.
 */
export function WelcomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    markWelcomeSeen();
    navigate('/', { replace: true });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-accent px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springs.gentle}
        className="flex flex-col items-center gap-6 max-w-[560px]"
      >
        <img src={logoImage} alt="BallotDA" className="h-14 w-auto" />

        <h1 className="font-apparat text-[32px] tracking-[-0.015em] text-foreground">
          Meet Nadia — Your Digital Assistant
        </h1>

        <p className="text-muted-foreground text-base leading-relaxed">
          Nadia is your BallotDA digital assistant. Ask questions, automate repetitive work, and get
          things done — right from your desktop, in English or Spanish.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.gentle, delay: 0.1 }}
        >
          <Button size="lg" onClick={handleGetStarted} data-testid="welcome-get-started">
            Get Started
            <ArrowRight weight="bold" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
