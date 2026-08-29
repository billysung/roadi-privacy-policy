import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import LitePolicy from "@/pages/LitePolicy";
import RoadiPremiumPolicy from "@/pages/RoadiPremiumPolicy";


function Router() {
  const siteBase = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <Switch>
      <Route path={`${siteBase}/`} component={() => <RoadiPremiumPolicy language="zh" />} />
      <Route path={`${siteBase}/en`} component={() => <RoadiPremiumPolicy language="en" />} />
      <Route path={`${siteBase}/en/`} component={() => <RoadiPremiumPolicy language="en" />} />
      <Route path={`${siteBase}/vi`} component={() => <RoadiPremiumPolicy language="vi" />} />
      <Route path={`${siteBase}/vi/`} component={() => <RoadiPremiumPolicy language="vi" />} />
      <Route path={`${siteBase}/th`} component={() => <RoadiPremiumPolicy language="th" />} />
      <Route path={`${siteBase}/th/`} component={() => <RoadiPremiumPolicy language="th" />} />
      <Route path={`${siteBase}/ms`} component={() => <RoadiPremiumPolicy language="ms" />} />
      <Route path={`${siteBase}/ms/`} component={() => <RoadiPremiumPolicy language="ms" />} />
      <Route path={`${siteBase}/id`} component={() => <RoadiPremiumPolicy language="id" />} />
      <Route path={`${siteBase}/id/`} component={() => <RoadiPremiumPolicy language="id" />} />
      <Route path={`${siteBase}/lite/`} component={() => <LitePolicy language="zh" />} />
      <Route path={`${siteBase}/lite/en`} component={() => <LitePolicy language="en" />} />
      <Route path={`${siteBase}/lite/en/`} component={() => <LitePolicy language="en" />} />
      <Route path={`${siteBase}/lite/vi`} component={() => <LitePolicy language="vi" />} />
      <Route path={`${siteBase}/lite/vi/`} component={() => <LitePolicy language="vi" />} />
      <Route path={`${siteBase}/lite/th`} component={() => <LitePolicy language="th" />} />
      <Route path={`${siteBase}/lite/th/`} component={() => <LitePolicy language="th" />} />
      <Route path={`${siteBase}/lite/ms`} component={() => <LitePolicy language="ms" />} />
      <Route path={`${siteBase}/lite/ms/`} component={() => <LitePolicy language="ms" />} />
      <Route path={`${siteBase}/lite/id`} component={() => <LitePolicy language="id" />} />
      <Route path={`${siteBase}/lite/id/`} component={() => <LitePolicy language="id" />} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
