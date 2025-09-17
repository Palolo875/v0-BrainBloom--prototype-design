"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Lightbulb,
  Hash,
  CheckSquare,
  ImageIcon,
  Link,
  MoreHorizontal,
} from "lucide-react"

interface EditeurScreenProps {
  noteContent: string
  onContentChange: (content: string) => void
}

export function EditeurScreen({ noteContent, onContentChange }: EditeurScreenProps) {
  const [selectedText, setSelectedText] = useState("")
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 })
  const [showToolbar, setShowToolbar] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [activeFormats, setActiveFormats] = useState<string[]>([])
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    onContentChange(value)

    // Command palette trigger
    if (value.endsWith("/")) {
      setShowCommandPalette(true)
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

  const insertCommand = (command: string) => {
    const commands = {
      titre: "# ",
      tache: "- [ ] ",
      image: "![]()",
      lien: "[[]]",
    }

    const insertion = commands[command as keyof typeof commands] || ""
    onContentChange(noteContent.slice(0, -1) + insertion)
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
          aria-label="Zone de rédaction de note"
        />

        {/* Command Palette */}
        {showCommandPalette && (
          <div className="absolute z-50 mt-2 w-64 soft-shadow bg-card rounded-2xl p-4" role="menu" aria-label="Palette de commandes">
            <div className="space-y-2">
              {["titre", "tache", "image", "lien"].map((cmd) => (
                <Button
                  key={cmd}
                  variant="ghost"
                  className="w-full justify-start font-sans"
                  onClick={() => insertCommand(cmd)}
                  role="menuitem"
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
            role="toolbar"
            aria-label="Barre d'outils de formatage"
          >
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className={`galet-button ${activeFormats.includes("bold") ? "galet-active" : ""}`}
                onClick={() => toggleFormat("bold")}
                aria-pressed={activeFormats.includes("bold")}
                aria-label="Gras"
              >
                <span className="font-bold text-sm">B</span>
              </Button>

              <Button
                size="sm"
                className={`galet-button ${activeFormats.includes("italic") ? "galet-active" : ""}`}
                onClick={() => toggleFormat("italic")}
                aria-pressed={activeFormats.includes("italic")}
                aria-label="Italique"
              >
                <span className="italic text-sm">I</span>
              </Button>

              <Button
                size="sm"
                className={`galet-button ${activeFormats.includes("underline") ? "galet-active" : ""}`}
                onClick={() => toggleFormat("underline")}
                aria-pressed={activeFormats.includes("underline")}
                aria-label="Souligné"
              >
                <span className="underline text-sm">U</span>
              </Button>

              <div className="relative">
                <Button 
                  size="sm" 
                  className="galet-button" 
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  aria-expanded={showMoreMenu}
                  aria-haspopup="menu"
                  aria-label="Plus d'options"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>

                {showMoreMenu && (
                  <div className="absolute top-12 left-0 bourgeon-menu" role="menu" aria-label="Options de formatage supplémentaires">
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
                          role="menuitem"
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