<template>
  <section
    id="mission"
    className="min-h-screen w-full py-12 md:py-24 lg:py-32 flex flex-col justify-center items-center bg-gradient-to-r from-hgeen1 to-hgeen2 h-64"
  >
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl ">
            {{ $t('mission.title') }}
          </h2>
          <p
            className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed "
          >
            {{ $t('mission.description') }}
          </p>
        </div>
      </div>
      <div
        className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12 text-justify"
      >
        <img
          src="/src/assets/images/Photo5.png"
          alt="Mission"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          width="550"
          height="310"
          data-aos="fade-left"
          data-aos-delay="100"
        />
        <div className="flex flex-col justify-center space-y-4">
          <ul className="grid gap-6">
            <li>
              <div className="grid gap-1" data-aos="fade-right" data-aos-delay="100">
                <h3 className="text-xl font-bold">{{ $t('mission.values.1.title') }}</h3>
                <p className="text-muted-foreground">
                  {{ $t('mission.values.1.description') }}
                </p>
              </div>
            </li>
            <li>
              <div className="grid gap-1" data-aos="fade-right" data-aos-delay="100">
                <h3 className="text-xl font-bold">{{ $t('mission.values.2.title') }}</h3>
                <p className="text-muted-foreground">
                  {{ $t('mission.values.2.description') }}
                </p>
              </div>
            </li>
            <li>
              <div className="grid gap-1" data-aos="fade-right" data-aos-delay="100">
                <h3 className="text-xl font-bold">{{ $t('mission.values.3.title') }}</h3>
                <p className="text-muted-foreground">
                  {{ $t('mission.values.3.description') }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
