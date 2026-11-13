import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import DepthGallery from '@/components/DepthGallery';
import Work from '@/components/Work';
import EnquiryForm from '@/components/EnquiryForm';
import Footer from '@/components/Footer';
import { Intro, Services, Why, Process, About, Testimonials, FinalCta } from '@/components/Sections';

export default function Page() {
  return (
    <>
      <a href='#main' className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-peony focus:px-4 focus:py-2 focus:text-plum'>
        Skip to content
      </a>
      <Nav />
      <main id='main'>
        <Hero />
        <Intro />
        <DepthGallery />
        <Services />
        <Work />
        <Why />
        <Process />
        <About />
        <Testimonials />
        <FinalCta />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  );
}
