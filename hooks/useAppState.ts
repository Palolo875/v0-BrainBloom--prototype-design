"use client"

import { useState, useEffect, useCallback } from "react"

type Screen = "carnet" | "cosmos" | "atelier" | "rouages" | "editeur"

interface SidePanel {
  id: string
  title: string
  content: string
}

interface AppState {
  currentScreen: Screen
  searchQuery: string
  isVoiceSearch: boolean
  noteContent: string
  orbPulse: boolean
  sidePanel: SidePanel | null
  autoSaveStatus: "idle" | "saving" | "saved"
}

const initialState: AppState = {
  currentScreen: "carnet",
  searchQuery: "",
  isVoiceSearch: false,
  noteContent: "",
  orbPulse: false,
  sidePanel: null,
  autoSaveStatus: "idle",
}

export function useAppState() {
  const [state, setState] = useState<AppState>(initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("cognos-app-state")
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        setState(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.warn("Failed to load saved state:", error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cognos-app-state", JSON.stringify(state))
  }, [state])

  // Orb pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (state.currentScreen === "carnet") {
        setState(prev => ({ ...prev, orbPulse: true }))
        setTimeout(() => {
          setState(prev => ({ ...prev, orbPulse: false }))
        }, 1000)
      }
    }, 10000) // Pulse every 10 seconds on carnet screen

    return () => clearInterval(interval)
  }, [state.currentScreen])

  // Auto-save effect
  useEffect(() => {
    if (state.noteContent) {
      setState(prev => ({ ...prev, autoSaveStatus: "saving" }))
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, autoSaveStatus: "saved" }))
        setTimeout(() => {
          setState(prev => ({ ...prev, autoSaveStatus: "idle" }))
        }, 1000)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [state.noteContent])

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  const setCurrentScreen = useCallback((screen: Screen) => {
    updateState({ currentScreen: screen })
  }, [updateState])

  const setSearchQuery = useCallback((query: string) => {
    updateState({ searchQuery: query })
  }, [updateState])

  const toggleVoiceSearch = useCallback(() => {
    updateState({ isVoiceSearch: !state.isVoiceSearch })
  }, [updateState, state.isVoiceSearch])

  const setNoteContent = useCallback((content: string) => {
    updateState({ noteContent: content })
  }, [updateState])

  const setSidePanel = useCallback((panel: SidePanel | null) => {
    updateState({ sidePanel: panel })
  }, [updateState])

  const clearState = useCallback(() => {
    setState(initialState)
    localStorage.removeItem("cognos-app-state")
  }, [])

  return {
    state,
    setCurrentScreen,
    setSearchQuery,
    toggleVoiceSearch,
    setNoteContent,
    setSidePanel,
    clearState,
    updateState,
  }
}