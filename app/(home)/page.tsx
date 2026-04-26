import { Hero } from '@/components/landing/Hero';
import { Pitch } from '@/components/landing/Pitch';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { Screenshot } from '@/components/landing/Screenshot';
import { Install } from '@/components/landing/Install';
import { Footer } from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Pitch />
        <FeatureGrid />
        <Screenshot />
        <Install />
      </main>
      <Footer />
    </>
  );
}
