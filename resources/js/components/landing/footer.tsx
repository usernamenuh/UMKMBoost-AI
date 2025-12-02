import { IconBrandFacebook, IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react"

export function Footer() {
  const footerLinks = [
    { name: "Fitur", link: "#features" },
    { name: "Cara Kerja", link: "#how-it-works" },
    { name: "Showcase", link: "#showcase" },
    { name: "Testimoni", link: "#testimonials" },
    { name: "Harga", link: "#pricing" },
  ]

  return (
    <footer className="bg-[#0b0b0a] pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center mb-8">
          <img src="/logo.png" alt="UMKMBoostAI Logo" className="h-14 w-auto" />
        </div>

        {/* Navigation links centered */}
        <nav className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mb-10">
          {footerLinks.map((link) => (
            <a key={link.name} href={link.link} className="text-gray-400 hover:text-white transition-colors text-sm">
              {link.name}
            </a>
          ))}
        </nav>

        {/* Dotted separator line */}
        <div className="border-t border-dashed border-gray-700 mb-8" />

        {/* Bottom row: copyright left, social icons right */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} UMKMBoostAI</p>

          <div className="flex items-center gap-5">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <IconBrandTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <IconBrandLinkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <IconBrandGithub className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <IconBrandFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <IconBrandInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}