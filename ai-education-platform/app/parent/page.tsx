"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Award,
  Calendar,
  Download,
  Mail,
  Volume2,
  Pause,
} from "lucide-react"
import Link from "next/link"

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState("emma")
  const [timeRange, setTimeRange] = useState("week")
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const children = [
    { id: "emma", name: "Emma Johnson", grade: "Grade 8", avatar: "EJ" },
    { id: "alex", name: "Alex Johnson", grade: "Grade 6", avatar: "AJ" },
  ]

  const progressData = [
    { day: "Mon", math: 85, science: 78, english: 92, history: 70 },
    { day: "Tue", math: 88, science: 82, english: 89, history: 75 },
    { day: "Wed", math: 92, science: 85, english: 94, history: 78 },
    { day: "Thu", math: 87, science: 88, english: 91, history: 82 },
    { day: "Fri", math: 90, science: 90, english: 96, history: 85 },
    { day: "Sat", math: 93, science: 87, english: 98, history: 88 },
    { day: "Sun", math: 89, science: 92, english: 95, history: 90 },
  ]

  const subjectPerformance = [
    { subject: "Mathematics", current: 89, target: 95, gap: -6, color: "#ff6f20" },
    { subject: "Science", current: 87, target: 90, gap: -3, color: "#c5a3e0" },
    { subject: "English", current: 94, target: 92, gap: 2, color: "#ff6f20" },
    { subject: "History", current: 83, target: 88, gap: -5, color: "#c5a3e0" },
  ]

  const weeklyActivity = [
    { day: "Mon", hours: 2.5, completed: 4, total: 5 },
    { day: "Tue", hours: 3.2, completed: 5, total: 5 },
    { day: "Wed", hours: 1.8, completed: 3, total: 4 },
    { day: "Thu", hours: 2.9, completed: 4, total: 4 },
    { day: "Fri", hours: 3.5, completed: 6, total: 6 },
    { day: "Sat", hours: 4.1, completed: 5, total: 5 },
    { day: "Sun", hours: 2.2, completed: 3, total: 4 },
  ]

  const curriculumGaps = [
    {
      subject: "Mathematics",
      topic: "Quadratic Equations",
      severity: "high",
      recommendation: "Additional practice with factoring methods",
      progress: 45,
    },
    {
      subject: "Science",
      topic: "Chemical Bonding",
      severity: "medium",
      recommendation: "Review molecular structure concepts",
      progress: 68,
    },
    {
      subject: "History",
      topic: "World War II Timeline",
      severity: "low",
      recommendation: "Timeline visualization exercises",
      progress: 78,
    },
  ]

  const achievements = [
    { title: "Math Streak Champion", date: "2 days ago", type: "streak" },
    { title: "Perfect Quiz Score", date: "1 week ago", type: "achievement" },
    { title: "Study Goal Completed", date: "3 days ago", type: "goal" },
  ]

  const toggleAudioSummary = () => {
    setIsPlayingAudio(!isPlayingAudio)
  }

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
            <Badge variant="secondary">Parent Dashboard</Badge>
            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.name} - {child.grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{children.find((c) => c.id === selectedChild)?.name}'s Progress</h1>
          <p className="text-muted-foreground">Track your child's learning journey and achievements</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Progress</p>
                  <p className="text-2xl font-bold text-primary">87%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">+5% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Study Hours</p>
                  <p className="text-2xl font-bold text-secondary">22.2h</p>
                </div>
                <Clock className="h-8 w-8 text-secondary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Lessons Completed</p>
                  <p className="text-2xl font-bold text-primary">30</p>
                </div>
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Out of 33 assigned</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold text-secondary">12 days</p>
                </div>
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Personal best!</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Charts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Academic Performance</CardTitle>
                    <CardDescription>Subject-wise progress over time</CardDescription>
                  </div>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="math" stroke="#ff6f20" strokeWidth={2} />
                    <Line type="monotone" dataKey="science" stroke="#c5a3e0" strokeWidth={2} />
                    <Line type="monotone" dataKey="english" stroke="#ff6f20" strokeWidth={2} strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="history" stroke="#c5a3e0" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Curriculum Gap Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Curriculum Gap Detection</span>
                </CardTitle>
                <CardDescription>AI-identified areas needing attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {curriculumGaps.map((gap, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle
                            className={`h-5 w-5 ${
                              gap.severity === "high"
                                ? "text-destructive"
                                : gap.severity === "medium"
                                  ? "text-primary"
                                  : "text-secondary"
                            }`}
                          />
                          <div>
                            <p className="font-medium">
                              {gap.subject}: {gap.topic}
                            </p>
                            <p className="text-sm text-muted-foreground">{gap.recommendation}</p>
                          </div>
                        </div>
                        <Badge variant={gap.severity === "high" ? "destructive" : "secondary"} className="capitalize">
                          {gap.severity}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={gap.progress} className="flex-1" />
                        <span className="text-sm text-muted-foreground">{gap.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity Overview</CardTitle>
                <CardDescription>Study hours and lesson completion</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#ff6f20" name="Study Hours" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Auto-Generated Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Summary</CardTitle>
                <CardDescription>AI-generated insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm mb-3">
                    Emma had an excellent week with consistent performance across all subjects. She excelled in English
                    and showed improvement in History. Math requires some additional attention on quadratic equations.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={toggleAudioSummary}>
                      {isPlayingAudio ? <Pause className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
                      {isPlayingAudio ? "Pause" : "Listen"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subject Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjectPerformance.map((subject, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{subject.subject}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{subject.current}%</span>
                        {subject.gap > 0 ? (
                          <TrendingUp className="h-4 w-4 text-primary" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                    </div>
                    <Progress value={subject.current} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Target: {subject.target}% ({subject.gap > 0 ? "+" : ""}
                      {subject.gap}%)
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                    <Award className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
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
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Teacher
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
