'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
]

export default function SkillSelectionPage() {
  const [selectedSkills, setSelectedSkills] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleSkill = (skillId: number) => {
    setSelectedSkills(prevSelected =>
      prevSelected.includes(skillId)
        ? prevSelected.filter(id => id !== skillId)
        : [...prevSelected, skillId]
    )
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Selected skills:', selectedSkills.map(id => skillsData.find(skill => skill.id === id)?.name))
    setIsSubmitting(false)
    // Here you would typically send the selectedSkills to your backend
  }

  return (
    <div className="container mx-auto px-4 py-8 h-screen grid place-content-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Skills</h1>
      <p className="text-center text-muted-foreground mb-8">
        Select the skills that best describe your passion
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {skillsData.map((skill) => (
          <Card
            key={skill.id}
            className={`cursor-pointer transition-all ${
              selectedSkills.includes(skill.id)
                ? 'shadow-md bg-gradient-to-br bg-[#F4F5F7] dark:bg-[#1D1D1D] duration-300'
                : 'hover:border-primary hover:shadow-sm'
            }`}
            onClick={() => toggleSkill(skill.id)}
          >
            <CardContent className="flex items-center p-4">
              <div className="mr-4">
                {/* @ts-ignore */}
                {/* {Icons[skill.icon] && <Icons[skill.icon] className="h-6 w-6" />} */}
              </div>
              <div>
                <h2 className="font-semibold">{skill.name}</h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {selectedSkills.map(skillId => {
            const skill = skillsData.find(s => s.id === skillId)
            return (
              <Badge key={skillId} variant="secondary">
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
              {/* <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
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