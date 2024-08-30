<template>
  <section
    id="volunteer"
    className="w-full py-12 md:py-24 lg:py-32 flex flex-col justify-center items-center bg-white"
    data-aos="fade-up"
    data-aos-delay="100"
  >
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {{ $t('volunteer.title') }}
          </h2>
          <p
            className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            {{ $t('volunteer.description') }}
          </p>
        </div>
        <div className="flex gap-2 flex-row justify-center ">
          <RouterLink
            to="/login"
            class="inline-flex h-10 w-3/4 md:w-fit items-center whitespace-nowrap justify-center cursor-pointer select-none rounded-md bg-emerald-500 px-10 py-6 text-lg font-medium text-white shadow transition-colors hover:bg-emerald-500/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 duration-300"
          >
            {{ $t('volunteer.button') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
