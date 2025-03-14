'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from '../ui/input'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'
import Image from 'next/image'
import authLogo from "../../../public/authLogo.svg"
import { useRouter } from 'next/navigation'

const skillsData = [
  { id: 1, name: 'JavaScript', icon: 'code' },
  { id: 2, name: 'Python', icon: 'code' },
  { id: 3, name: 'React', icon: 'code' },
  { id: 4, name: 'Node.js', icon: 'server' },
  { id: 5, name: 'UI/UX Design', icon: 'palette' },
  { id: 6, name: 'Data Science', icon: 'database' },
  { id: 7, name: 'Machine Learning', icon: 'brain' },
  { id: 8, name: 'DevOps', icon: 'settings' },
  { id: 9, name: 'Cloud Computing', icon: 'cloud' },
  { id: 10, name: 'Cybersecurity', icon: 'shield' },
  { id: 11, name: 'Blockchain', icon: 'link' },
  { id: 12, name: 'Mobile Development', icon: 'smartphone' },
  { id: 13, name: 'Frontend Development', icon: 'smartphone' },
  { id: 14, name: 'Backend Development', icon: 'smartphone' },
  
]

export default function SkillSelectionPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customSkill, setCustomSkill] = useState<string>("")
  const router = useRouter();

  const handleCustomSkill = () => {
    if(customSkill === ""){
      return;
    }
    toggleSkill(customSkill);
    setCustomSkill("");  
  }

  const toggleSkill = (skillName: string) => {
    setSelectedSkills(prevSelected =>
      prevSelected.includes(skillName)
        ? prevSelected.filter(skill => skill !== skillName)
        : [...prevSelected, skillName ]
    )
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try{
      const res = await fetch("/api/user-data/update-skills", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedSkills })
      })
      await res.json();
      router.push("/social-links")
    }catch(error){
      console.log(error);
    }
    setIsSubmitting(false)
    // Here you would typically send the selectedSkills to your backend
  }

  return (
    <div className="mx-auto px-4 py-8 grid place-content-center min-h-screen bg-gradient-to-b from-blue-500/10 to-transparent">
      <Image src={authLogo} alt="logoAuthentication" className="mx-auto mb-4"/>
      <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Skills</h1>
      <p className="text-center text-muted-foreground mb-8">
        Select the skills that best describe your passion
      </p>
      <div className="max-w-[570px] mx-auto">
        <motion.div 
          className="flex flex-wrap gap-3 overflow-visible"
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 0.5,
          }}
        >
          {skillsData.map((skill) => {
            const isSelected = selectedSkills.includes(skill.name)
            return (
              <motion.button
                key={skill.id}
                onClick={() => toggleSkill(skill.name)}
                layout
                initial={false}
                animate={{
                  backgroundColor: isSelected ? "#2267f0" : "rgba(39, 39, 42, 0.5)",
                }}
                whileHover={{
                  backgroundColor: isSelected ? "#2267f0" : "rgba(39, 39, 42, 0.8)",
                }}
                whileTap={{
                  backgroundColor: isSelected ? "#2267f0" : "rgba(39, 39, 42, 0.9)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 0.5,
                  backgroundColor: { duration: 0.1 },
                }}
                className={`
                  inline-flex items-center px-4 py-2 rounded-full text-base font-medium
                  whitespace-nowrap overflow-hidden ring-1 ring-inset
                  ${isSelected 
                    ? "text-[#FFF] ring-[hsla(0,0%,100%,0.12)]" 
                    : "text-zinc-400 ring-[hsla(0,0%,100%,0.06)]"}
                `}
              >
                <motion.div 
                  className="relative flex items-center"
                  animate={{ 
                    width: isSelected ? "auto" : "100%",
                    paddingRight: isSelected ? "1.5rem" : "0",
                  }}
                  transition={{
                    ease: [0.175, 0.885, 0.32, 1.275],
                    duration: 0.3,
                  }}
                >
                  <span>{skill.name}</span>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 30, 
                          mass: 0.5 
                        }}
                        className="absolute right-0"
                      >
                        <div className="w-4 h-4 rounded-full bg-[#29a9f2] flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#2a1711]" strokeWidth={1.5} />
                        </div>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
      <div className='my-8 text-center'>
        <p className='text-muted-foreground'>Could not find your skill?</p>
        <div className='flex items-center gap-1'>
        <Input type='text' className='border-2' value={customSkill} placeholder='Type in your skill' onChange={(e) => setCustomSkill(e.target.value)}/>
        <Button className='my-4 rounded-none' variant={'ghost'} onClick={handleCustomSkill}><Plus /></Button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {selectedSkills.map(skillId => {
            const skill = skillsData.find(s => s.id === Number(skillId))
            return (
              <Badge key={skillId} variant="secondary" className='bg-blue-600'>
                {skill?.name}
              </Badge>
            )
          })}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={selectedSkills.length === 0 || isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              Submitting...
            </>
          ) : (
            <>Submit Skills</>
          )}
        </Button>
      </div>
    </div>
  )
}