import React from "react";
import { UserCircle, Star, MessageSquare, TrendingUp, Calendar, Upload, ExternalLink } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";
import { Progress } from "@/components/ui/progress";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

// Dummy data for the bar chart
const ratingDistributionData = [
  { rating: "1", value: 0 },
  { rating: "2", value: 0 },
  { rating: "3", value: 0 },
  { rating: "4", value: 5 },
  { rating: "5", value: 10 },
];

const chartConfig = {
  value: {
    label: "Ratings",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

// Dummy data for the table
const feedbacksData = [
  { id: 1, name: "vamit damor", date: "Dec 6, 2025, 12:27 AM", r: 5, ir: 0, ur: 0, comments: "No comments", link: true },
  { id: 2, name: "vamit damor", date: "Dec 6, 2025, 12:19 AM", r: 5, ir: 0, ur: 0, comments: "No comments", link: true },
  { id: 3, name: "", date: "Apr 10, 2025, 6:16 PM", r: 5, ir: 0, ur: 0, comments: "No comments", link: true },
  { id: 4, name: "", date: "Mar 24, 2025, 6:46 PM", r: 5, ir: 0, ur: 0, comments: "No comments", link: true },
  { id: 5, name: "", date: "Mar 24, 2025, 11:58 AM", r: 5, ir: 0, ur: 0, comments: "No comments", link: true },
  { id: 6, name: "patient_female_3", date: "Feb 26, 2025, 10:44 AM", r: 5, ir: 5, ur: 5, comments: "No comments", link: true },
  { id: 7, name: "regenrate", date: "Feb 15, 2025, 5:11 PM", r: 4, ir: 5, ur: 5, comments: "No comments", link: true },
  { id: 8, name: "regenrate", date: "Feb 15, 2025, 5:09 PM", r: 4, ir: 4, ur: 3, comments: "Cool Man", link: true },
  { id: 9, name: "Reject Test", date: "Jan 29, 2025, 4:13 PM", r: 5, ir: 4, ur: 3, comments: "helpfull", link: true },
  { id: 10, name: "Reject Test", date: "Feb 13, 2025, 11:53 AM", r: 4, ir: 5, ur: 5, comments: "No comments", link: true },
  { id: 11, name: "TEST", date: "Feb 5, 2025, 6:32 PM", r: 5, ir: 3, ur: 5, comments: "ok test", link: true },
  { id: 12, name: "TEST", date: "Feb 5, 2025, 9:54 PM", r: 5, ir: 4, ur: 5, comments: "additional from main branchs", link: true },
  { id: 13, name: "TEST", date: "Feb 5, 2025, 6:53 PM", r: 5, ir: 3, ur: 3, comments: "No comments", link: true },
  { id: 14, name: "test-new-response", date: "Dec 2, 2024, 9:18 PM", r: 4, ir: 4, ur: 4, comments: "GA merge test", link: true },
];

function RatingStars({ rating, outOf = 5 }: { rating: number, outOf?: number }) {
  if (rating === 0) {
    return <span className="italic text-muted-foreground text-sm">Not rated</span>;
  }
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: outOf }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-blue-600 text-blue-600" : "fill-muted text-muted"}`}
        />
      ))}
    </div>
  );
}

function RatingBarCard({ title, min, max, average, averageText, progress }: { title: string, min: number, max: number, average: number, averageText: string, progress: number }) {
  return (
    <Card className="border p-4 gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex justify-between items-center text-sm">
          <div className="space-y-1">
            <span className="text-muted-foreground">Min</span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={`min-${i}`}
                  className={`h-4 w-4 ${i < min ? "fill-blue-600 text-blue-600" : "fill-muted text-muted"}`}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-muted-foreground">Max</span>
            <div className="flex items-center gap-0.5 justify-end">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={`max-${i}`}
                  className={`h-4 w-4 ${i < max ? "fill-blue-600 text-blue-600" : "fill-muted text-muted"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Average</div>
          <div className="flex items-center gap-3">
            <Progress value={progress} className="h-2.5 bg-muted [&>div]:bg-blue-600" />
            <span className="text-sm font-medium whitespace-nowrap text-muted-foreground">
              <span className="text-foreground">{averageText}</span>/5
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ title, value, icon: Icon, wrapperClass = "", iconProps = {} }: any) {
  return (
    <Card className="p-4 border">
      <CardContent className="p-0 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`h-10 w-10 shrink-0 flex items-center justify-center ${wrapperClass}`}>
          <Icon className="h-6 w-6" strokeWidth={1.5} {...iconProps} />
        </div>
      </CardContent>
    </Card>
  );
}

const statsData = [
  { title: "Total Feedback", value: "15", icon: UserCircle, wrapperClass: "text-blue-600" },
  { title: "Average Rating", value: "4.67", icon: (props: any) => <Star className="h-6 w-6 fill-blue-600" {...props} />, wrapperClass: "text-blue-600" },
  { title: "Total Comments", value: "6", icon: MessageSquare, wrapperClass: "text-blue-600" },
  { title: "Positive Ratings", value: "15", icon: TrendingUp, wrapperClass: "bg-blue-600 text-white rounded-full", iconProps: { strokeWidth: 2 } }
];

export function OrganisationFeedback() {
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Feedback</h2>
          <p className="text-sm text-muted-foreground">
            Analyze user feedback to improve video content and user experience.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2">
          <Button variant="outline" className="text-blue-600 border-blue-200 bg-white hover:bg-blue-50 w-full sm:w-auto">
            Select Project
          </Button>
          <div className="flex items-center border rounded-md bg-white overflow-hidden h-9 w-full sm:w-auto">
            <Button variant="ghost" className="flex-1 sm:flex-none h-full rounded-none border-r px-2 sm:px-3 text-muted-foreground font-normal hover:bg-muted/50 text-xs sm:text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
              <span className="truncate">Jul 1, 2024 - Jul 8, 2026</span>
            </Button>
            <Button variant="ghost" className="flex-1 sm:flex-none h-full rounded-none px-2 sm:px-3 font-normal hover:bg-muted/50 text-muted-foreground text-xs sm:text-sm whitespace-nowrap">
              Select range
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Ratings details section */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Left column: 3 rating cards */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <RatingBarCard 
            title="Overall Rating" 
            min={4} 
            max={5} 
            average={4.7} 
            averageText="4.7" 
            progress={94} 
          />
          <RatingBarCard 
            title="Informative Rating" 
            min={3} 
            max={5} 
            average={4.2} 
            averageText="4.2" 
            progress={84} 
          />
          <RatingBarCard 
            title="Useful Rating" 
            min={3} 
            max={5} 
            average={4.1} 
            averageText="4.1" 
            progress={82} 
          />
        </div>

        {/* Right column: Chart card */}
        <Card className="lg:col-span-3 border h-full flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px] flex flex-col justify-end pt-8">
            <ChartContainer config={chartConfig} className="w-full h-full aspect-auto bg-white">
              <BarChart accessibilityLayer data={ratingDistributionData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
                <XAxis
                  dataKey="rating"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  ticks={[0, 3, 6, 9, 12]}
                  domain={[0, 12]}
                />
                <ChartTooltip
                  cursor={{ fill: "transparent" }}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="value" fill="var(--color-value)" radius={[2, 2, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Feedbacks Table */}
      <Card className="w-full border shadow-none rounded-lg overflow-hidden p-0 bg-card">
        <CardContent className="p-0">
          <div className="p-4 border-b flex flex-col lg:flex-row items-start lg:items-center justify-between bg-white gap-4">
            <CardTitle className="text-base font-semibold">Feedbacks</CardTitle>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Select defaultValue="all-assignees">
              <SelectTrigger className="w-full sm:w-[140px] h-9 text-sm text-muted-foreground bg-white">
                <SelectValue placeholder="All Assignees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-assignees">All Assignees</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-ratings">
              <SelectTrigger className="w-full sm:w-[140px] h-9 text-sm text-muted-foreground bg-white">
                <SelectValue placeholder="All ratings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-ratings">All ratings</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center justify-between sm:justify-start space-x-2 bg-muted/30 px-3 py-1.5 rounded-md border w-full sm:w-auto">
              <label
                htmlFor="comments-only"
                className="text-sm text-muted-foreground cursor-pointer italic pr-1 whitespace-nowrap"
              >
                Comments Only
              </label>
              <Switch id="comments-only" className="data-[state=checked]:bg-blue-600" />
            </div>

            <Button className="h-9 bg-blue-600 hover:bg-blue-700 text-white gap-2 w-full sm:w-auto">
              <Upload className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px] text-xs font-semibold py-3 pl-6">VIDEO NAME</TableHead>
                <TableHead className="text-xs font-semibold py-3">FEEDBACK AT</TableHead>
                <TableHead className="text-xs font-semibold py-3">RATING</TableHead>
                <TableHead className="text-xs font-semibold py-3">INFORMATIVE RATING</TableHead>
                <TableHead className="text-xs font-semibold py-3">USEFUL RATING</TableHead>
                <TableHead className="text-xs font-semibold py-3">COMMENTS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacksData.map((row, index) => (
                <TableRow key={`${row.id}-${index}`} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted bg-white">
                  <TableCell className="py-3 pl-6">
                    <div className="flex items-center gap-1.5 font-medium">
                      {row.name || 'Unnamed'}
                      {row.link && (
                        <ExternalLink className="h-3.5 w-3.5 opacity-70 text-primary" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-sm text-foreground">{row.date}</TableCell>
                  <TableCell className="py-3">
                    <RatingStars rating={row.r} />
                  </TableCell>
                  <TableCell className="py-3">
                    <RatingStars rating={row.ir} />
                  </TableCell>
                  <TableCell className="py-3">
                    <RatingStars rating={row.ur} />
                  </TableCell>
                  <TableCell className="py-3 text-sm">
                    <span className={row.comments === "No comments" ? "italic text-muted-foreground" : "text-foreground font-medium"}>
                      {row.comments}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination Footer */}
        <TablePagination 
          currentPage={1}
          pageSize={14}
          totalItems={14}
          entityName="feedbacks"
          className="border-t bg-white"
        />
        </CardContent>
      </Card>
    </div>
  );
}
