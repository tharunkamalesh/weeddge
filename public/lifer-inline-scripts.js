document.addEventListener('DOMContentLoaded', function () {
  const fraction = document.getElementById("review-fraction");
  const slides = document.querySelectorAll(".splide__slide.review");
  const slideCount = slides.length;
  fraction.textContent = `1/${slideCount}`;

  slides.forEach((slide, index) => {
    if ((index + 1) % 2 === 0) {
      slide.setAttribute('data-slide-gradient', 'even');
    } else {
      slide.setAttribute('data-slide-gradient', 'odd');
    }

    // Add transition event listeners
    const scrollElement = slide.querySelector('.reveiw_card-text-scroll');
    if (scrollElement) {
      scrollElement.addEventListener('transitionstart', () => {
      });
      scrollElement.addEventListener('transitionend', () => {
      });
    }
  });

  var splideReview = new Splide('#splide', {
    type: 'loop',
    perPage: 1,
    focus: 'center',
  	autoplay: true,
  	interval: 0,
    arrows: false,
    pagination: false,
    flickMaxPages: 1,
    updateOnMove: false,
    speed: 1000,
    gap: '2rem',
    pauseOnHover: false,
    breakpoints: {
      1440: {
        perPage: 1,
        gap: '2rem',
      },
      480: {
        perPage: 1,
        gap: '0.375rem',
      },
    },
  });

  splideReview.on('mounted move', function () {
    const realIndex = (splideReview.index % slideCount) + 1;
    fraction.textContent = `${realIndex}/${slideCount}`;
  });

  var progressBar = document.querySelector('.splide-progress-bar');
  splideReview.on('mounted move', function () {
    var end = splideReview.Components.Controller.getEnd() + 1;
    var rate = Math.min((splideReview.index + 1) / end, 1);
    progressBar.style.width = String(100 * rate) + '%';
  });

  function calculateElementHeights() {
    const reviewSlides = document.querySelectorAll('.splide__slide.review');
    
    reviewSlides.forEach(slide => {
      const gradientElement = slide.querySelector('.reveiw_card-text-gradient');
      const scrollElement = slide.querySelector('.reveiw_card-text-scroll');
      const personImageElement = slide.querySelector('.reveiw_card-person-root');

      if (gradientElement && scrollElement) {
        let topValue;
        const scrollHeight = scrollElement.clientHeight;
        const slideHeight = slide.clientHeight;

        if (window.innerWidth > 991) {
          topValue = scrollHeight - slideHeight;
        } else {
          if (personImageElement) {
            const personImageHeight = personImageElement.clientHeight;
            topValue = slideHeight - scrollHeight - personImageHeight;
          } else {
            topValue = slideHeight - scrollHeight;
          }
        }

        const distance = Math.abs(topValue);
        const duration = (distance / 200) * 4000;

        slide.style.setProperty('--top-value', `-${distance}px`);
        slide.style.setProperty('--transition-duration', `${duration}ms`);
      	slide.setAttribute('data-splide-interval', duration + 500);
      }
    });
  }

  splideReview.on('active', function (slide) {
      slide.slide.classList.add('active-slide');
      calculateElementHeights();
  });

  splideReview.on('inactive', function (slide) {
      slide.slide.classList.remove('active-slide');
  });

  splideReview.mount();

  splideReview.on('mounted', function () {
    calculateElementHeights();
  });

  window.addEventListener('resize', () => {
    calculateElementHeights();
  });

  calculateElementHeights();
});

/* ----- inline chunk ----- */

let lenis;

function startLenis() {
  if (Webflow.env("editor") === undefined) {
    if (!lenis) {
      lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.7,
        gestureOrientation: "vertical",
        normalizeWheel: false,
        smoothTouch: false
      });
      
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      
      requestAnimationFrame(raf);
    }
    lenis.start();
  }
}

$("[data-lenis-start]").on("click", function () {
  lenis.start();
});

$("[data-lenis-stop]").on("click", function () {
  lenis.stop();
});

$("[data-lenis-toggle]").on("click", function () {
  $(this).toggleClass("stop-scroll");
  if ($(this).hasClass("stop-scroll")) {
    lenis.stop();
  } else {
    lenis.start();
  }
});

/* ----- inline chunk ----- */

function getScrollbarWidth() {
            const outer = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.overflow = 'scroll';
            outer.style.msOverflowStyle = 'scrollbar';

            document.body.appendChild(outer);

            const inner = document.createElement('div');
            outer.appendChild(inner);

            const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

            document.body.removeChild(outer);

            return scrollbarWidth;
        }

        const scrollbarWidth = getScrollbarWidth();
        document.documentElement.style.setProperty('--global-size--scrollbar-width', `${scrollbarWidth}px`);

/* ----- inline chunk ----- */

const isMobile = window.matchMedia("(max-width: 480px)").matches;

const splitTypes = document.querySelectorAll(".reveal-type");

splitTypes.forEach((element, index) => {
    const parentSplit = new SplitType(element, {
        types: ["lines"],
        classNames: ["reveal-parent"]
    });

    const childSplit = new SplitType(element, {
        types: ["words", "chars"],
        classNames: ["word", "reveal-child"]
    });

    const gradientContainers = element.querySelectorAll('.about_text-gradient');
    gradientContainers.forEach(gradientContainer => {
        const gradientChars = gradientContainer.querySelectorAll('.word > *');
        let offset = 0;
        gradientChars.forEach(function (char, i) {
            const charWidth = char.offsetWidth - (parseFloat(window.getComputedStyle(char).paddingLeft) + parseFloat(window.getComputedStyle(char).paddingRight));
            char.style.backgroundSize = (char.parentElement.offsetWidth + parseFloat(window.getComputedStyle(char).paddingLeft) + parseFloat(window.getComputedStyle(char).paddingRight)) + 'px 100%';
            
            offset += char.previousElementSibling? (char.previousElementSibling.offsetWidth - (parseFloat(window.getComputedStyle(char.previousElementSibling).paddingLeft) + parseFloat(window.getComputedStyle(char.previousElementSibling).paddingRight))) : 0;
            
            char.style.backgroundPosition = (char.parentElement.offsetWidth - offset - (parseFloat(window.getComputedStyle(char).paddingLeft) + parseFloat(window.getComputedStyle(char).paddingRight))) + 'px 0%';
        });
    });
    
    ScrollTrigger.config({
  		ignoreMobileResize: true,
		});

    const tl = gsap.timeline();
    gsap.from(childSplit.chars, {
        opacity: 0.15,
        stagger: 0.1,
        scrollTrigger: {
            trigger: element,
            start: isMobile? 'top 90%' : 'top 80%',
            end: isMobile? 'bottom 50%' : 'bottom 60%',
            scrub: true,
           //markers: true           
        },
    });
});

/* ----- inline chunk ----- */

$(document).ready(function() {
    function triggerDropdownClick() {
        $('.nav_menu-dropdown').click();
    }

    function isMobileWidth() {
        return $(window).width() <= 479;
    }

    $('.nav_menu_link').on('click', function() {
        if (isMobileWidth()) {
            triggerDropdownClick();
        }
    });

    $('.nav_button-close').on('click', function() {
        if (isMobileWidth()) {
            triggerDropdownClick();
        }
    });
});

/* ----- inline chunk ----- */

let starHeroButton;

function initStarHeroButton() {
  starHeroButton = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true })
    .to(".button_icon-hero-root .icon-1x1", {
      rotate: 180,
      duration: 1.2,
   //   delay: 1.5,
      ease: "power1.inOut",
      stagger: 0.25,
    });
  return starHeroButton;
}

function initHoverButton() {
  let typeSplit = new SplitType('[js-char-button]', {
    types: 'chars',
    tagName: 'span',
  });

  let chars = document.querySelectorAll('[js-char-button] .char, [data-gsap-button-hero] .char');
  chars.forEach(char => {
    let charContent = char.innerHTML;
    char.innerHTML = `<span class="char-inner" style="display: block;">${charContent}</span>`;
  });

  function addHoverEffects() {
    document.querySelectorAll('[data-gsap-button]').forEach(buttonContainer => {
      buttonContainer.addEventListener('mouseenter', () => {
        let chars = buttonContainer.querySelectorAll('.char-inner');
        
        gsap.to(chars, {
          yPercent: -100,
          duration: 0.4,
          stagger: { each: 0.02 },
          ease: 'power2.out',
        });
      });

      buttonContainer.addEventListener('mouseleave', () => {
        let chars = buttonContainer.querySelectorAll('.char-inner');
        gsap.to(chars, {
          yPercent: 0,
          duration: 0.4,
          stagger: { each: 0.02 },
          ease: 'power2.out',
        });
      });
    });

    document.querySelectorAll('[data-gsap-button-hero]').forEach(buttonContainer => {
      let charsBtnHero = buttonContainer.querySelectorAll('.char-inner');

      buttonContainer.addEventListener('mouseenter', () => {
        if (starHeroButton && typeof starHeroButton.pause === "function") {
          starHeroButton.pause();
        }
        let tl = gsap.timeline();
        tl.to(charsBtnHero, {
            yPercent: -102,
            duration: 0.4,
            stagger: { each: 0.02 },
            ease: 'power2.out',
          })
          .to(".button_icon-hero.is-bottom", { rotation: 360, duration: 0.45 }, "<")
          .to(".button_icon-hero.is-top", { rotation: 180, duration: 0.6 }, "<")
          .to(".btn-hero-border-spin", { opacity: 1, duration: 0.6 }, "<")
          .to('.button-hero-gradient.is-left', {
              backgroundSize: '125% 100%',
              duration: 0.4,
              ease: 'power1.inOut'
            }, "<")
          .to('.button-hero-gradient.is-right', {
              backgroundSize: '100% 200%',
              duration: 0.4,
              ease: 'power1.inOut'
            }, "<");
      });

      buttonContainer.addEventListener('mouseleave', () => {
        if (starHeroButton && typeof starHeroButton.resume === "function") {
          starHeroButton.resume();
        }
        let tl = gsap.timeline();
        tl.to(charsBtnHero, {
            yPercent: 0,
            duration: 0.4,
            stagger: { each: 0.02 },
            ease: 'power2.out',
          })
          .to(".button_icon-hero.is-bottom", { rotation: 180, duration: 0.45 }, "<")
          .to(".button_icon-hero.is-top", { rotation: 90, duration: 0.6 }, "<")
          .to(".btn-hero-border-spin", { opacity: 0, duration: 0.6 }, "<")
          .to('.button-hero-gradient.is-left', {
              backgroundSize: '100% 100%',
              duration: 0.4,
              ease: 'power1.inOut'
            }, "<")
          .to('.button-hero-gradient.is-right', {
              backgroundSize: '100% 100%',
              duration: 0.4,
              ease: 'power1.inOut'
            }, "<");
      });
    });
  }

  if (window.matchMedia("(min-width: 992px)").matches) {
    addHoverEffects();
  }

  window.addEventListener('resize', () => {
    if (window.matchMedia("(min-width: 992px)").matches) {
      addHoverEffects();
    } else {
    }
  });
}

/* ----- inline chunk ----- */

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section_hero, .section_about');

  const speeds = {
    'hero_top-blur-1': 0.01,
    'hero_top-blur-2': 0.02,
    'hero_top-blur-3': 0.03,
    'hero_top-blur-4': 0.04,
    'hero_top-blur-5': 0.05,
    'hero_top-blur-6': 0.06,
    'hero_blur-1': 0.02,
    'hero_blur-2': 0.04,
    'hero_blur-3': 0.06,
    'hero_blur-4': 0.08,
    'hero_blur-5': 0.1,
    'about_blur-1': 0.02,
    'about_blur-2': 0.04,
    'about_blur-3': 0.06,
    'about_blur-4': 0.08,
    'about_blur-5': 0.1
  };

  sections.forEach(section => {
    const elements = section.querySelectorAll('.blur');

    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      elements.forEach(element => {
        const classList = Array.from(element.classList);
        const className = classList.find(cls => cls.startsWith('hero_top-blur-') || cls.startsWith('hero_blur-') || cls.startsWith('about_blur-'));
        const speed = speeds[className];

        const x = (mouseX - rect.width / 2) * speed;
        const y = (mouseY - rect.height / 2) * speed;

        gsap.to(element, {
          x: x,
          y: y,
          duration: 0.5,
          ease: 'power3.out'
        });
      });
    });
  });
});

/* ----- inline chunk ----- */

function initOtherAnimations() {

	let typeSplit = new SplitType('[js-line-headings-section]', {
    types: 'lines',
    tagName: 'span',
  });

  let lines = document.querySelectorAll('[js-line-headings-section] .line');
  lines.forEach(line => {
    let lineContent = line.innerHTML;
    line.innerHTML = `<span class="line-inner" style="display: block;">${lineContent}</span>`;
  });
    
function generateNumbers(stage) {
    const start = parseInt(stage.getAttribute('data-start'));
    const end = parseInt(stage.getAttribute('data-end'));
    const totalNumbers = end - start + 1;
    const existingNumbers = stage.querySelectorAll('.number').length;

    stage.style.height = `${totalNumbers * 100}%`;

    for (let i = end; i >= start; i--) {
        if (existingNumbers > 0 && i === end) {
            const firstNumber = stage.querySelector('.number');
            firstNumber.textContent = i;
            continue;
        }
        const number = document.createElement('span');
        number.classList.add('number');
        number.style.top = (end - i) * -100 + '%';
        number.textContent = i;
        stage.appendChild(number);
    }
}

function calculateFinalYPosition(stage) {
    const sampleNumber = stage.querySelector('.number');
    const numberHeight = sampleNumber ? sampleNumber.clientHeight : 0;
    const parentHeight = sampleNumber ? sampleNumber.parentElement.clientHeight : 0;
    const finalYPosition = 100 - (numberHeight / parentHeight * 100);
    console.log(`numberHeight: ${numberHeight}px, parentHeight: ${parentHeight}px, finalYPosition: ${finalYPosition}%`);
    return finalYPosition;
}

document.querySelectorAll('[data-gsap-standart] .stage').forEach(stage => generateNumbers(stage));

// GSAP animation section Standart
let sectionStandart = gsap.timeline({
    scrollTrigger: {
        trigger: '[data-gsap-standart]',
        start: "top 70%",
    },
    defaults: { ease: "power1.out" }
});

sectionStandart
    .from("[data-gsap-standart]", { duration: 0.4, opacity: 0 })
    .fromTo("[data-gsap-standart-h2] [js-line-headings-section] .line-inner",
        { yPercent: 10, rotate: 3, opacity: 0, },
        { yPercent: 0, rotate: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)", stagger: { amount: 0.15, } }, ">-0.1")
    .from("[data-gsap-standart-grid] > * ", { y: 20, duration: 0.6, opacity: 0, stagger: 0.15}, ">-0.4")
    .from("[data-gsap-standart-button]", { duration: 0.6, opacity: 0 }, "<")
    .fromTo(document.querySelectorAll('[data-gsap-standart] .stage'), 
        { y: '0%' }, 
        { y: function(index, target) { return `${calculateFinalYPosition(target)}%`; },
            duration: 2,
            ease: "power3.out"
        }, ">-0.45");

 
  // GSAP animation section Results
  let sectionResults = gsap.timeline({
    scrollTrigger: {
      trigger: '[data-gsap-results]',
      start: "top 70%",
    },
    defaults: { ease: "power1.out" }
  });

  sectionResults
    .from("[data-gsap-results]", { duration: 0.4, opacity: 0 })
    .fromTo("[data-gsap-results-h2] [js-line-headings-section] .line-inner",
      { yPercent: 10, rotate: 3, opacity: 0, },
      { yPercent: 0, rotate: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)", stagger: { amount: 0.15, } }, ">-0.1")
    .from("[data-gsap-results-grid] > * ", { y: 20, duration: 0.6, opacity: 0, stagger: 0.15}, ">-0.4")
    .from("[data-gsap-results-decription]", { duration: 0.6, opacity: 0 });

  // GSAP animation section Time
  let sectionTime = gsap.timeline({
    scrollTrigger: {
      trigger: '[data-gsap-time]',
      start: "top 70%",
    },
    defaults: { ease: "power1.out" }
  });

  sectionTime
    .from("[data-gsap-time]", { duration: 0.6, opacity: 0 })
    .fromTo("[data-gsap-time-h2] [js-line-headings-section] .line-inner",
      { yPercent: 10, rotate: 3, opacity: 0, },
      { yPercent: 0, rotate: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)", stagger: { amount: 0.15, } }, ">-0.1")
    .from("[data-gsap-time-cards] > * ", { y: 20, duration: 0.6, opacity: 0, stagger: 0.15}, ">-0.4")
    .from("[data-gsap-time-buttons]", { duration: 0.4, autoAlpha: 0 }, ">-0.4")
    .fromTo("[data-gsap-time-buttons] .button.is-blur", { backdropFilter: "blur(0px)" }, { duration: 0.6, backdropFilter: "blur(34px)" }, "<");

  	  // GSAP animation section Answer
      const triggerAnswer = window.matchMedia("(max-width: 480px)").matches ? "top 45%" : "top 70%";
      let sectionAnswer = gsap.timeline({
        scrollTrigger: {
          trigger: '[data-gsap-answer]',
          start: triggerAnswer,
        },
        defaults: { ease: "power1.out" }
      });

      sectionAnswer
        .from("[data-gsap-answer]", { duration: 0.6, opacity: 0 })
        .fromTo("[data-gsap-answer] [js-line-headings-section] .line-inner",
          { yPercent: 10, rotate: 3, opacity: 0, },
          { yPercent: 0, rotate: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)", stagger: { amount: 0.15, } }, ">-0.1")
        .from("[data-gsap-answer-button]", { duration: 0.4, opacity: 0 }, ">-0.4")

    // GSAP animation section Footer
    const isMobileFooter = window.matchMedia("(max-width: 480px)").matches;
    const isLargeScreenFooter = window.matchMedia("(min-width: 1920px)").matches;
    const startTrigger = isLargeScreenFooter ? "bottom 80%" : isMobileFooter ? "bottom 50%" : "bottom 60%";

    let sectionFooter = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-gsap-footer]',
        start: startTrigger,
        // end: "top 5%",
       // markers: true,
      },
      defaults: { ease: "power1.out" }
    });

    sectionFooter
      .set('#footer-line', { opacity: 0, })
      .from("[data-gsap-footer]", { duration: 0.4, opacity: 0 })
      .from("[data-gsap-footer-bottom]", { duration: 0.4, opacity: 0 }, ">-0.25")
      .from("[data-gsap-footer-navigation] *", { duration: 0.35, stagger: 0.05, opacity: 0 }, ">-0.25")
      .fromTo("[data-gsap-footer] [js-line-headings-section] .line-inner",
          { yPercent: 10, rotate: 3, opacity: 0, },
          { yPercent: 0, rotate: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)", stagger: { amount: 0.15, } }, "<")   
      .set('#footer-line', { opacity: 1, })
      .to('#footer-line', {
        strokeDashoffset: 0,
        duration: .8,
        autoRound: false
      }, ">-0.25")
      .from("[data-gsap-footer-logo]", { duration: 0.4, opacity: 0 }, "<");


  // Mobile-specific animations
  const isMobile = window.matchMedia("(max-width: 480px)");
  if (isMobile.matches) {
    const boxes = gsap.utils.toArray('.control_card');
   const contents = gsap.utils.toArray("[data-gsap-control-content]");

    boxes.forEach(box => {
      gsap.from(box, {
        opacity: 0,
        y: 50,
        duration:.8,
        scrollTrigger: {
          trigger: box,
        }
      })
    });

    contents.forEach(content => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
          end: "bottom 20%",
        }
      });

      tl
       .set('#control-line', { opacity: 0, })
       .from(content, {
          opacity: 0,
          scale: 0.9,
          duration:.8,
        })
       .set('#control-line', { opacity: 1, })
       .to('#control-line', {
          strokeDashoffset: 0,
          duration:.8,
          autoRound: false
        });
    });
  }
}

/* ----- inline chunk ----- */

function initSectionControl() {
        if (window.innerWidth >= 480) {
        
            let sectionControl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.control_wrapper',
                    start: "top 20%",
                    // markers: true,
                },
                defaults: { 
                    duration: 1.2,
                    ease: "power1.out" 
                }
            });

            sectionControl
                .from('.control_card.left-card', { top: "20.375rem", left: "26.25rem" })
                .from('.control_card.right-card', { top: "20.375rem", right: "26.25rem" }, "<")
                .from('.control_card.top-card', { top: "25.375rem"}, "<")
                .from('.control_card.bottom-card', { bottom: "25.375rem"}, "<")
                .from('.control_content', { opacity: 0, scale: 0.9, duration: .8, }, "-=0.45")
                .to('#control-line', { 
                    strokeDashoffset: 0,
                    duration: .8,
                    autoRound: false
                });
        }
    }

/* ----- inline chunk ----- */

function initNavAnimation() {
    const navComponent = document.querySelector('.nav_component');
    const navBgComponent = document.querySelector('.nav_bg-scroll');
    const navDropdown = navComponent.querySelector('.nav_menu-dropdown');
    const navBrandText = navComponent.querySelector('.nav_brand-text');
    const navButton = navComponent.querySelector('.nav_button');
    const navBrandLogo = navComponent.querySelector('.nav_brand');
    const navBrandTextLogo = navComponent.querySelector('.nav_brand-root');
    const navContent = navComponent.querySelector('.nav_menu-content');

    let contentDisplayedStatic = false;
    let contentDisplayedScroll = false;

    $(window).on('scroll', function() {
        if ($(window).width() < 480) {
            return; 
        }

        var scrollTop = $(window).scrollTop();

        // Set GSAP default values
        gsap.defaults({
            ease: "power1.inOut",
            duration: 0.35
        });

        // Timeline for 'scroll' state
        var scrollTimeline = gsap.timeline({ paused: true });
        scrollTimeline
            .set(navDropdown, { pointerEvents: "none" })
            .to(navBgComponent, { opacity: 1 })
            .to(navDropdown, { css: { backdropFilter: "blur(0px)" }, duration: 0, }, "<")
            .to([navButton, navBrandText], { opacity: 0 }, "<")
            .set(navBrandText, { display: "none" })
            .to(navDropdown, {
                css: {              
                    backgroundColor: "rgba(255, 255, 255, 0)"
                },
                duration: 0.15,
            }, "<")
            .to(navDropdown, { width: "3.125rem", duration: 0.15 })
            .to(navBrandLogo, { width: "3.125rem", height: "3.125rem" }, "<")
            .to(navBrandLogo, { duration: 0.4, rotate: 90 }, "<")
            .to(navBrandTextLogo, { left: "0rem" }, "<")
            .set(navDropdown, { pointerEvents: "auto" });

        // Timeline for 'static' state
        var staticTimeline = gsap.timeline({ paused: true });
        staticTimeline
            .set(navDropdown, { pointerEvents: "none" })
            .to(navBgComponent, { opacity: 0 })
            .to(navDropdown, { width: "100%" }, "<")      
            .to(navBrandLogo, { width: "2.25rem", height: "2.25rem" }, "<")
            .to(navBrandLogo, { duration: 0.4, rotate: 0 }, "<")
            .to(navBrandTextLogo, { left: "0.4375rem" }, "<")
            .to(navDropdown, {
                css: {
                    backdropFilter: "blur(4px)",
                    backgroundColor: "rgba(255, 255, 255, 1)"
                }
            }, "<")
            .to([navBrandText, navButton], { opacity: 1 })
            .to(navBrandText, { display: "block" }, "<")
            .set(navDropdown, { pointerEvents: "auto" });

        if (scrollTop >= 200 && navComponent.getAttribute('data-nav-type') === 'static') {
            navComponent.setAttribute('data-nav-type', 'scroll');
            staticTimeline.pause(0);
            scrollTimeline.restart();
        } else if (scrollTop < 200 && navComponent.getAttribute('data-nav-type') === 'scroll') {
            navComponent.setAttribute('data-nav-type', 'static');
            scrollTimeline.pause(0);
            staticTimeline.restart();
        }
    });

    function openStaticAnimation() {
        gsap.timeline()
            .to(navDropdown, { backgroundColor: "rgba(255, 255, 255, 0.5)" })
            .set(navContent, { display: 'flex' }, "<")
            .to(navContent, { height: 'auto' }, "<")
            .to(navButton, { rotationZ: -90 }, "<");        
        
        contentDisplayedStatic = true;        
        lenis.stop();
    }

    function closeStaticAnimation() {
        gsap.timeline()
            .to(navDropdown, { backgroundColor: "rgba(255, 255, 255, 1)" })
            .to(navContent, { height: '0px' }, "<")            
            .to(navButton, { rotationZ: 0 }, "<")
            .set(navContent, { display: 'none' });
         
        contentDisplayedStatic = false;
        lenis.start();
    }

    function openScrollAnimation() {
        gsap.timeline()
            .to(navDropdown, { width: "auto", duration: 0 })
            .to(navDropdown, { 
                css: {
                  backdropFilter: "blur(4px)",
                  backgroundColor: "rgba(255, 255, 255, .5)"
              },
                duration: 0.25
            })
            .set(navBrandText, { display: 'block' }, "<")
            .to([navBrandText, navButton], { opacity: 1 }, "<")
            .to(navBrandLogo, { width: "2.25rem", height: "2.25rem"}, "<")
            .to(navBrandTextLogo, { left: "0.4375rem" }, "<")
            .set(navContent, { display: 'flex' }, "<")
            .to(navContent, { height: 'auto' }, "<")  
            .to(navButton, { rotationZ: -90 }, "<");
        

        contentDisplayedScroll = true;        
        lenis.stop();
    }

    function closeScrollAnimation() {
        gsap.timeline()
            .to(navContent, { height: '0px' })             
            .to(navButton, { rotationZ: 0 }, "<")
            .to([navBrandText, navButton], { opacity: 0 }, "<")            
            .to(navDropdown, { 
                    css: {
                  backdropFilter: "blur(0px)",
                  backgroundColor: "rgba(255, 255, 255, 0)"
              }
            }, "<")            
            .set(navBrandText, { display: 'none' })
            .set(navContent, { display: 'none' })            
            .to(navDropdown, { width: "3.125rem", }, "<")
            .to(navBrandLogo, { width: "3.125rem", height: "3.125rem" }, "<")
            .to(navBrandTextLogo, { left: "0rem" }, "<");
       
        contentDisplayedScroll = false;        
        lenis.start();
    }

    navComponent.addEventListener('click', function(event) {
        if ($(window).width() < 480) {
            return;
        }

        if (event.target.closest('.nav_menu-dropdown')) {
            const navType = navComponent.getAttribute('data-nav-type');

            if (navType === 'static') {
                if (contentDisplayedStatic) {
                    closeStaticAnimation();                
                } else {
                    openStaticAnimation();               
                }
            } else if (navType === 'scroll') {
                if (contentDisplayedScroll) {
                    closeScrollAnimation();
                } else {
                    openScrollAnimation();
                }
            }
        }
    });

    document.addEventListener('click', function(event) {
        if ($(window).width() < 480) {
            return;
        }

        if (!event.target.closest('.nav_menu-dropdown')) {
            const navType = navComponent.getAttribute('data-nav-type');

            if (navType === 'static' && contentDisplayedStatic) {
                closeStaticAnimation();
            } else if (navType === 'scroll' && contentDisplayedScroll) {
                closeScrollAnimation();
            }
        }
    });
}

/* Hero button hover animation */
document.addEventListener("DOMContentLoaded", function(event) {
    gsap.registerPlugin(Flip, ScrollToPlugin, ScrollTrigger);
        
    let typeSplit = new SplitType('[js-line-headings]', {
        types: 'lines',
        tagName: 'span',
    });

    let lines = document.querySelectorAll('[js-line-headings] .line');
    lines.forEach(line => {
        let lineContent = line.innerHTML;
        line.innerHTML = `<span class="line-inner" style="display: block;">${lineContent}</span>`;
    });

    const splitLabelBtn = document.querySelectorAll(".button.is-hero-section .button-label");

    splitLabelBtn.forEach((element, index) => {
        const parentSplit = new SplitType(element, {
            types: ["lines"],
            classNames: ["label-parent"]
        });

        const childSplit = new SplitType(element, {
            types: ["words", "chars"],
            classNames: ["word", "label-child"]
        });
    });

    var tl1 = gsap.timeline({ defaults: { ease: "power1.out", duration: 1 } });

    setTimeout(() => {
        function init() {

            tl1
            .set(window, {scrollTo: {y: 0}})
            .to(".page-wrapper", { duration: 0.6, opacity: 1 })

            document.body.classList.add("no-scroll");

            var logoAnimation = gsap.to("#preloader-logo", { 
                duration: 2, 
                rotateZ: 180, 
                repeat: -1,
                ease: "none" 
            });
            var logoAnimationEnd = gsap.to(".preloader", { 
                 duration: 0.6, 
                 opacity: 0 
            });

            const heroBlursOrder = ['.hero_blur-3', '.hero_blur-2', '.hero_blur-5', '.hero_blur-1', '.hero_blur-4'];
            const heroBlur = heroBlursOrder.map(selector => document.querySelector(selector));

            tl1.to(heroBlur, {
                duration: 2,
                opacity: 1,
                stagger: {
                    each: 0.55,
                    from: 'start'
                }
            });

            const heroTopBlursOrder = ['.hero_top-blur-4', '.hero_top-blur-2', '.hero_top-blur-3', '.hero_top-blur-6', '.hero_top-blur-1', '.hero_top-blur-5'];
            const heroTopBlur = heroTopBlursOrder.map(selector => document.querySelector(selector));

            tl1.to(heroTopBlur, {
                duration: 1.65,
                opacity: 1,
                stagger: {
                    each: 0.40,
                    from: 'start'
                },             
            }, "<")
            .add(logoAnimationEnd, ">-0.15")


            .set(".hero_content", { opacity: 1 })
           // .to(".preloader", { duration: 0.6, opacity: 0 })
            .set(".preloader", { display: "none" })
            
            .to(".hero-star", { duration: 0.45, opacity: 1, stagger: 0.25 })
            .to(".hero-circle", { duration: 0.45, opacity: 1, stagger: 0.25 }, "<")
            .add(() => {
                const state = Flip.getState(".hero_overflow-hidden");
                document.querySelector(".hero_overflow-hidden").classList.add("is-end-animation");
                Flip.from(state, { 
                    duration: 0.8, 
                    ease: "power1.out", 
                    onComplete: function() {
                        document.body.classList.remove("no-scroll");
                        startLenis();                        
                        initNavAnimation();
                        initSectionControl();
                        initOtherAnimations();
                        initHoverButton();
                       // initStarHeroButton();
                        ScrollTrigger.refresh();
                        tl1.resume();
                    } 
                });
                tl1.pause();
            }, "<")
            
            .from(".hero_tag", { duration: .6, opacity: 0 }, "<")
            .fromTo(".hero_content [js-line-headings] .line-inner", 
                {  yPercent: 10, rotate: 3, opacity: 0, }, 
                {  yPercent: 0,
                   rotate: 0,
                   opacity: 1,
                   duration: 0.4,
                   ease: "back.out(1.7)",
                   stagger: { 
                   amount: 0.15,                
                   }
                 }, ">-0.45")
           
            .from(".description-component", { duration: .6, opacity: 0 }, ">-0.35")
            .from(".button.is-hero-section", { opacity: 0, duration: 0.15 }, ">-0.4")
            .from(document.querySelector(".button.is-hero-section"), {
                    duration: .6,
                    "--hero-btn-radius": "4rem",        
                }, "<")
            .from(".button.is-hero-section", { width: "4.375rem", duration: 0.35 }, "<")

            .to(".button_icon-hero.is-bottom", { rotation: 180, x: () => window.innerWidth >= 991 ? "-7rem" : "-5rem", duration: 0.45 }, ">-0.4")
            .to(".button_icon-hero.is-top", { rotation: 90, x: () => window.innerWidth >= 991 ? "-7rem" : "-5rem", duration: 0.6 }, "<")

            .from(".button-label", { x: "2rem", duration: 0.45 }, ">-0.3")
            .fromTo(".button-label .char", 
                { yPercent: 20, opacity: 0, }, 
                { yPercent: 0, opacity: 1, duration: 0.35, stagger: 0.015 }, "<")
            .to(".hero_bg-image", { duration: .6, opacity: 1 }, "<")
            .set(".button-label-root", { overflow: "hidden" })            
						.set(".button-label .char", { textShadow: "0 1.2em 0 currentColor" })
            .to(".nav_component", { duration: 0.6, opacity: 1 }, ">-0.45")            
            .from(".hero_review-text-block", { duration: 0.6, opacity: 0 }, "<")
            .fromTo(".hero_review-star > *", 
                {  yPercent: 100, rotation: 90, opacity: 0 }, 
                {  yPercent: 0,
                    rotation: 0,
                    opacity: 1,
                    duration: 0.5, 
                    stagger: { 
                        amount: 0.45, 
                        ease: "power1.out" 
                    }
                }, "<")

            .add(() => {
                tl1.to(".hero-star", {
                    duration: 1,
                    opacity: 0,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    stagger: 0.25
                });                
            })
             .add(() => {
                initStarHeroButton();
            }, "+=1"); 
        }

        init();
    }, 400);
});