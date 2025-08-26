import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Heart, Users, UserPlus, Lightbulb, Search, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import profilePicture from './assets/profile-picture.png'
import ProjectSection from './components/ProjectSection.jsx'
import './App.css'

function App() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-pink-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Safa Rahman
            </motion.h1>
            <div className="flex space-x-6">
              <a href="#about" className="text-gray-700 hover:text-pink-500 transition-colors">About</a>
              <a href="#projects" className="text-gray-700 hover:text-pink-500 transition-colors">Projects</a>
              <a href="#stats" className="text-gray-700 hover:text-pink-500 transition-colors">Stats</a>
              <a href="#contact" className="text-gray-700 hover:text-pink-500 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        className="pt-24 pb-16 px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="container mx-auto text-center">
          <motion.div 
            className="relative inline-block mb-8"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <img 
                src={profilePicture} 
                alt="Safa Rahman Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div 
              className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-4"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Safa Rahman
            </span>
          </motion.h1>

          <motion.h2 
            className="text-2xl md:text-3xl text-gray-700 mb-6 font-medium"
            variants={itemVariants}
          >
            আয়না সুন্দরী
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            চেহারার থেকে ব্যবহারের বেশি হৃদয় নিন কারণ চেহারা আমি এডিট করে দেয় 🐸🌸
          </motion.p>

          <motion.div 
            className="flex justify-center space-x-4 mb-12"
            variants={itemVariants}
          >
            <Button 
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Message
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Follow
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        id="stats" 
        className="py-16 px-6 bg-white/50 backdrop-blur-sm"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Social Stats
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-pink-100"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-2">2.4K</h3>
              <p className="text-gray-600 text-center">Followers</p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-2">274</h3>
              <p className="text-gray-600 text-center">Following</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="py-16 px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            About Me
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">IDEA</h3>
                </div>
                <p className="text-gray-600">Creative thinking and innovative solutions</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center mb-4">
                  <Search className="w-6 h-6 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">FINDER</h3>
                </div>
                <p className="text-gray-600">Discovering new opportunities and connections</p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8 shadow-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Philosophy</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                "Beauty comes from within - focus on character over appearance, 
                because true beauty radiates from the heart and soul."
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="text-2xl">🐸</span>
                <span className="text-2xl">🌸</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <ProjectSection />

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-16 px-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold text-white mb-8"
            variants={itemVariants}
          >
            Let's Connect
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Ready to start a conversation? Send me a friend request and let's get to know each other!
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-4"
            variants={itemVariants}
          >
            <Button 
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Send Friend Request
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Chat
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="py-8 px-6 bg-gray-900 text-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center">
          <motion.p 
            className="text-gray-400"
            variants={itemVariants}
          >
            © 2025 Safa Rahman. Made with ❤️
          </motion.p>
        </div>
      </motion.footer>
    </div>
  )
}

export default App

