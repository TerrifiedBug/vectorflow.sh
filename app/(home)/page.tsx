import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { FactStrip } from '@/components/landing/FactStrip';
import { Pitch } from '@/components/landing/Pitch';
import { ProductPreview } from '@/components/landing/ProductPreview';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { CompareTable } from '@/components/landing/CompareTable';
import { Install } from '@/components/landing/Install';
import { Footer } from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FactStrip />
        <Pitch />
        <ProductPreview />
        <FeatureGrid />
        <CompareTable />
        <Install />
      </main>
      <Footer />
    </>
  );
}
