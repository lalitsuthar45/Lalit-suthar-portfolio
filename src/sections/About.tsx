'use client';

import { motion } from 'framer-motion';
import { Code2, GraduationCap, Lightbulb, MapPin } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Reveal } from '@/components/ui/Reveal';
import { SITE } from '@/constants/site';

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative section-padding">
      <div className="container-page">
        <SectionHeading
          eyebrow="About Me"
          title={<span id="about-heading">A student who</span>}
          highlight="builds and learns"
          description="A quick introduction to who I am, what I enjoy building and where I am heading."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <GlassCard className="h-full p-7 sm:p-8" gradient="from-blue-500 to-cyan-400">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-400">
                  <Code2 className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Hello, I&apos;m Lalit Suthar</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    I&apos;m a BCA student at Mohan Lal Sukhadia University (MLSU) and a passionate
                    developer from Rajasthan. I enjoy turning ideas into useful websites and
                    applications while continuously improving my programming and problem-solving skills.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    My current toolkit includes C, C++, Python, HTML, CSS, JavaScript, MySQL and
                    DBMS. I&apos;m especially interested in web development, software projects and learning
                    new technologies through hands-on work.
                  </p>
                </div>
              </div>
            </GlassCard>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { icon: GraduationCap, title: 'BCA Student', text: 'Mohan Lal Sukhadia University' },
              { icon: MapPin, title: 'Based in', text: SITE.location },
              { icon: Lightbulb, title: 'Mindset', text: 'Learn • Build • Improve' },
            ].map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.08}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <GlassCard className="h-full p-5" gradient="from-purple-500 to-fuchsia-400">
                    <Icon className="h-5 w-5 text-brand-400" aria-hidden />
                    <h3 className="mt-3 text-sm font-semibold">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{text}</p>
                  </GlassCard>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
