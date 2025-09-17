"use client"

import React from "react"
import { Card } from "@/components/ui/card"

interface Setting {
  id: string
  label: string
  description?: string
  enabled: boolean
  category: string
}

const settings: Setting[] = [
  {
    id: "dark-mode",
    label: "Mode sombre",
    description: "Basculer entre le thème clair et sombre",
    enabled: false,
    category: "general",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Recevoir des notifications pour les rappels",
    enabled: true,
    category: "general",
  },
  {
    id: "auto-save",
    label: "Sauvegarde automatique",
    description: "Sauvegarder automatiquement vos notes",
    enabled: true,
    category: "sync",
  },
]

export function RouagesScreen() {
  const generalSettings = settings.filter(s => s.category === "general")
  const syncSettings = settings.filter(s => s.category === "sync")

  return (
    <div
      className="space-y-8"
      style={{ backgroundColor: "#FBF9F6", minHeight: "100vh", margin: "-2rem -1rem", padding: "2rem 1rem" }}
    >
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl text-[#5C5470] mb-4">Les Rouages</h2>
        <p className="text-[#5C5470] opacity-70 font-sans text-lg">Personnalisez votre expérience Cognos</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* General Settings */}
        <Card className="soft-shadow border-0 bg-white/80 p-6 rounded-3xl">
          <h3 className="font-serif text-xl text-[#5C5470] mb-4">Préférences générales</h3>
          <div className="space-y-4">
            {generalSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="font-sans text-[#5C5470]">{setting.label}</span>
                  {setting.description && (
                    <p className="text-sm text-[#5C5470] opacity-70 mt-1">{setting.description}</p>
                  )}
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    defaultChecked={setting.enabled}
                    aria-describedby={setting.description ? `${setting.id}-description` : undefined}
                  />
                  <div className="w-14 h-8 bg-[#5C5470]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#A4BFA0]"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Sync Settings */}
        <Card className="soft-shadow border-0 bg-white/80 p-6 rounded-3xl">
          <h3 className="font-serif text-xl text-[#5C5470] mb-4">Synchronisation</h3>
          <div className="space-y-4">
            {syncSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="font-sans text-[#5C5470]">{setting.label}</span>
                  {setting.description && (
                    <p className="text-sm text-[#5C5470] opacity-70 mt-1">{setting.description}</p>
                  )}
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    defaultChecked={setting.enabled}
                    aria-describedby={setting.description ? `${setting.id}-description` : undefined}
                  />
                  <div className="w-14 h-8 bg-[#5C5470]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#A4BFA0]"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}