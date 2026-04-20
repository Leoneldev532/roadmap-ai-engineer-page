    

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0);
});


window.addEventListener("DOMContentLoaded", () => {

   setTimeout(() => {
      window.scrollTo(0, 0);
   }, 10);

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




   gsap.registerPlugin(ScrollTrigger)

   lenis.on("scroll", ScrollTrigger.update);

   gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
   });

   gsap.ticker.lagSmoothing(0);

   gsap.registerPlugin(SplitText, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin);

   lenis.stop();


 const imgSummarySection = document.querySelectorAll(".img-summary-section");

 
   const animateCardImage = () => {
      imgSummarySection.forEach((item, index) => {
   const img = item.querySelector("img");
 
   const tl = gsap.timeline({
      scrollTrigger: {
         trigger: item,
         start: "top 70%",
         end: "+=450",
         scrub: true,
      },
   });

   tl.from(item, {
      y: 60,
      x: index % 2 == 0 ? 15 : -15,
      rotate: index % 2 == 0 ? -8 : 8,
      duration: 4,
      ease: "sine",
      transformOrigin: index % 2 == 0 ? "top right" : "top left",
   }).fromTo(img, 
   { scale: 1.2 },   
   { scale: 1, ease: "sine" , duration:4 },
"<");
});
   }


  animateCardImage()
 let mm = gsap.matchMedia();

  const animateTitleHero = () => {

   const rl =  gsap.timeline({
      scrollTrigger: {
         trigger: ".description-hero-section",
         start: "top 70%",
         end: "+=450",
         scrub: true,
         
      },
   });
mm.add("(min-width: 800px)", () => {
   rl.to(".title-hero",{
      scale:0.8,
      y:340,
      zIndex:0,
      opacity:0.4,
      duration:4,
      ease:"sine",
      transformOrigin: "top right",
   })
})

mm.add("(max-width: 800px)", () => {
   rl.to(".title-hero",{
      scale:0.8,
      y:140,
      zIndex:0,
      opacity:0.4,
      duration:4,
      ease:"sine",
      transformOrigin: "top right",
   })
})


   rl.to(".summary-section",{
      y:-280,
      duration:4,
      ease:"sine",
      transformOrigin: "top right",
   },"<")
 
  

 
   

  }

  animateTitleHero()
   



})

