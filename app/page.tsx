"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  Sparkles,
  Settings,
  Wrench,
  Plus,
  Check,
  Search,
  Mic,
  MoreHorizontal,
  Star,
  Lightbulb,
  Target,
  Save,
  Hash,
  CheckSquare,
  ImageIcon,
  Link,
} from "lucide-react"

type Screen = "carnet" | "cosmos" | "atelier" | "rouages" | "editeur"

type SidePanel = {
  id: string
  title: string
  content: string
} | null


export default function CognosApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("carnet")
  const [searchQuery, setSearchQuery] = useState("")
  const [isVoiceSearch, setIsVoiceSearch] = useState(false)
  const [noteContent, setNoteContent] = useState("")
  const [showOrbMenu, setShowOrbMenu] = useState(false)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)
  const [orbPulse, setOrbPulse] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [showSidePanel, setShowSidePanel] = useState(false)
  const [showTelescope, setShowTelescope] = useState(false)
  const [activeFilters, setActiveFilters] = useState<{ types: string[]; tags: string[]; timeframe: string | null }>({
    types: [],
    tags: [],
    timeframe: null,
  })

  const [selectedText, setSelectedText] = useState("")
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 })
  const [showToolbar, setShowToolbar] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [activeFormats, setActiveFormats] = useState<string[]>([])
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [commandQuery, setCommandQuery] = useState("")
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  const [sidePanel, setSidePanel] = useState<SidePanel>(null)

  const screens = {
    carnet: { title: "Le Carnet", icon: BookOpen },
    cosmos: { title: "Le Cosmos", icon: Sparkles },
    atelier: { title: "L'Atelier", icon: Wrench },
    rouages: { title: "Les Rouages", icon: Settings },
    editeur: { title: "La Page Blanche", icon: Plus },
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentScreen === "carnet") {
        setOrbPulse(true)
        setTimeout(() => setOrbPulse(false), 1000)
      }
    }, 10000) // Pulse every 10 seconds on carnet screen

    return () => clearInterval(interval)
  }, [currentScreen])

  const getContextualIcon = () => {
    switch (currentScreen) {
      case "editeur":
        return noteContent ? Save : Check
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
          // Save note action with feedback
          setOrbPulse(true)
          setTimeout(() => {
            setOrbPulse(false)
            setCurrentScreen("carnet")
          }, 300)
        } else {
          setCurrentScreen("carnet")
        }
        break
      case "cosmos":
        // Recenter graph action
        setOrbPulse(true)
        setTimeout(() => setOrbPulse(false), 300)
        break
      default:
        setCurrentScreen("editeur")
    }
  }

  const handleTextSelection = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    const start = target.selectionStart
    const end = target.selectionEnd

    if (start !== end) {
      const selected = target.value.substring(start, end)
      setSelectedText(selected)
      setShowToolbar(true)

      // Position toolbar near selection (simplified)
      const rect = target.getBoundingClientRect()
      setToolbarPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 60,
      })
    } else {
      setShowToolbar(false)
      setSelectedText("")
    }
  }

  const toggleFormat = (format: string) => {
    setActiveFormats((prev) => (prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]))
  }

  const NavigationOrb = () => {
    const ContextualIcon = getContextualIcon()

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
                      setCurrentScreen(key as Screen)
                      setShowOrbMenu(false)
                    }}
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

  const SearchBar = () => (
    <div className="mb-8 flex justify-center">
      <div className="relative max-w-md w-full">
        <div className={`mercury-drop-search ${searchQuery ? "mercury-focused" : ""}`}>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher dans vos pensées..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-16 py-4 bg-transparent border-0 focus:outline-none font-sans text-lg placeholder:text-muted-foreground"
          />
          <Button
            size="sm"
            variant="ghost"
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full voice-sphere ${isVoiceSearch ? "voice-active" : ""}`}
            onClick={() => setIsVoiceSearch(!isVoiceSearch)}
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  const renderCarnet = () => (
    <div className="space-y-6">
      {noteContent === "" ? (
        <div className="text-center py-12">
          <div className="mb-6 animate-float">
            <div className="w-32 h-32 mx-auto rounded-full soft-shadow bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="gardien-illustration">
                <BookOpen className="w-16 h-16 text-primary" />
              </div>
            </div>
          </div>
          <p className="text-lg text-muted-foreground font-sans">Prêt(e) à planter votre première idée ?</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {[
            {
              title: "Réflexions sur l'innovation",
              excerpt: "Comment créer des expériences utilisateur qui surprennent...",
              time: "Il y a 2 heures",
              tags: ["#Innovation", "#UX"],
            },
            {
              title: "Idées pour le projet",
              excerpt: "Architecture, fonctionnalités, expérience utilisateur...",
              time: "Hier",
              tags: ["#ProjetX", "#Design"],
            },
            {
              title: "Notes de lecture",
              excerpt: "Principes de design émotionnel et psychologie cognitive...",
              time: "Il y a 3 jours",
              tags: ["#Lecture", "#Design"],
            },
          ].map((note, i) => (
            <Card
              key={i}
              className="soft-shadow border-0 bg-card p-6 hover:glow-accent transition-all duration-300 cursor-pointer"
              onClick={() => setCurrentScreen("editeur")}
            >
              <h3 className="font-serif text-lg text-card-foreground mb-2">{note.title}</h3>
              <p className="text-sm text-muted-foreground font-sans mb-3">{note.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {note.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{note.time}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )

  const renderCosmos = () => {
    const nodes = [
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
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3z" />
              </svg>
              Télescope
            </Button>
          </div>
        </div>

        {showTelescope && (
          <div className="mb-6 animate-slide-down">
            <Card className="soft-shadow border-0 bg-[#FBF9F6] p-6 rounded-2xl">
              <div className="space-y-4">
                <div>
                  <h4 className="font-sans font-medium text-[#5C5470] mb-3">Types de contenu</h4>
                  <div className="flex flex-wrap gap-2">
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
                      >
                        <span>{type.icon}</span>
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-sans font-medium text-[#5C5470] mb-3">Vos Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {["#ProjetX", "#Design", "#Innovation", "#UX", "#Art"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleFilter("tags", tag)}
                        className={`px-4 py-2 rounded-full font-sans text-sm transition-all duration-200 ${
                          activeFilters.tags.includes(tag)
                            ? "bg-[#F3AB9A] text-white shadow-md"
                            : "bg-white/50 text-[#5C5470] hover:bg-white/80"
                        }`}
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
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
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
                    setSidePanel({
                      id: node.id,
                      title: node.title,
                      content: node.content,
                    })
                  }
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

        {sidePanel && (
          <div className="fixed inset-y-0 right-0 w-96 bg-[#FBF9F6] soft-shadow z-50 transform transition-transform duration-300 ease-out">
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-[#5C5470]/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-[#5C5470]">{sidePanel.title}</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSidePanel(null)}
                    className="rounded-full w-8 h-8 p-0"
                  >
                    ×
                  </Button>
                </div>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                <p className="font-sans text-[#5C5470] leading-relaxed">{sidePanel.content}</p>
              </div>
              <div className="p-6 border-t border-[#5C5470]/10">
                <Button className="w-full soft-shadow bg-[#A4BFA0] hover:bg-[#A4BFA0]/90 text-white">
                  Modifier cette note
                </Button>
              </div>
            </div>
            <div className="fixed inset-0 bg-black/20 -z-10" onClick={() => setSidePanel(null)} />
          </div>
        )}

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

  const renderEditeur = () => {
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value
      setNoteContent(value)

      // Auto-save trigger
      setAutoSaveStatus("saving")
      setTimeout(() => {
        setAutoSaveStatus("saved")
        setTimeout(() => setAutoSaveStatus("idle"), 1000)
      }, 500)

      // Command palette trigger
      if (value.endsWith("/")) {
        setShowCommandPalette(true)
        setCommandQuery("")
      }

      // Link suggestion trigger
      if (value.includes("[[")) {
        // Show link suggestions (simplified for demo)
      }
    }

    const insertCommand = (command: string) => {
      const commands = {
        titre: "# ",
        tache: "- [ ] ",
        image: "![]()",
        lien: "[[]]",
      }

      const insertion = commands[command as keyof typeof commands] || ""
      setNoteContent((prev) => prev.slice(0, -1) + insertion)
      setShowCommandPalette(false)
    }

    return (
      <div className="space-y-6 relative">
        {noteContent === "" ? (
          <div className="text-center py-16">
            <div className="mb-6 animate-float">
              <div className="w-24 h-24 mx-auto rounded-full soft-shadow bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center">
                <div className="gardien-illustration">
                  <Lightbulb className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
            <p className="text-lg text-muted-foreground font-sans">Votre première pensée attend...</p>
          </div>
        ) : null}

        <div className="relative">
          <Textarea
            placeholder="Une nouvelle idée..."
            value={noteContent}
            onChange={handleTextChange}
            onSelect={handleTextSelection}
            className="min-h-96 soft-inset border-0 bg-background resize-none focus-visible:ring-0 font-sans text-lg leading-relaxed"
          />

          {/* Command Palette */}
          {showCommandPalette && (
            <div className="absolute z-50 mt-2 w-64 soft-shadow bg-card rounded-2xl p-4">
              <div className="space-y-2">
                {["titre", "tache", "image", "lien"].map((cmd) => (
                  <Button
                    key={cmd}
                    variant="ghost"
                    className="w-full justify-start font-sans"
                    onClick={() => insertCommand(cmd)}
                  >
                    {cmd === "titre" && <Hash className="w-4 h-4 mr-2" />}
                    {cmd === "tache" && <CheckSquare className="w-4 h-4 mr-2" />}
                    {cmd === "image" && <ImageIcon className="w-4 h-4 mr-2" />}
                    {cmd === "lien" && <Link className="w-4 h-4 mr-2" />}
                    {cmd.charAt(0).toUpperCase() + cmd.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Archipel Flottant */}
          {showToolbar && (
            <div
              className="fixed z-50 archipel-toolbar"
              style={{
                left: `${toolbarPosition.x}px`,
                top: `${toolbarPosition.y}px`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className={`galet-button ${activeFormats.includes("bold") ? "galet-active" : ""}`}
                  onClick={() => toggleFormat("bold")}
                >
                  <span className="font-bold text-sm">B</span>
                </Button>

                <Button
                  size="sm"
                  className={`galet-button ${activeFormats.includes("italic") ? "galet-active" : ""}`}
                  onClick={() => toggleFormat("italic")}
                >
                  <span className="italic text-sm">I</span>
                </Button>

                <Button
                  size="sm"
                  className={`galet-button ${activeFormats.includes("underline") ? "galet-active" : ""}`}
                  onClick={() => toggleFormat("underline")}
                >
                  <span className="underline text-sm">U</span>
                </Button>

                <div className="relative">
                  <Button size="sm" className="galet-button" onClick={() => setShowMoreMenu(!showMoreMenu)}>
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>

                  {showMoreMenu && (
                    <div className="absolute top-12 left-0 bourgeon-menu">
                      <div className="flex flex-col gap-1">
                        {["H1", "H2", "Quote", "Code"].map((option, index) => (
                          <Button
                            key={option}
                            size="sm"
                            className="galet-button bourgeon-petal"
                            style={{
                              animation: `bourgeon 200ms ease-out ${index * 30}ms both`,
                            }}
                            onClick={() => {
                              toggleFormat(option.toLowerCase())
                              setShowMoreMenu(false)
                            }}
                          >
                            <span className="text-xs">{option}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderAtelier = () => (
    <div
      className="space-y-8"
      style={{ backgroundColor: "#FBF9F6", minHeight: "100vh", margin: "-2rem -1rem", padding: "2rem 1rem" }}
    >
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl text-[#5C5470] mb-4">L'Atelier</h2>
        <p className="text-[#5C5470] opacity-70 font-sans text-lg">Votre jardin des idées personnalisé</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Module 1: Gestion de Tâches */}
        <Card className="soft-shadow border-0 bg-white/80 p-8 rounded-3xl">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h3 className="font-serif text-2xl text-[#5C5470] mb-3">Gestion de Tâches</h3>
              <p className="font-sans text-[#5C5470] opacity-80 leading-relaxed mb-4">
                Transformez vos idées en actions concrètes. Organisez, priorisez et suivez vos projets avec élégance.
              </p>
            </div>
            <div className="ml-6">
              {/* Custom toggle switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-14 h-8 bg-[#5C5470]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#A4BFA0]"></div>
              </label>
            </div>
          </div>
          <div className="w-24 h-24 mx-auto mb-4">
            {/* Fox illustration placeholder */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F3AB9A]/30 to-[#F3AB9A]/10 flex items-center justify-center">
              <svg className="w-12 h-12 text-[#F3AB9A]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
        </Card>

        {/* Module 2: Journaling */}
        <Card className="soft-shadow border-0 bg-white/80 p-8 rounded-3xl">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h3 className="font-serif text-2xl text-[#5C5470] mb-3">Journaling</h3>
              <p className="font-sans text-[#5C5470] opacity-80 leading-relaxed mb-4">
                Capturez vos réflexions quotidiennes. Un espace intime pour explorer vos pensées et émotions.
              </p>
            </div>
            <div className="ml-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-14 h-8 bg-[#5C5470]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#A4BFA0]"></div>
              </label>
            </div>
          </div>
          <div className="w-24 h-24 mx-auto mb-4">
            {/* Butterfly illustration placeholder */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#B9B2D8]/30 to-[#B9B2D8]/10 flex items-center justify-center">
              <svg className="w-12 h-12 text-[#B9B2D8]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
        </Card>

        {/* Module 3: Voix Intelligente */}
        <Card className="soft-shadow border-0 bg-white/80 p-8 rounded-3xl">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h3 className="font-serif text-2xl text-[#5C5470] mb-3">Voix Intelligente</h3>
              <p className="font-sans text-[#5C5470] opacity-80 leading-relaxed mb-4">
                Dictez vos idées en mouvement. L'IA transcrit et organise vos pensées vocales automatiquement.
              </p>
            </div>
            <div className="ml-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-14 h-8 bg-[#5C5470]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#A4BFA0]"></div>
              </label>
            </div>
          </div>
          <div className="w-24 h-24 mx-auto mb-4">
            {/* Owl illustration placeholder */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FADDAF]/30 to-[#FADDAF]/10 flex items-center justify-center">
              <svg className="w-12 h-12 text-[#FADDAF]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )

  const renderRouages = () => (
    <div
      className="space-y-8"
      style={{ backgroundColor: "#FBF9F6", minHeight: "100vh", margin: "-2rem -1rem", padding: "2rem 1rem" }}
    >
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl text-[#5C5470] mb-4">Les Rouages</h2>
        <p className="text-[#5C5470] opacity-70 font-sans text-lg">Personnalisez votre expérience Cognos</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Settings sections */}
        <Card className="soft-shadow border-0 bg-white/80 p-6 rounded-3xl">
          <h3 className="font-serif text-xl text-[#5C5470] mb-4">Préférences générales</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[#5C5470]">Mode sombre</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-14 h-8 bg-[#5C5470]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#A4BFA0]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-sans text-[#5C5470]">Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-14 h-8 bg-[#5C5470]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#A4BFA0]"></div>
              </label>
            </div>
          </div>
        </Card>

        <Card className="soft-shadow border-0 bg-white/80 p-6 rounded-3xl">
          <h3 className="font-serif text-xl text-[#5C5470] mb-4">Synchronisation</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[#5C5470]">Sauvegarde automatique</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-14 h-8 bg-[#5C5470]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#A4BFA0]"></div>
              </label>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "carnet":
        return renderCarnet()
      case "cosmos":
        return renderCosmos()
      case "atelier":
        return renderAtelier()
      case "rouages":
        return renderRouages()
      case "editeur":
        return renderEditeur()
      default:
        return renderCarnet()
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
          <h1 className="font-serif text-4xl text-foreground mb-2">{screens[currentScreen].title}</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </header>

        {currentScreen !== "editeur" && <SearchBar />}

        <main>{renderCurrentScreen()}</main>

        <NavigationOrb />
      </div>
    </div>
  )
}
