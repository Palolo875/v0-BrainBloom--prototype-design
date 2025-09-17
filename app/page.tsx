"use client"

import React from "react"
import { useAppState } from "@/hooks/useAppState"
import { SearchBar } from "@/components/common/SearchBar"
import { NavigationOrb } from "@/components/common/NavigationOrb"
import { CarnetScreen } from "@/components/screens/CarnetScreen"
import { CosmosScreen } from "@/components/screens/CosmosScreen"
import { EditeurScreen } from "@/components/screens/EditeurScreen"
import { AtelierScreen } from "@/components/screens/AtelierScreen"
import { RouagesScreen } from "@/components/screens/RouagesScreen"

const screens = {
  carnet: { title: "Le Carnet" },
  cosmos: { title: "Le Cosmos" },
  atelier: { title: "L'Atelier" },
  rouages: { title: "Les Rouages" },
  editeur: { title: "La Page Blanche" },
}

export default function CognosApp() {
  const {
    state,
    setCurrentScreen,
    setSearchQuery,
    toggleVoiceSearch,
    setNoteContent,
    setSidePanel,
  } = useAppState()

  const handleNoteClick = () => {
    setCurrentScreen("editeur")
  }

  const handleNodeClick = (node: { id: string; title: string; content: string }) => {
    setSidePanel(node)
  }

  const renderCurrentScreen = () => {
    switch (state.currentScreen) {
      case "carnet":
        return <CarnetScreen noteContent={state.noteContent} onNoteClick={handleNoteClick} />
      case "cosmos":
        return <CosmosScreen onNodeClick={handleNodeClick} />
      case "atelier":
        return <AtelierScreen />
      case "rouages":
        return <RouagesScreen />
      case "editeur":
        return <EditeurScreen noteContent={state.noteContent} onContentChange={setNoteContent} />
      default:
        return <CarnetScreen noteContent={state.noteContent} onNoteClick={handleNoteClick} />
    }
  }


  return (
    <div className="min-h-screen bg-background">
      <style jsx>{`
        .mercury-drop-search {
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
          border-radius: 2rem;
          box-shadow: 
            inset 2px 2px 5px rgba(0,0,0,0.1),
            inset -2px -2px 5px rgba(255,255,255,0.8),
            0 8px 32px rgba(0,0,0,0.1);
          transition: all 250ms ease;
        }
        
        .mercury-focused {
          box-shadow: 
            inset 2px 2px 5px rgba(0,0,0,0.1),
            inset -2px -2px 5px rgba(255,255,255,0.8),
            0 0 0 2px #FADDAF,
            0 8px 32px rgba(0,0,0,0.15);
        }
        
        .voice-sphere {
          background: radial-gradient(circle, #f0f0f0 0%, #e0e0e0 100%);
          box-shadow: 
            2px 2px 5px rgba(0,0,0,0.1),
            -2px -2px 5px rgba(255,255,255,0.8);
        }
        
        .voice-active {
          background: radial-gradient(circle, #FADDAF 0%, #F3AB9A 100%);
          animation: voice-pulse 1s ease-in-out infinite;
        }
        
        .galet-button {
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
          border-radius: 1rem;
          box-shadow: 
            2px 2px 5px rgba(0,0,0,0.1),
            -2px -2px 5px rgba(255,255,255,0.8);
          transition: all 150ms ease;
          border: 0;
          min-width: 2.5rem;
          height: 2.5rem;
        }
        
        .galet-button:hover {
          box-shadow: 
            1px 1px 3px rgba(0,0,0,0.1),
            -1px -1px 3px rgba(255,255,255,0.8);
          transform: translateY(-1px);
        }
        
        .galet-button:active {
          box-shadow: 
            inset 2px 2px 5px rgba(0,0,0,0.1),
            inset -2px -2px 5px rgba(255,255,255,0.8);
          transform: translateY(0);
        }
        
        .galet-active {
          background: linear-gradient(145deg, #A4BFA0 0%, #8FA88B 100%);
          color: white;
        }
        
        .archipel-toolbar {
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
          border-radius: 1.5rem;
          box-shadow: 
            0 8px 32px rgba(0,0,0,0.15),
            inset 1px 1px 2px rgba(255,255,255,0.8);
          padding: 0.75rem;
          backdrop-filter: blur(10px);
        }
        
        .bourgeon-menu {
          background: transparent;
        }
        
        .bourgeon-petal {
          opacity: 0;
          transform: scale(0.8) translateY(10px);
        }
        
        @keyframes bourgeon {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes voice-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .gardien-illustration {
          position: relative;
        }
        
        .gardien-illustration::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: radial-gradient(circle, rgba(244, 173, 154, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: gentle-glow 3s ease-in-out infinite;
        }
        
        @keyframes gentle-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes orbWaveIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(20px);
          }
          60% {
            transform: scale(1.1) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes gentle-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(var(--accent), 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(var(--accent), 0);
          }
        }
        
        /* Added mercury drop and voice sphere animations */
        @keyframes mercuryFocus {
          0% { transform: scaleX(1); }
          50% { transform: scaleX(1.05); }
          100% { transform: scaleX(1); }
        }
        
        @keyframes petalBloom {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-10deg);
          }
          60% {
            transform: scale(1.1) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        .animate-gentle-pulse {
          animation: gentle-pulse 2s ease-in-out infinite;
        }
        
        .glow-accent {
          box-shadow: 0 0 20px rgba(var(--accent), 0.3);
        }
        
        /* Mercury drop search bar styles */
        .mercury-drop {
          background: #FBF9F6;
          box-shadow: 
            inset 8px 8px 16px rgba(92, 84, 112, 0.1),
            inset -8px -8px 16px rgba(255, 255, 255, 0.8);
          border-radius: 50px;
          transition: all 300ms ease-out;
        }
        
        .mercury-focus {
          animation: mercuryFocus 300ms ease-out;
          box-shadow: 
            inset 8px 8px 16px rgba(92, 84, 112, 0.1),
            inset -8px -8px 16px rgba(255, 255, 255, 0.8),
            0 0 0 2px #FADDAF,
            0 0 20px rgba(250, 221, 175, 0.3);
        }
        
        /* Voice sphere styles */
        .voice-sphere {
          background: #B9B2D8 !important;
          color: white !important;
          border-radius: 50% !important;
        }
        
        /* Archipel floating toolbar styles */
        .archipel-toolbar {
          filter: drop-shadow(0 8px 16px rgba(92, 84, 112, 0.15));
        }
        
        .galet-button {
          background: #FBF9F6;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          box-shadow: 
            8px 8px 16px rgba(92, 84, 112, 0.1),
            -8px -8px 16px rgba(255, 255, 255, 0.8);
          color: #5C5470;
          transition: all 200ms ease-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .galet-button:hover {
          transform: translateY(-2px);
          box-shadow: 
            8px 12px 20px rgba(92, 84, 112, 0.15),
            -8px -8px 16px rgba(255, 255, 255, 0.9);
        }
        
        .galet-button:active {
          transform: translateY(1px);
          box-shadow: 
            inset 4px 4px 8px rgba(92, 84, 112, 0.2),
            inset -4px -4px 8px rgba(255, 255, 255, 0.1);
        }
        
        .galet-active {
          background: #F3AB9A !important;
          color: white !important;
          box-shadow: 
            inset 4px 4px 8px rgba(92, 84, 112, 0.2),
            inset -4px -4px 8px rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="font-serif text-4xl text-foreground mb-2">{screens[state.currentScreen].title}</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </header>

        {state.currentScreen !== "editeur" && (
          <SearchBar
            searchQuery={state.searchQuery}
            onSearchChange={setSearchQuery}
            isVoiceSearch={state.isVoiceSearch}
            onVoiceToggle={toggleVoiceSearch}
          />
        )}

        <main>{renderCurrentScreen()}</main>

        <NavigationOrb
          currentScreen={state.currentScreen}
          onScreenChange={setCurrentScreen}
          noteContent={state.noteContent}
          orbPulse={state.orbPulse}
        />
      </div>
    </div>
  )
}
