"use client"

import { motion } from "framer-motion"
import { RiDoubleQuotesL } from "react-icons/ri"
import { IoCloudOutline } from "react-icons/io5"
import { FaRocket, FaHandPeace, FaUsers, FaShoppingCart } from "react-icons/fa"

function MiniLineChart() {
  return (
    <svg width="50" height="35" viewBox="0 0 50 35" className="flex-shrink-0">
      <motion.path
        d="M 5 28 Q 12 24 18 22 T 28 16 T 38 10 T 45 6"
        fill="none"
        stroke="#22c55e"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      <motion.path
        d="M 45 6 L 40 5 M 45 6 L 43 10"
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.5 }}
        viewport={{ once: true }}
      />
    </svg>
  )
}

const umkmTestimonials = [
  {
    name: "Freya",
    business: 'Pemilik Toko Kue "Freya Bakery"',
    quote:
      "Dulu saya bingung hitung untung rugi. Sekarang FinSight otomatis kasih tahu berapa keuntungan harian dan kapan modal balik. Bisnis jadi lebih terencana!",
    avatar: "/assets/freya.jpeg",
  },
  {
    name: "Anindya",
    business: 'UMKM Fashion "Anindya Style"',
    quote:
      "Fitur prediksi BEP-nya luar biasa. Saya jadi tahu berapa baju yang harus dijual biar balik modal. Sekarang target penjualan lebih jelas.",
    avatar: "/assets/Anindya.jpeg",
  },
  {
    name: "Ella",
    business: 'Pemilik Coffee Shop "Kopi Kita"',
    quote:
      "Laporan keuangan otomatisnya sangat membantu. Grafik pertumbuhan profit jelas, jadi saya bisa ambil keputusan lebih cepat dan tepat.",
    avatar: "/assets/Ella.jpeg",
  },
  {
    name: "Shani",
    business: 'Pemilik "Shani Handmade Craft"',
    quote:
      "AI Advisor-nya keren banget! Saya tanya 'harga jual ideal berapa?' langsung dijawab dengan perhitungan yang masuk akal. Sangat membantu!",
    avatar: "/assets/shani.jpeg",
  },
  {
    name: "Greesel",
    business: 'Online Shop "Greesel Beauty"',
    quote:
      "Tracking modal dan pengeluaran jadi rapi. Dulu saya catat manual dan sering salah. Sekarang semua tercatat otomatis dan akurat.",
    avatar: "/assets/Gresel.jpeg",
  },
  {
    name: "Indah",
    business: 'Pemilik "Indah Electronics"',
    quote:
      "Insight otomatisnya sangat berguna. FinSight kasih tahu kalau pengeluaran operasional tinggi dan saran untuk optimasi. Hemat biaya 20%!",
    avatar: "/assets/indah.jpeg",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            Kisah Sukses
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">UMKM yang Sudah Terbantu</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kelola keuangan lebih pintar, raih keuntungan lebih besar!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {umkmTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
              }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 transition-all duration-300 ease-out"
            >
              {/* Quote icon */}
              <RiDoubleQuotesL className="w-8 h-8 text-blue-500 mb-4" />

              {/* Quote text */}
              <p className="text-gray-700 text-base leading-relaxed mb-6">{testimonial.quote}</p>

              {/* Author info */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h4 className="text-gray-900 font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.business}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Hasil Nyata dari Pelaku UMKM</h3>
          <p className="text-gray-600">Lihat bagaimana FinSight membantu bisnis mereka berkembang</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 max-w-5xl mx-auto px-12">
          {/* Left Card - Siti */}
          <div className="relative pt-12 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, x: -30, y: -10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -top-10 -left-8 bg-white rounded-xl p-4 shadow-lg z-10"
              >
                <p className="text-xs text-gray-500 mb-1">Peningkatan Profit</p>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold text-gray-900">+85%</p>
                  <MiniLineChart />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.3 },
                }}
                className="absolute top-4 right-4 z-20"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="bg-white rounded-full p-2.5 shadow-lg"
                >
                  <IoCloudOutline className="w-7 h-7 text-gray-400" />
                </motion.div>
              </motion.div>

              <div className="absolute top-1/3 -right-20 flex flex-col gap-3 z-10">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="w-14 h-14 rounded-xl overflow-hidden shadow-lg border-2 border-white"
                >
                  <img src="/assets/con.jpeg" alt="Partner UMKM" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border-2 border-white ml-4"
                >
                  <img src="/assets/image.png" alt="Partner UMKM" className="w-full h-full object-cover" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-8 right-4 bg-white rounded-xl p-4 shadow-lg z-10"
              >
                <p className="text-xs text-gray-500 mb-1">Keuntungan Bersih</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-gray-900">Rp4.2jt</p>
                  <motion.div
                    className="flex items-end gap-0.5 h-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {[2, 3, 4, 6].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 bg-green-500 rounded-sm"
                        initial={{ height: 0 }}
                        whileInView={{ height: h * 4 }}
                        transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                        style={{ opacity: 0.4 + i * 0.2 }}
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden bg-teal-600 aspect-[3/4] w-72 mx-auto shadow-xl"
              >
                <img
                  src="/assets/model.png"
                  alt="Siti Nurhaliza - Pemilik Usaha Skincare"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Card - Budi */}
          <div className="relative pt-12 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -top-10 -right-8 bg-white rounded-xl p-4 shadow-lg z-10"
              >
                <div className="flex items-center gap-2 mb-1">
                  <FaUsers className="w-4 h-4 text-blue-500" />
                  <p className="text-xs text-gray-500">Balik Modal</p>
                </div>
                <motion.p
                  className="text-2xl font-bold text-gray-900"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  17 Hari
                </motion.p>
              </motion.div>

              <div className="absolute top-1/4 -left-20 flex flex-col gap-3 z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="w-14 h-14 rounded-xl overflow-hidden shadow-lg border-2 border-white"
                >
                  <img src="/assets/model3.jpeg" alt="Partner UMKM" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                  className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border-2 border-white ml-6"
                >
                  <img src="/assets/model4.jpeg" alt="Partner UMKM" className="w-full h-full object-cover" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, rotate: -20 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.2 },
                  rotate: { duration: 0.5, delay: 0.2 },
                }}
                className="absolute top-4 left-4 z-20"
              >
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="bg-white rounded-full p-2.5 shadow-lg"
                >
                  <FaRocket className="w-6 h-6 text-orange-500" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-24 -left-16 bg-white rounded-xl p-4 shadow-lg z-10"
              >
                <p className="text-xs text-gray-500 mb-1">Margin Profit</p>
                <div className="flex items-center gap-2">
                  <FaHandPeace className="w-5 h-5 text-yellow-500" />
                  <p className="text-xl font-bold text-gray-900">35%</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="absolute -bottom-8 right-4 bg-white rounded-xl p-4 shadow-lg z-10"
              >
                <div className="flex items-center gap-2 mb-1">
                  <FaShoppingCart className="w-4 h-4 text-green-500" />
                  <p className="text-xs text-gray-500">Total Transaksi</p>
                </div>
                <motion.p
                  className="text-2xl font-bold text-gray-900"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  5,621
                </motion.p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden bg-amber-100 aspect-[3/4] w-72 mx-auto shadow-xl"
              >
                <img
                  src="/assets/model2.png"
                  alt="Budi Santoso - Pemilik Usaha Kuliner"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
