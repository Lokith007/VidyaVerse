import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, Users, Zap, Globe, BarChart3, Gamepad2, Accessibility } from "lucide-react"
import Link from "next/link"
import { AnimatedCard } from "@/components/ui/animated-card"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground smooth-scroll">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto container-responsive py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 animate-fade-in">
            <Brain className="h-8 w-8 text-primary animate-pulse-glow" />
            <span className="text-xl font-bold">EduAI</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Link
              href="/teacher"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Teacher
            </Link>
            <Link
              href="/student"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Student
            </Link>
            <Link href="/parent" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Parent
            </Link>
            <AnimatedButton variant="outline" size="sm" shimmer>
              Sign In
            </AnimatedButton>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <AnimatedButton variant="outline" size="sm">
              Menu
            </AnimatedButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 container-responsive">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2 animate-bounce-subtle">
            AI-Powered Education Platform
          </Badge>
          <h1 className="text-responsive-xl font-bold mb-6 text-balance animate-fade-in">
            One-Click Lesson Factory:
            <span className="text-primary block mt-2 animate-fade-in" style={{ animationDelay: "300ms" }}>
              From Textbook to Classroom in Seconds
            </span>
          </h1>
          <p
            className="text-responsive-md text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty animate-slide-up"
            style={{ animationDelay: "600ms" }}
          >
            Transform any textbook into engaging lessons, worksheets, AI mentor videos, and interactive quizzes
            instantly. Built for teachers, designed for students, loved by parents.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in"
            style={{ animationDelay: "900ms" }}
          >
            <AnimatedButton size="lg" className="text-lg px-8 py-6 mobile-full" shimmer>
              <BookOpen className="mr-2 h-5 w-5" />
              Upload Textbook → Get Lessons
            </AnimatedButton>
            <AnimatedButton variant="outline" size="lg" className="text-lg px-8 py-6 mobile-full">
              Watch Demo
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-12 sm:py-16 md:py-20 container-responsive bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-responsive-lg font-bold text-center mb-12 animate-fade-in">
            Revolutionary Features for Modern Education
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* One-Click Lesson Factory */}
            <AnimatedCard className="border-2 hover:border-primary/50" delay={0}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg sm:text-xl">One-Click Lesson Factory</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Generate worksheets, story examples, AI mentor videos, ISL overlays, and quizzes from any textbook in
                  seconds.
                </CardDescription>
              </CardContent>
            </AnimatedCard>

            {/* Teacher-First Personalization */}
            <AnimatedCard className="border-2 hover:border-primary/50" delay={100}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-secondary" />
                  <CardTitle className="text-lg sm:text-xl">Teacher-First Personalization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Voice commands, blackboard-friendly diagrams, and intelligent lesson planners designed by educators.
                </CardDescription>
              </CardContent>
            </AnimatedCard>

            {/* Student-First Accessibility */}
            <AnimatedCard className="border-2 hover:border-primary/50" delay={200}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Accessibility className="h-6 w-6 text-secondary" />
                  <CardTitle className="text-lg sm:text-xl">Student-First Accessibility</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Regional language mentors, accessibility suite, and gamification to make learning inclusive and fun.
                </CardDescription>
              </CardContent>
            </AnimatedCard>

            {/* Offline-First Infrastructure */}
            <AnimatedCard className="border-2 hover:border-primary/50" delay={300}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Globe className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg sm:text-xl">Offline-First Infrastructure</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  PWA technology with Firebase caching and dynamic links ensures learning never stops, even offline.
                </CardDescription>
              </CardContent>
            </AnimatedCard>

            {/* Analytics & Impact Tracking */}
            <AnimatedCard className="border-2 hover:border-primary/50" delay={400}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-secondary" />
                  <CardTitle className="text-lg sm:text-xl">Analytics & Impact Tracking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Real-time progress tracking, curriculum gap detection, and automated parent updates with insights.
                </CardDescription>
              </CardContent>
            </AnimatedCard>

            {/* Gamified Learning */}
            <AnimatedCard className="border-2 hover:border-primary/50" delay={500}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg sm:text-xl">Gamified Learning Experience</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  XP progress bars, streak counters, and quiz battle challenges that make education engaging and
                  competitive.
                </CardDescription>
              </CardContent>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 container-responsive">
        <div className="container mx-auto text-center">
          <h2 className="text-responsive-lg font-bold mb-6 animate-fade-in">Ready to Transform Education?</h2>
          <p
            className="text-responsive-md text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            Join thousands of educators already using EduAI to create engaging, accessible, and effective learning
            experiences.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in"
            style={{ animationDelay: "400ms" }}
          >
            <AnimatedButton size="lg" className="text-lg px-8 py-6 mobile-full" shimmer>
              Start Free Trial
            </AnimatedButton>
            <AnimatedButton variant="outline" size="lg" className="text-lg px-8 py-6 mobile-full">
              Schedule Demo
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-12 container-responsive">
        <div className="container mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center space-x-2 mb-4 animate-fade-in">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">EduAI</span>
          </div>
          <p className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            Empowering education through artificial intelligence
          </p>
        </div>
      </footer>
    </div>
  )
}
