"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Sparkles,
  Settings,
  Wrench,
  Plus,
  Check,
  Target,
} from "lucide-react"

type Screen = "carnet" | "cosmos" | "atelier" | "rouages" | "editeur"

interface NavigationOrbProps {
  currentScreen: Screen
  onScreenChange: (screen: Screen) => void
  noteContent: string
  orbPulse: boolean
}

const screens = {
  carnet: { title: "Le Carnet", icon: BookOpen },
  cosmos: { title: "Le Cosmos", icon: Sparkles },
  atelier: { title: "L'Atelier", icon: Wrench },
  rouages: { title: "Les Rouages", icon: Settings },
  editeur: { title: "La Page Blanche", icon: Plus },
}

export function NavigationOrb({ currentScreen, onScreenChange, noteContent, orbPulse }: NavigationOrbProps) {
  const [showOrbMenu, setShowOrbMenu] = useState(false)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)

  const getContextualIcon = () => {
    switch (currentScreen) {
      case "editeur":
        return noteContent ? Check : Plus
      case "cosmos":
        return Target
      default:
        return Plus
    }
  }

  const handleContextualAction = () => {
    switch (currentScreen) {
      case "editeur":
        if (noteContent) {
          onScreenChange("carnet")
        } else {
          onScreenChange("carnet")
        }
        break
      case "cosmos":
        // Recenter graph action - could be implemented
        break
      default:
        onScreenChange("editeur")
    }
  }

  const handleMouseDown = () => {
    const timer = setTimeout(() => {
      setShowOrbMenu(true)
    }, 200) // 200ms for long press
    setLongPressTimer(timer)
  }

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
    if (!showOrbMenu) {
      handleContextualAction()
    }
  }

  const handleMouseLeave = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
  }

  const ContextualIcon = getContextualIcon()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Main Orb */}
        <Button
          size="lg"
          className={`w-16 h-16 rounded-full soft-shadow bg-background hover:bg-muted transition-all duration-300 border-0 ${
            orbPulse ? "animate-gentle-pulse glow-accent" : ""
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          aria-label={`Navigation - ${screens[currentScreen].title}`}
        >
          <ContextualIcon className="w-6 h-6 text-primary transition-all duration-200" />
        </Button>

        {/* Wave Animation Menu */}
        {showOrbMenu && (
          <div className="absolute bottom-20 right-0">
            {Object.entries(screens).map(([key, screen], index) => {
              const Icon = screen.icon
              return (
                <Button
                  key={key}
                  size="sm"
                  variant="ghost"
                  className={`w-12 h-12 rounded-full soft-shadow bg-background hover:bg-muted transition-all duration-200 mb-2 ${
                    key === "atelier" && orbPulse ? "glow-accent" : ""
                  }`}
                  style={{
                    animation: `orbWaveIn 250ms ease-out ${index * 40}ms both`,
                  }}
                  onClick={() => {
                    onScreenChange(key as Screen)
                    setShowOrbMenu(false)
                  }}
                  aria-label={`Aller à ${screen.title}`}
                >
                  <Icon className="w-4 h-4 text-foreground" />
                </Button>
              )
            })}
            {/* Backdrop to close menu */}
            <div className="fixed inset-0 -z-10" onClick={() => setShowOrbMenu(false)} />
          </div>
        )}
      </div>
    </div>
  )
}