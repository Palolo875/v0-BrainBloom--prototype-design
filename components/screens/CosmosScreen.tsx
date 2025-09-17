"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, Sparkles } from "lucide-react"

interface Node {
  id: string
  x: number
  y: number
  size: number
  color: string
  title: string
  type: string
  tags: string[]
  content: string
  connections: string[]
}

interface SidePanel {
  id: string
  title: string
  content: string
}

interface CosmosScreenProps {
  onNodeClick: (node: SidePanel) => void
}

const nodes: Node[] = [
  {
    id: "innovation",
    x: 25,
    y: 25,
    size: 48,
    color: "#F3AB9A",
    title: "Innovation",
    type: "tache",
    tags: ["#ProjetX", "#Design"],
    content:
      "Réflexions sur l'innovation dans le design d'interface. Comment créer des expériences utilisateur qui surprennent tout en restant intuitives...",
    connections: ["projet", "lecture"],
  },
  {
    id: "projet",
    x: 66,
    y: 50,
    size: 40,
    color: "#B9B2D8",
    title: "Projet",
    type: "journal",
    tags: ["#ProjetX", "#Innovation"],
    content: "Idées pour le nouveau projet. Architecture, fonctionnalités, expérience utilisateur...",
    connections: ["innovation", "lecture"],
  },
  {
    id: "lecture",
    x: 50,
    y: 75,
    size: 32,
    color: "#A4BFA0",
    title: "Lecture",
    type: "vocal",
    tags: ["#Design", "#UX"],
    content: "Notes de lecture sur les dernières tendances en UX/UI. Principes de design émotionnel...",
    connections: ["innovation", "projet"],
  },
  {
    id: "inspiration",
    x: 15,
    y: 60,
    size: 36,
    color: "#FADDAF",
    title: "Inspiration",
    type: "tache",
    tags: ["#Art", "#Nature"],
    content: "Sources d'inspiration quotidienne. Art, nature, architecture...",
    connections: ["innovation"],
  },
  {
    id: "reflexion",
    x: 80,
    y: 30,
    size: 28,
    color: "#F3AB9A",
    title: "Réflexion",
    type: "journal",
    tags: ["#Philosophie", "#Créativité"],
    content: "Pensées philosophiques sur la créativité et l'innovation...",
    connections: ["projet"],
  },
]

export function CosmosScreen({ onNodeClick }: CosmosScreenProps) {
  const [showTelescope, setShowTelescope] = useState(false)
  const [activeFilters, setActiveFilters] = useState<{
    types: string[]
    tags: string[]
    timeframe: string | null
  }>({
    types: [],
    tags: [],
    timeframe: null,
  })
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const filteredNodes = nodes.filter((node) => {
    const typeMatch = activeFilters.types.length === 0 || activeFilters.types.includes(node.type)
    const tagMatch = activeFilters.tags.length === 0 || activeFilters.tags.some((tag) => node.tags.includes(tag))
    return typeMatch && tagMatch
  })

  const getConnections = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId)
    return node ? node.connections : []
  }

  const toggleFilter = (category: "types" | "tags", value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }))
  }

  return (
    <div className="space-y-6 relative">
      <div className="text-center mb-8 relative">
        <h2 className="font-serif text-3xl text-[#5C5470] mb-2 relative inline-block">
          Le Cosmos
          {/* Twinkling stars around title */}
          <div className="absolute -top-2 -right-8">
            <Star className="w-4 h-4 text-[#FADDAF] animate-gentle-pulse" />
          </div>
          <div className="absolute -top-4 -left-6">
            <Star className="w-3 h-3 text-[#FADDAF] animate-gentle-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          <div className="absolute -bottom-2 left-1/2">
            <Star className="w-2 h-2 text-[#FADDAF] animate-gentle-pulse" style={{ animationDelay: "1s" }} />
          </div>
        </h2>
        <p className="text-[#5C5470] opacity-70 font-sans">Explorez les connexions entre vos idées</p>

        <div className="mt-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowTelescope(!showTelescope)}
            className="text-[#5C5470] hover:bg-[#5C5470]/10 transition-all duration-200"
            aria-expanded={showTelescope}
            aria-controls="telescope-panel"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3z" />
            </svg>
            Télescope
          </Button>
        </div>
      </div>

      {showTelescope && (
        <div id="telescope-panel" className="mb-6 animate-slide-down">
          <Card className="soft-shadow border-0 bg-[#FBF9F6] p-6 rounded-2xl">
            <div className="space-y-4">
              <div>
                <h4 className="font-sans font-medium text-[#5C5470] mb-3">Types de contenu</h4>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtres par type">
                  {[
                    { key: "tache", label: "Tâches", icon: "✅", color: "#A4BFA0" },
                    { key: "journal", label: "Entrées de Journal", icon: "📖", color: "#B9B2D8" },
                    { key: "vocal", label: "Notes Vocales", icon: "🎤", color: "#F3AB9A" },
                  ].map((type) => (
                    <button
                      key={type.key}
                      onClick={() => toggleFilter("types", type.key)}
                      className={`px-4 py-2 rounded-full font-sans text-sm transition-all duration-200 flex items-center gap-2 ${
                        activeFilters.types.includes(type.key)
                          ? "text-white shadow-md"
                          : "bg-white/50 text-[#5C5470] hover:bg-white/80"
                      }`}
                      style={{
                        backgroundColor: activeFilters.types.includes(type.key) ? type.color : undefined,
                      }}
                      aria-pressed={activeFilters.types.includes(type.key)}
                    >
                      <span>{type.icon}</span>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-sans font-medium text-[#5C5470] mb-3">Vos Tags</h4>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtres par tag">
                  {["#ProjetX", "#Design", "#Innovation", "#UX", "#Art"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleFilter("tags", tag)}
                      className={`px-4 py-2 rounded-full font-sans text-sm transition-all duration-200 ${
                        activeFilters.tags.includes(tag)
                          ? "bg-[#F3AB9A] text-white shadow-md"
                          : "bg-white/50 text-[#5C5470] hover:bg-white/80"
                      }`}
                      aria-pressed={activeFilters.tags.includes(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {(activeFilters.types.length > 0 || activeFilters.tags.length > 0) && (
                <div className="pt-2 border-t border-[#5C5470]/10">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setActiveFilters({ types: [], tags: [], timeframe: null })}
                    className="text-[#5C5470] hover:bg-[#5C5470]/10"
                  >
                    Effacer tous les filtres
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      <div className="relative h-[500px] rounded-3xl soft-inset bg-[#FBF9F6] overflow-hidden">
        <div className="absolute inset-0 p-8">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden="true">
            {filteredNodes.map((node) =>
              node.connections
                .filter((connId) => filteredNodes.some((n) => n.id === connId))
                .map((connId) => {
                  const connectedNode = nodes.find((n) => n.id === connId)
                  if (!connectedNode) return null

                  const isHighlighted = selectedNode === node.id || selectedNode === connId
                  const opacity = selectedNode ? (isHighlighted ? 0.8 : 0.1) : 0.3
                  const strokeColor = isHighlighted ? "#FADDAF" : "#5C5470"

                  return (
                    <path
                      key={`${node.id}-${connId}`}
                      d={`M ${node.x}% ${node.y}% Q ${(node.x + connectedNode.x) / 2}% ${(node.y + connectedNode.y) / 2 - 10}% ${connectedNode.x}% ${connectedNode.y}%`}
                      stroke={strokeColor}
                      strokeWidth="2"
                      fill="none"
                      opacity={opacity}
                      className="transition-all duration-300"
                      style={{
                        filter: isHighlighted ? "drop-shadow(0 0 8px rgba(250, 221, 175, 0.6))" : "none",
                      }}
                    />
                  )
                }),
            )}
          </svg>

          {nodes.map((node, index) => {
            const isFiltered = filteredNodes.some((n) => n.id === node.id)
            const isHighlighted = selectedNode === node.id
            const isConnected = selectedNode && getConnections(selectedNode).includes(node.id)
            const shouldGlow = isHighlighted || isConnected
            const opacity =
              activeFilters.types.length > 0 || activeFilters.tags.length > 0
                ? isFiltered
                  ? 1
                  : 0.2
                : selectedNode
                  ? shouldGlow
                    ? 1
                    : 0.3
                  : 1

            return (
              <div
                key={node.id}
                className={`absolute cursor-pointer transition-all duration-300 z-20 ${
                  shouldGlow ? "animate-gentle-pulse" : ""
                }`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                  opacity,
                  animation: `cosmicBreath 4s ease-in-out infinite ${index * 0.5}s`,
                }}
                onMouseEnter={() => setSelectedNode(node.id)}
                onMouseLeave={() => setSelectedNode(null)}
                onClick={() =>
                  onNodeClick({
                    id: node.id,
                    title: node.title,
                    content: node.content,
                  })
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onNodeClick({
                      id: node.id,
                      title: node.title,
                      content: node.content,
                    })
                  }
                }}
                aria-label={`Explorer le nœud: ${node.title}`}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    shouldGlow ? "animate-gentle-pulse" : ""
                  }`}
                  style={{
                    width: `${node.size + 16}px`,
                    height: `${node.size + 16}px`,
                    background: `radial-gradient(circle, ${node.color}40 0%, ${node.color}20 50%, transparent 70%)`,
                    transform: "translate(-8px, -8px)",
                  }}
                />

                <div
                  className="rounded-full soft-shadow transition-all duration-300 flex items-center justify-center"
                  style={{
                    width: `${node.size}px`,
                    height: `${node.size}px`,
                    backgroundColor: node.color,
                    transform: isHighlighted ? "scale(1.1)" : "scale(1)",
                    boxShadow: shouldGlow ? `0 0 20px ${node.color}80` : undefined,
                  }}
                >
                  <Sparkles
                    className="text-white"
                    style={{ width: `${node.size * 0.4}px`, height: `${node.size * 0.4}px` }}
                  />
                </div>

                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-sans text-[#5C5470] whitespace-nowrap transition-opacity duration-300 ${
                    isHighlighted ? "opacity-100 font-medium" : "opacity-60"
                  }`}
                >
                  {node.title}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes cosmicBreath {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.02); }
        }
        @keyframes slide-down {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 250ms ease-out;
        }
      `}</style>
    </div>
  )
}