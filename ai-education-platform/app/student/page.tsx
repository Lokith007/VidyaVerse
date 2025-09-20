"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  Trophy,
  Flame,
  Star,
  Play,
  BookOpen,
  Settings,
  Volume2,
  Eye,
  Palette,
  Languages,
  Zap,
  Target,
  Award,
  Users,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const [xpPoints, setXpPoints] = useState(2450)
  const [streakDays, setStreakDays] = useState(12)
  const [currentLevel, setCurrentLevel] = useState(8)
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [fontSize, setFontSize] = useState([16])
  const [highContrast, setHighContrast] = useState(false)
  const [textToSpeech, setTextToSpeech] = useState(false)
  const [islOverlay, setIslOverlay] = useState(false)

  const subjects = [
    { name: "Mathematics", progress: 75, xp: 850, color: "bg-primary" },
    { name: "Science", progress: 60, xp: 720, color: "bg-secondary" },
    { name: "English", progress: 90, xp: 1200, color: "bg-primary" },
    { name: "History", progress: 45, xp: 540, color: "bg-secondary" },
  ]

  const achievements = [
    { name: "Quiz Master", description: "Completed 10 quizzes", icon: Trophy, earned: true },
    { name: "Streak Champion", description: "7-day learning streak", icon: Flame, earned: true },
    { name: "Perfect Score", description: "100% on a quiz", icon: Star, earned: true },
    { name: "Speed Learner", description: "Complete lesson in under 10 min", icon: Zap, earned: false },
  ]

  const battleChallenges = [
    { opponent: "Alex M.", subject: "Math Quiz", difficulty: "Medium", reward: "50 XP" },
    { opponent: "Sarah K.", subject: "Science Battle", difficulty: "Hard", reward: "75 XP" },
    { opponent: "Mike R.", subject: "English Challenge", difficulty: "Easy", reward: "25 XP" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">EduAI</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Student Dashboard</Badge>
            <Button variant="outline" size="sm" onClick={() => setShowAccessibilityPanel(!showAccessibilityPanel)}>
              <Settings className="mr-2 h-4 w-4" />
              Accessibility
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Accessibility Panel */}
        {showAccessibilityPanel && (
          <Card className="mb-8 border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-primary" />
                <span>Accessibility Settings</span>
              </CardTitle>
              <CardDescription>Customize your learning experience</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Languages className="h-4 w-4" />
                    <span className="text-sm font-medium">Regional Language</span>
                  </div>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Palette className="h-4 w-4" />
                    <span className="text-sm font-medium">Font Size</span>
                  </div>
                  <Slider value={fontSize} onValueChange={setFontSize} max={24} min={12} step={2} className="w-full" />
                  <p className="text-xs text-muted-foreground">Current: {fontSize[0]}px</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Palette className="h-4 w-4" />
                    <span className="text-sm font-medium">High Contrast Mode</span>
                  </div>
                  <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Text-to-Speech</span>
                  </div>
                  <Switch checked={textToSpeech} onCheckedChange={setTextToSpeech} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-medium">ISL Overlay</span>
                  </div>
                  <Switch checked={islOverlay} onCheckedChange={setIslOverlay} />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gamification Header */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Star className="h-6 w-6 text-primary" />
                    <span className="text-2xl font-bold">{xpPoints.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Total XP Points</p>
                </CardContent>
              </Card>

              <Card className="bg-secondary/10 border-secondary/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Flame className="h-6 w-6 text-secondary" />
                    <span className="text-2xl font-bold">{streakDays}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    <span className="text-2xl font-bold">Level {currentLevel}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                </CardContent>
              </Card>
            </div>

            {/* AI Mentor Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>AI Mentor</span>
                </CardTitle>
                <CardDescription>Your personal learning companion in {selectedLanguage}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                    <Brain className="h-12 w-12 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Hello! Ready for today's lesson?</h3>
                    <p className="text-muted-foreground mb-4">
                      I've prepared a personalized lesson on algebraic equations based on your progress. Let's continue
                      where we left off yesterday!
                    </p>
                    <div className="flex space-x-3">
                      <Button>
                        <Play className="mr-2 h-4 w-4" />
                        Start Lesson
                      </Button>
                      <Button variant="outline">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Review Previous
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
                <CardDescription>Track your learning journey across different subjects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {subjects.map((subject, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{subject.name}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{subject.xp} XP</Badge>
                        <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                      </div>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quiz Battle Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Quiz Battle Challenges</span>
                </CardTitle>
                <CardDescription>Challenge your classmates and earn XP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {battleChallenges.map((challenge, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{challenge.opponent}</p>
                          <p className="text-sm text-muted-foreground">{challenge.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge variant="outline" className="mb-1">
                            {challenge.difficulty}
                          </Badge>
                          <p className="text-sm text-muted-foreground">{challenge.reward}</p>
                        </div>
                        <Button size="sm">
                          Accept
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Level Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary mb-2">Level {currentLevel}</div>
                  <Progress value={75} className="mb-2" />
                  <p className="text-sm text-muted-foreground">750 / 1000 XP to Level {currentLevel + 1}</p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                    }`}
                  >
                    <achievement.icon
                      className={`h-6 w-6 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}>
                        {achievement.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.earned && <Award className="h-4 w-4 text-primary" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Play className="mr-2 h-4 w-4" />
                  Continue Learning
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Target className="mr-2 h-4 w-4" />
                  Practice Quiz
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Find Study Buddy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
