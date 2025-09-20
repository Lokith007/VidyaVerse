"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import {
  Upload,
  FileText,
  Video,
  HelpCircle,
  CalendarIcon,
  Brain,
  BookOpen,
  Users,
  BarChart3,
  Download,
  Play,
  Edit,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function TeacherDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const weeklyActivities = [
    { day: "Monday", activity: "Chapter 1: Introduction to Algebra", type: "lesson", status: "completed" },
    { day: "Tuesday", activity: "Worksheet: Basic Equations", type: "worksheet", status: "in-progress" },
    { day: "Wednesday", activity: "AI Mentor: Problem Solving", type: "video", status: "scheduled" },
    { day: "Thursday", activity: "Quiz: Algebraic Expressions", type: "quiz", status: "scheduled" },
    { day: "Friday", activity: "Review Session", type: "lesson", status: "scheduled" },
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
            <Badge variant="secondary">Teacher Dashboard</Badge>
            <Button variant="outline" size="sm">
              <Users className="mr-2 h-4 w-4" />
              My Classes
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Teacher!</h1>
          <p className="text-muted-foreground">Transform your textbooks into engaging lessons with AI</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <span>Upload Textbook</span>
                </CardTitle>
                <CardDescription>Drag and drop your PDF textbook or click to browse files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Drop your textbook here</p>
                  <p className="text-muted-foreground mb-4">Supports PDF, DOCX, and image files up to 50MB</p>
                  <Button onClick={handleFileUpload} disabled={isUploading}>
                    {isUploading ? "Processing..." : "Browse Files"}
                  </Button>
                  {isUploading && (
                    <div className="mt-4">
                      <Progress value={uploadProgress} className="w-full" />
                      <p className="text-sm text-muted-foreground mt-2">{uploadProgress}% uploaded</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Content Generation Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>AI-generated materials from your uploaded textbooks</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="worksheets" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="worksheets" className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>Worksheets</span>
                    </TabsTrigger>
                    <TabsTrigger value="videos" className="flex items-center space-x-2">
                      <Video className="h-4 w-4" />
                      <span>AI Videos</span>
                    </TabsTrigger>
                    <TabsTrigger value="quizzes" className="flex items-center space-x-2">
                      <HelpCircle className="h-4 w-4" />
                      <span>Quizzes</span>
                    </TabsTrigger>
                    <TabsTrigger value="planner" className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Planner</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="worksheets" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">Worksheet {i}</CardTitle>
                              <Badge variant="secondary">Ready</Badge>
                            </div>
                            <CardDescription>Chapter {i}: Basic Concepts</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="videos" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {[1, 2, 3].map((i) => (
                        <Card key={i} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">AI Mentor Video {i}</CardTitle>
                              <Badge variant="secondary">Generated</Badge>
                            </div>
                            <CardDescription>Interactive explanation with ISL overlay</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-muted rounded-lg h-32 flex items-center justify-center mb-4">
                              <Play className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm">
                                <Play className="mr-2 h-4 w-4" />
                                Preview
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="quizzes" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">Quiz {i}</CardTitle>
                              <Badge variant="secondary">{5 + i} Questions</Badge>
                            </div>
                            <CardDescription>Auto-generated from Chapter {i}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex space-x-2">
                              <Button size="sm">
                                <Play className="mr-2 h-4 w-4" />
                                Preview
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="mr-2 h-4 w-4" />
                                Customize
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="planner" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Weekly Lesson Plan</h3>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Activity
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {weeklyActivities.map((activity, i) => (
                          <Card key={i} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <div>
                                  <p className="font-medium">{activity.day}</p>
                                  <p className="text-sm text-muted-foreground">{activity.activity}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant={activity.status === "completed" ? "default" : "secondary"}
                                  className="capitalize"
                                >
                                  {activity.status}
                                </Badge>
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Textbooks Uploaded</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Worksheets Generated</span>
                  <span className="font-semibold">48</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI Videos Created</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Students</span>
                  <span className="font-semibold">156</span>
                </div>
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Create New Lesson
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Students
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
