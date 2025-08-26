import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const ProjectSection = () => {
  const [hoveredProject, setHoveredProject] = useState(null)

  const projects = [
    {
      id: 'islamic',
      title: 'Islamic Website',
      description: 'একটি সুন্দর ইসলামিক ওয়েবসাইট যেখানে দৈনিক দোয়া, আল্লাহর ৯৯ নাম এবং আরও অনেক ফিচার রয়েছে।',
      image: '/images/islamic_preview.png',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: '/projects/islamic_website/index.html',
      featured: true
    },
    {
      id: 'tech',
      title: 'টেক নিউজ প্ল্যাটফর্ম',
      description: 'আধুনিক প্রযুক্তি সংবাদ ও তথ্যের জন্য একটি সম্পূর্ণ ওয়েবসাইট। রেসপন্সিভ ডিজাইন ও ইন্টারঅ্যাক্টিভ ফিচার।',
      image: '/images/tech_preview.png',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
      link: '/projects/tech_website/index.html'
    },
    {
      id: 'government',
      title: 'সরকারি অফিস ওয়েবসাইট',
      description: 'জেলা প্রশাসকের কার্যালয়ের জন্য একটি পূর্ণাঙ্গ অফিসিয়াল ওয়েবসাইট। সেবা ও তথ্যের সহজ প্রবেশাধিকার।',
      image: '/images/government_preview.png',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      link: '/projects/government_website/index.html'
    },
    {
      id: 'police',
      title: 'পুলিশ ওয়েবসাইট',
      description: 'বাংলাদেশ পুলিশের অফিসিয়াল ওয়েবসাইট। জরুরি সেবা, থানার তথ্য ও অপরাধ রিপোর্টের সুবিধা।',
      image: '/images/police_preview.png',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Interactive'],
      link: '/projects/police_website/index.html'
    },
    {
      id: 'army',
      title: 'সেনাবাহিনী ওয়েবসাইট',
      description: 'বাংলাদেশ সেনাবাহিনীর অফিসিয়াল ওয়েবসাইট। নিয়োগ বিজ্ঞপ্তি, সেবা ও জাতীয় নিরাপত্তার তথ্য।',
      image: '/images/army_preview.png',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Animation'],
      link: '/projects/army_website/index.html'
    },
    {
      id: 'qa',
      title: 'প্রশ্ন-উত্তর প্ল্যাটফর্ম',
      description: 'জ্ঞান ভাগাভাগির জন্য একটি আধুনিক প্রশ্ন-উত্তর ওয়েবসাইট। ডার্ক মোড ও ইন্টারঅ্যাক্টিভ ফিচার সহ।',
      image: '/images/qa_preview.png',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Dark Mode'],
      link: '/projects/qa_website/index.html'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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
    <motion.section 
      id="projects" 
      className="py-16 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          My Projects
        </motion.h2>
        
        <motion.p 
          className="text-center text-gray-600 mb-12 text-lg"
          variants={itemVariants}
        >
          আমার কাজের নমুনা
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3">
                    <Button
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                  onClick={() => window.open(project.link, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Project
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default ProjectSection

