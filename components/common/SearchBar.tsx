"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Search, Mic } from "lucide-react"

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  isVoiceSearch: boolean
  onVoiceToggle: () => void
}

export function SearchBar({ searchQuery, onSearchChange, isVoiceSearch, onVoiceToggle }: SearchBarProps) {
  return (
    <div className="mb-8 flex justify-center">
      <div className="relative max-w-md w-full">
        <div className={`mercury-drop-search ${searchQuery ? "mercury-focused" : ""}`}>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher dans vos pensées..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-16 py-4 bg-transparent border-0 focus:outline-none font-sans text-lg placeholder:text-muted-foreground"
            aria-label="Rechercher dans les notes"
          />
          <Button
            size="sm"
            variant="ghost"
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full voice-sphere ${
              isVoiceSearch ? "voice-active" : ""
            }`}
            onClick={onVoiceToggle}
            aria-pressed={isVoiceSearch}
            aria-label={isVoiceSearch ? "Arrêter la recherche vocale" : "Activer la recherche vocale"}
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}