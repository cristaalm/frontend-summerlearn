<template>
  <section
    id="impact"
    className="relative min-h-screen h-fit w-full py-6 md:py-8 lg:py-10 flex flex-col justify-center items-center bg-esmerald-100/50 bg-gradient-to-r from-hyellow1 to-hyellow2"
  >
    <div className="container px-4 md:px-6">
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
        <img
          src="/assets/img/Photo6.png"
          width="550"
          height="310"
          alt="About"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-xl"
          data-aos="fade-right"
          data-aos-delay="100"
        />
        <div
          className="flex flex-col justify-center space-y-4"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center text-white">
              {{ $t('impact.title') }}
            </h2>
            <p
              className="max-w-[600px] pt-6 text-muted-foreground md:text-xl/relaxed md:mx-auto lg:text-base/relaxed xl:text-xl/relaxed text-justify text-white/90"
            >
              {{ $t('impact.description') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Zigzag separator -->
    <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]">
      <svg
        class="w-full h-[100px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color: #ffa094; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #db3e29; stop-opacity: 1" />
        </linearGradient>
        <path
          fill="url(#redGradient)"
          fill-opacity="1"
          d="M0,96L60,85.3C120,75,240,53,360,90.7C480,128,600,224,720,240C840,256,960,192,1080,138.7C1200,85,1320,43,1380,21.3L1440,0V320H0Z"
        ></path>
      </svg>
    </div>
  </section>
</template>
