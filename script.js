

window.addEventListener("DOMContentLoaded", () => {


   window.scrollTo(0, 0);
   history.scrollRestoration = "manual";

   const lenis = new Lenis({
      duration: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
   })


   function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
   }
   requestAnimationFrame(raf);




   function destroyTimeline(tl) {
      tl.kill()
      tl.clear()
      tl = null
   }

   gsap.registerPlugin(ScrollTrigger)

   lenis.on("scroll", ScrollTrigger.update);

   gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
   });

   gsap.ticker.lagSmoothing(0);

   gsap.registerPlugin(SplitText, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin);

   lenis.stop();


   const title1All = gsap.utils.toArray(".title-1");
   const imgScalingHeroContent = gsap.utils.toArray(".image-scaling-hero-content");
   const title2 = document.querySelector(".title-2");
   const title2Chars = new SplitText(title2, { type: "chars" }).chars;

   let tl = gsap.timeline({});
   let rl = gsap.timeline({});
   let zl = gsap.timeline({});
   let yl = gsap.timeline({});
   let il = gsap.timeline({});



   const initHeroSectionAnimation = () => {

      if (tl) {
         destroyTimeline(tl)
      }

      tl = gsap.timeline({
         onComplete: () => {
            lenis.start();
         },
         delay:1 
      });

      title1All.forEach((title, index) => {
         const line1 = title.querySelector(".line-1");
         const line2 = title.querySelector(".line-2");

         line1Chars = new SplitText(line1, { type: "chars" }).chars;
         line2Chars = new SplitText(line2, { type: "chars" }).chars;

         tl.from(title, {
            clipPath: "inset(20% 0% 20% 0%)",
            ease: "power2.inOut",
            transformOrigin: "40% 50%",
            duration: 1
         }, "<")
            .from([line1Chars, line2Chars], {
               duration: 1,
               stagger: {
                  each: 0.02,
                  from: "random"
               },
               ease: "power2",
               y: (x) => (x + 2) * 400,
            }, "")

      });


      tl.to(".image-scaling-hero", {
         scale: 1,
         rotate: 0,
         duration: 0.5,
      }, "-=1").to(imgScalingHeroContent, {
         scale: 1,
         duration: 0.4,
         stagger: 0.2,
         ease: "power2.out",
      }, "-=0.8");

      tl.from(".svg-1", {
         y: "100%",
         duration: 0.5,
         ease: "power2.out",
      }, "<")

   }

   const animateDescriptioSection = () => {

      if (rl) {
         destroyTimeline(rl)
      }
      rl = gsap.timeline()

      rl.fromTo(title2Chars, {
         opacity: 0.2,
         transformOrigin: "50% 50%",
         y: (x) => x % 2 ? -(x + 1) * 40 : (x + 1) * 40,
         x: (x) => -(x + 1) * -130,
         stagger: -20
      }, {
         opacity: 1,
         x: 0,
         y: 0,
         ease: "power2.inOut",
         duration: 1,
         stagger: 0.05,
         scrollTrigger: {
            trigger: ".section-2",
            start: "top 90%",
            end: "+=800",
            scrub: 1,
            toggleActions: "play none none reverse"
         }
      });

   }

   const animateMainSvgPath = () => {

      il.from(".svg-draw", {
         drawSVG: "0%",
         duration: 0.5,
         opacity: 1,
         ease: "none",
         scrollTrigger: {
            trigger: ".svg-bg",
            start: "top 40%",
            end: "bottom+=400 80%",
            scrub: 1,
            toggleActions: "play none none reverse"
         }
      }, "<")
   }


   const animateOnScrollSvg = () => {

      const svgAnimatedScroll = document.querySelectorAll(".svg-animated-scroll");
      svgAnimatedScroll.forEach((svg) => {

         il.from(svg, {
            y: "200",
            scale: 0.4,
            duration: 0.8,
            ease: "back.out(0.2,0.1)",
            transformOrigin: "50% 50%",
            scrollTrigger: {
               trigger: svg,
               start: "top 60%",
               end: "+=100",
               scrub: 1,
               markers: false,
               toggleActions: "play none none reverse"
            }
         })
      })

   }

   const animateOnScrollSvgCloud = () => {

      const svgAnimatedScroll = document.querySelectorAll(".svg-animated-scroll-cloud");
      svgAnimatedScroll.forEach((svg) => {

         il.fromTo(svg, {
            x: -40,
         }, {
            x: 20,
            duration: 0.8,
            ease: "sine.out",
            transformOrigin: "50% 50%",
            repeat: -1,
            yoyo: true,

         })
      })

   }

   const lastTextAnimation = () => {
      const lastText = document.querySelectorAll(".last-text");
      lastText.forEach((text) => {
         const textChars = new SplitText(text, { type: "words" }).words;
         yl.from(textChars, {
            opacity: 0,
            y: "150%",
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.05,
            scrollTrigger: {
               trigger: text,
               start: "top 60%",
               end: "+=100",
               scrub: true,
               markers: false,
               toggleActions: "play none none reverse"
            }
         })
      })
   }

    const animatedSvgLastSection = () => {
      yl = gsap.timeline({
         scrollTrigger: {
            trigger: ".last-section",
            start: "top top",
            markers: true,
            pin: true,

         }
      })

      MorphSVGPlugin.convertToPath("#svg-animated-start, #svg-animated-end");
      gsap.set(["#svg-animated-end"], { autoAlpha: 0 });

      yl.to("#svg-animated-start", {
        morphSVG: "#svg-animated-end",
         duration: 1
      }).to(".svg-animated", {
         scale:10,
           transformOrigin: "center center", 
                duration: 3,
         ease: "power2.inOut",
       
      },"<")

      yl.to(".last-section",{
         backgroundColor:"#F03A08",
         duration:1,
         onComplete:()=>{
            lastTextAnimation()
         }
      },"<")    
   }

   const animimateCardOnScroll = () => {
      const cardExplinationWrapper = document.querySelectorAll(".card-explination-wrapper");
      const cardExplinationUnder = document.querySelectorAll(".card-explination-under");

      cardExplinationWrapper.forEach((card) => {
         const cardExplination = card.querySelector(".card-explination");

         zl = gsap.timeline({
            scrollTrigger: {
               trigger: card,
               start: "top 80%",
               end: "+=100",
               toggleActions: "play none none none"
            }
         });

         zl.from(card, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "sine.out",
         })
            .from(cardExplination, {
               scale: 0.5,
               delay: 0.2,
               duration: 0.3,
               ease: "sine",
            }, "<");
      });

      cardExplinationUnder.forEach((item) => {
         gsap.from(item, {
            opacity: 0,
            rotate: -15,
            scrollTrigger: {
               trigger: item,
               start: "top 60%",
               end: "+=100",
               scrub: 1,
               onComplete:()=>{
                  animatedSvgLastSection()
               }
            },
         });
      });
   };

  

     

   let isTransitioning = false;

      function pageLeave(href) {
           if (isTransitioning) return;
           isTransitioning = true;
      lenis.stop();
      const nextPage = document.createElement("iframe");
      nextPage.src = href;
      nextPage.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    z-index: 10;
    opacity: 0;
    transform: translateY(100%);
  `;
      document.body.appendChild(nextPage);

      nextPage.addEventListener("load", () => {

           nextPage.style.opacity = "1";
           
         const tlLeave = gsap.timeline({
            onComplete: () => {
               setTimeout(() => {
         window.location.href = href;
      }, 500)
            }
         });

         tlLeave.to(".container-wrapper", {
            scale: 0.85,
            y: -60,
            transformOrigin: "50% top",
            duration: 0.6,
            ease: "power2.inOut",
         });

         tlLeave.fromTo(nextPage, {
            y: "100%",
            scale: 0.9,
            borderRadius: "20px"
         }, {
            y: "0%",
            scale: 1,
            borderRadius: "0px",
            duration: 0.6,
            ease: "power2.inOut",
         }, "<");
      });
   }

   function initTransitions() {
      document.querySelectorAll("a[href]").forEach(link => {
         const href = link.getAttribute("href");
         if (href.startsWith("http") || href.startsWith("#")) return;

         link.addEventListener("click", (e) => {
            e.preventDefault();
            pageLeave(href);
         });
      });
   }  


   initHeroSectionAnimation()
   animateDescriptioSection()

   animateMainSvgPath()
   animateOnScrollSvg()
   animateOnScrollSvgCloud()
   animimateCardOnScroll()
   animatedSvgLastSection()

 

   initTransitions();

})

