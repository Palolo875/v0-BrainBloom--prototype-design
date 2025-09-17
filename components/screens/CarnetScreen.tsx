"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

interface Note {
  title: string
  excerpt: string
  time: string
  tags: string[]
}

interface CarnetScreenProps {
  noteContent: string
  onNoteClick: () => void
}

const mockNotes: Note[] = [
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
]

export function CarnetScreen({ noteContent, onNoteClick }: CarnetScreenProps) {
  return (
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
          <p className="text-lg text-muted-foreground font-sans">
            Prêt(e) à planter votre première idée ?
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {mockNotes.map((note, i) => (
            <Card
              key={i}
              className="soft-shadow border-0 bg-card p-6 hover:glow-accent transition-all duration-300 cursor-pointer"
              onClick={onNoteClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onNoteClick()
                }
              }}
              aria-label={`Ouvrir la note: ${note.title}`}
            >
              <h3 className="font-serif text-lg text-card-foreground mb-2">
                {note.title}
              </h3>
              <p className="text-sm text-muted-foreground font-sans mb-3">
                {note.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent"
                    >
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
}