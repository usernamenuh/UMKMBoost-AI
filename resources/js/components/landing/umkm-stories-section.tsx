"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const stories = [
  {
    name: "Rina",
    role: 'Pemilik Toko Kue "Rina Bakery"',
    quote:
      "Dulu saya kesulitan bikin poster promo yang menarik. Sekarang cukup upload foto kue, aplikasinya langsung buat poster cantik dan caption Instagram yang siap posting. Engagement naik 3×!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Andi",
    role: 'UMKM Fashion "Andi Style"',
    quote:
      "Fitur perbaikan foto produknya luar biasa. Foto baju saya yang tadinya gelap jadi terlihat profesional. Penjualan naik karena pelanggan bilang gambarnya lebih meyakinkan.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sinta",
    role: 'Pemilik "Sinta Handmade Craft"',
    quote:
      "Saya tidak punya waktu untuk membuat konten setiap hari. Aplikasi ini bantu saya generate ide konten dan jadwal posting otomatis. Sangat hemat waktu!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Budi",
    role: 'Pemilik Coffee Shop "Kopi Kita"',
    quote:
      "Poster promo mingguan jadi jauh lebih rapi dan trendy. Saya tinggal upload foto kopi, klik generate, dan langsung dapat desain yang cocok dengan brand saya.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Farah",
    role: 'Online Shop "Farah Beauty"',
    quote:
      "Deskripsi produk otomatisnya benar-benar membantu. Tidak perlu pusing bikin wording panjang. Hasilnya selalu profesional dan jelas.",
    avatar: "https://randomuser.me/api/portraits/women/89.jpg",
  },
]

export function UmkmStoriesSection() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Grid background pattern - matching other sections */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100">
              Kisah Sukses
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
              Kisah Sukses UMKM
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              Lihat bagaimana pelaku UMKM Indonesia meningkatkan bisnis mereka dengan AI
            </p>
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <div className="relative bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-gray-600 group-hover:text-blue-500 transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="text-white text-base leading-relaxed mb-6">{story.quote}</p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={story.avatar || "/placeholder.svg"}
                    alt={story.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                  />
                  <div>
                    <p className="text-white font-medium text-sm">{story.name}</p>
                    <p className="text-gray-400 text-xs">{story.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
