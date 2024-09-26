<template>
  <section id="impact"
    className="w-full py-10 md:py-12 lg:py-16 flex flex-col justify-center items-center bg-esmerald-100/50 bg-yellow/20">
    <div className="container px-4 md:px-6">
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
        <img src="#" width="550" height="310" alt="About"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          data-aos="fade-right" data-aos-delay="100" />
        <div className="flex flex-col justify-center space-y-4" data-aos="fade-left" data-aos-delay="100">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {{ $t('impact.title') }}
            </h2>
            <p
              className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-justify">
              {{ $t('impact.description') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
