"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { IconSparkles } from "@tabler/icons-react"

export function CTASection() {
 return (
    <section className="relative bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* CTA Card with soft blue gradient */}
        <div className="relative rounded-[2.5rem] p-12 sm:p-16 lg:p-20 text-center overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100/80 to-indigo-100">
          {/* Decorative organic shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-200/60 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-200/50 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-100/40 via-transparent to-indigo-100/40 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight text-balance">
              Siap Tingkatkan Marketing
              <br className="hidden sm:block" /> UMKM Anda dengan AI?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Bergabung dengan 1000+ UMKM yang sudah menggunakan AI untuk meningkatkan bisnis mereka. Mulai gratis hari
              ini!
            </p>
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-6 text-base font-semibold shadow-lg shadow-blue-600/30 rounded-xl"
            >
              <IconSparkles className="w-5 h-5 mr-2" />
              Mulai Gratis Sekarang
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
