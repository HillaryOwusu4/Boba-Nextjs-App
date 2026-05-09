'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const floatingNotes = ['Brown sugar foam', 'Fresh taro', 'Cold matcha', 'Honey pearls'];
const curvedRibbonCopy = 'MATCHA MEETS MILK TEA  •  PEARLS MEET CREAM  •  '.repeat(3);

export default function ScrollStoryShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.set('.story-scene', { autoAlpha: 0, y: 80 });
      gsap.set('.story-scene-1', { autoAlpha: 1, y: 0 });
      gsap.set('.story-product', { transformOrigin: '50% 70%' });
      gsap.set('.story-ribbon', { xPercent: -18, rotate: -3 });
      gsap.set('.story-card', { autoAlpha: 0, y: 80, rotate: -4 });
      gsap.set('.story-note', { autoAlpha: 0, scale: 0.72, y: 40 });
      gsap.set('.story-mask-panel', { clipPath: 'inset(0 100% 0 0)' });

      if (reduceMotion) {
        gsap.set('.story-scene, .story-card, .story-note', { autoAlpha: 1, y: 0, scale: 1, rotate: 0 });
        gsap.set('.story-mask-panel', { clipPath: 'inset(0 0% 0 0)' });
        return;
      }

      const lenis = new Lenis({ lerp: 0.16, wheelMultiplier: 0.9 });
      const raf = (time: number) => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      tl.to('.story-ribbon', { xPercent: 18, rotate: 2, duration: 1.2 }, 0)
        .fromTo('.story-title-word', { yPercent: 16 }, { yPercent: -18, duration: 1.2 }, 0)
        .fromTo('.story-product-main', { y: 42, rotate: -8, scale: 0.88 }, { y: -18, rotate: 3, scale: 1.05, duration: 1.2 }, 0)
        .fromTo('.story-copy-1 > *', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.65 }, 0.08)

        .to('.story-scene-1', { autoAlpha: 0, y: -80, duration: 0.35 }, 1.05)
        .to('.story-scene-2', { autoAlpha: 1, y: 0, duration: 0.45 }, 1.14)
        .to('.story-product-main', { xPercent: 72, y: 24, rotate: 8, scale: 0.78, duration: 0.85 }, 1.12)
        .fromTo('.story-photo', { x: -120, y: 80, autoAlpha: 0, rotate: -9 }, { x: 0, y: 0, autoAlpha: 1, rotate: 0, stagger: 0.08, duration: 0.72 }, 1.2)
        .fromTo('.story-copy-2 > *', { x: 80, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.08, duration: 0.65 }, 1.22)

        .to('.story-scene-2', { autoAlpha: 0, y: -90, duration: 0.35 }, 2.12)
        .to('.story-scene-3', { autoAlpha: 1, y: 0, duration: 0.45 }, 2.2)
        .to('.story-product-main', { xPercent: 0, y: -44, rotate: 0, scale: 1.18, duration: 0.9 }, 2.18)
        .to('.story-card', { autoAlpha: 1, y: 0, rotate: 0, stagger: 0.1, duration: 0.72 }, 2.25)
        .to('.story-note', { autoAlpha: 1, scale: 1, y: 0, stagger: 0.08, duration: 0.62 }, 2.35)

        .to('.story-scene-3', { autoAlpha: 0, y: -100, duration: 0.35 }, 3.12)
        .to('.story-scene-4', { autoAlpha: 1, y: 0, duration: 0.45 }, 3.2)
        .to('.story-mask-panel', { clipPath: 'inset(0 0% 0 0)', stagger: 0.1, duration: 0.72 }, 3.22)
        .to('.story-product-main', { xPercent: -52, y: 18, rotate: -5, scale: 0.92, duration: 0.78 }, 3.22)
        .fromTo('.story-final > *', { y: 54, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.62 }, 3.42)
        .to({}, { duration: 0.45 });

      return () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative h-[620vh] bg-[#f7f2e7] text-[#203124]">
      <div
        ref={progressRef}
        className="fixed bottom-0 left-0 z-[70] h-[3px] w-full origin-left scale-x-0 bg-[#315d39]"
      />

      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[#f7f2e7]" />
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(90deg,rgba(32,49,36,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(32,49,36,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="story-ribbon pointer-events-none absolute left-1/2 top-[16vh] z-[2] w-[132vw] -translate-x-1/2 text-[#f7f2e7]">
          <svg
            viewBox="0 0 1600 520"
            className="block h-auto w-full overflow-visible drop-shadow-[0_18px_30px_rgba(32,49,36,0.12)]"
            aria-hidden="true"
          >
            <defs>
              <path id="story-ribbon-text-path" d="M 70 300 Q 800 85 1530 300" />
            </defs>

            <path
              d="M 20 248 Q 800 18 1580 248 L 1580 360 Q 800 150 20 360 Z"
              fill="#315d39"
            />
            <path
              d="M 20 248 Q 800 18 1580 248"
              fill="none"
              stroke="rgba(247,242,231,0.28)"
              strokeWidth="5"
            />
            <path
              d="M 20 360 Q 800 150 1580 360"
              fill="none"
              stroke="rgba(32,49,36,0.16)"
              strokeWidth="5"
            />

            <text
              fill="currentColor"
              fontSize="88"
              fontWeight="900"
              letterSpacing="2"
            >
              <textPath href="#story-ribbon-text-path" startOffset="0%">
                {curvedRibbonCopy}
              </textPath>
            </text>
          </svg>
        </div>

        <div className="story-title-word absolute bottom-[-7vh] left-1/2 z-[1] -translate-x-1/2 text-[clamp(8rem,28vw,27rem)] font-black uppercase leading-none text-[#315d39]/10">
          Boba
        </div>

        <div className="story-product story-product-main absolute left-1/2 top-[47%] z-[20] aspect-[3/4] w-[min(36vw,24rem)] min-w-[13rem] -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/bobadrinks/1 (3).png"
            alt="Daddy Boba matcha milk tea"
            fill
            sizes="(min-width: 1024px) 24rem, 52vw"
            priority
            className="object-contain drop-shadow-[0_34px_44px_rgba(32,49,36,0.24)]"
          />
        </div>

        <div className="story-scene story-scene-1 absolute inset-0 z-[10] grid grid-cols-1 items-center px-[clamp(1.25rem,5vw,5rem)] pt-24 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="story-copy-1 max-w-[43rem]">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-[#315d39]">Scroll story demo</p>
            <h1 className="text-[clamp(4.2rem,11vw,12rem)] font-black uppercase leading-[0.82] text-[#203124]">
              One screen.
              <br />
              Many scenes.
            </h1>
            <p className="mt-8 max-w-[32rem] text-base leading-7 text-[#41523e] md:text-lg">
              A pinned landing page where the product, headline, and panels move through one continuous viewport.
            </p>
          </div>
        </div>

        <div className="story-scene story-scene-2 absolute inset-0 z-[12] grid grid-cols-1 items-center gap-8 px-[clamp(1.25rem,5vw,5rem)] pt-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative hidden h-[62vh] min-h-[28rem] lg:block">
            <div className="story-photo absolute left-[3%] top-[4%] h-[18rem] w-[15rem] overflow-hidden rounded-lg bg-white shadow-2xl">
              <Image src="/Herosectionimage.png" alt="" fill sizes="15rem" className="object-cover" />
            </div>
            <div className="story-photo absolute left-[35%] top-[24%] h-[21rem] w-[16rem] overflow-hidden rounded-lg bg-[#e5d7ad] shadow-2xl">
              <Image src="/wee.png" alt="" fill sizes="16rem" className="object-cover" />
            </div>
            <div className="story-photo absolute bottom-[2%] left-[12%] h-[17rem] w-[26rem] overflow-hidden rounded-lg bg-white shadow-2xl">
              <Image src="/multible_boab.png" alt="" fill sizes="26rem" className="object-cover" />
            </div>
          </div>
          <div className="story-copy-2 ml-auto max-w-[40rem]">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-[#315d39]">Layered movement</p>
            <h2 className="text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.9] text-[#203124]">
              Images slide while the page stays still.
            </h2>
            <p className="mt-8 text-base leading-7 text-[#41523e] md:text-lg">
              This is the same illusion from the video: the viewport is fixed, but every layer has its own timing, depth, and direction.
            </p>
          </div>
        </div>

        <div className="story-scene story-scene-3 absolute inset-0 z-[14] px-[clamp(1.25rem,5vw,5rem)] pt-24">
          <div className="mx-auto grid h-full max-w-[1320px] grid-cols-1 content-center gap-5 lg:grid-cols-3">
            {['Choose your base', 'Build your texture', 'Finish the ritual'].map((title, index) => (
              <article
                key={title}
                className="story-card min-h-[20rem] border border-[#203124]/10 bg-white/75 p-6 shadow-[0_24px_70px_rgba(32,49,36,0.12)] backdrop-blur-md"
              >
                <span className="text-sm font-black text-[#315d39]">0{index + 1}</span>
                <h3 className="mt-14 max-w-[15rem] text-4xl font-black uppercase leading-none text-[#203124]">{title}</h3>
                <p className="mt-6 leading-7 text-[#5a6652]">
                  Each card enters the same pinned stage instead of becoming a separate stacked section.
                </p>
              </article>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0">
            {floatingNotes.map((note, index) => (
              <span
                key={note}
                className="story-note absolute rounded-full border border-[#315d39]/15 bg-[#f7f2e7]/85 px-5 py-3 text-sm font-bold text-[#315d39] shadow-lg"
                style={{
                  left: ['8%', '70%', '15%', '74%'][index],
                  top: ['24%', '22%', '73%', '70%'][index],
                }}
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        <div className="story-scene story-scene-4 absolute inset-0 z-[16] grid grid-cols-1 items-end px-[clamp(1.25rem,5vw,5rem)] pb-[clamp(2rem,7vh,5rem)] pt-24 lg:grid-cols-[1fr_1.05fr]">
          <div className="relative hidden h-[64vh] min-h-[30rem] lg:block">
            <div className="story-mask-panel absolute left-[8%] top-[5%] h-[11rem] w-[32rem] bg-[#315d39] p-8 text-[#f7f2e7]">
              <p className="text-xs font-black uppercase tracking-[0.28em]">Clean</p>
              <p className="mt-5 text-5xl font-black uppercase leading-none">Green goodness</p>
            </div>
            <div className="story-mask-panel absolute bottom-[12%] left-[22%] h-[13rem] w-[29rem] bg-[#f1c84b] p-8 text-[#203124]">
              <p className="text-xs font-black uppercase tracking-[0.28em]">Creamy</p>
              <p className="mt-5 text-5xl font-black uppercase leading-none">Chunky flavour</p>
            </div>
          </div>

          <div className="story-final ml-auto max-w-[43rem]">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-[#315d39]">Pinned scroll animation</p>
            <h2 className="text-[clamp(3.4rem,8vw,8.5rem)] font-black uppercase leading-[0.86] text-[#203124]">
              Sectionless, but structured.
            </h2>
            <p className="mt-8 max-w-[34rem] text-base leading-7 text-[#41523e] md:text-lg">
              Under the hood this is still a route with markup. Visually, it behaves like one continuous animated composition.
            </p>
            <Link
              href="/product-list"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#203124] px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#315d39]"
            >
              View products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
