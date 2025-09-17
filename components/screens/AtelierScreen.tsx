"use client"

import React from "react"
import { Card } from "@/components/ui/card"

interface Module {
  id: string
  title: string
  description: string
  enabled: boolean
  icon: string
  color: string
}

const modules: Module[] = [
  {
    id: "tasks",
    title: "Gestion de Tâches",
    description: "Transformez vos idées en actions concrètes. Organisez, priorisez et suivez vos projets avec élégance.",
    enabled: true,
    icon: "✅",
    color: "#F3AB9A",
  },
  {
    id: "journaling",
    title: "Journaling",
    description: "Capturez vos réflexions quotidiennes. Un espace intime pour explorer vos pensées et émotions.",
    enabled: false,
    icon: "📖",
    color: "#B9B2D8",
  },
  {
    id: "voice",
    title: "Voix Intelligente",
    description: "Dictez vos idées en mouvement. L'IA transcrit et organise vos pensées vocales automatiquement.",
    enabled: true,
    icon: "🎤",
    color: "#FADDAF",
  },
]

export function AtelierScreen() {
  return (
    <div
      className="space-y-8"
      style={{ backgroundColor: "#FBF9F6", minHeight: "100vh", margin: "-2rem -1rem", padding: "2rem 1rem" }}
    >
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl text-[#5C5470] mb-4">L'Atelier</h2>
        <p className="text-[#5C5470] opacity-70 font-sans text-lg">Votre jardin des idées personnalisé</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {modules.map((module) => (
          <Card key={module.id} className="soft-shadow border-0 bg-white/80 p-8 rounded-3xl">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="font-serif text-2xl text-[#5C5470] mb-3">{module.title}</h3>
                <p className="font-sans text-[#5C5470] opacity-80 leading-relaxed mb-4">
                  {module.description}
                </p>
              </div>
              <div className="ml-6">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    defaultChecked={module.enabled}
                    aria-label={`Activer ${module.title}`}
                  />
                  <div className="w-14 h-8 bg-[#5C5470]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#A4BFA0]"></div>
                </label>
              </div>
            </div>
            <div className="w-24 h-24 mx-auto mb-4">
              <div 
                className="w-full h-full rounded-full bg-gradient-to-br flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${module.color}30 0%, ${module.color}10 100%)`,
                }}
              >
                <span className="text-4xl" role="img" aria-label={`Icône ${module.title}`}>
                  {module.icon}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}