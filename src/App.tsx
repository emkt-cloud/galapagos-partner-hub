import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import PortalLayout from "./layouts/PortalLayout";
import Dashboard from "./pages/Dashboard";
import Reservas from "./pages/Reservas";
import Disponibilidad from "./pages/Disponibilidad";
import Holds from "./pages/Holds";
import Confirmadas from "./pages/Confirmadas";
import Recursos from "./pages/Recursos";
import Millas from "./pages/Millas";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route element={<PortalLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/disponibilidad" element={<Disponibilidad />} />
            <Route path="/holds" element={<Holds />} />
            <Route path="/confirmadas" element={<Confirmadas />} />
            <Route path="/recursos" element={<Recursos />} />
            <Route path="/millas" element={<Millas />} />
            <Route path="/flota" element={<Placeholder title="Fleet & Itineraries" />} />
            <Route path="/hotel" element={<Placeholder title="GO Quito Hotel" />} />
            <Route path="/paquetes" element={<Placeholder title="Products & Services" />} />
            <Route path="/tarifas" element={<Placeholder title="Rates & Promotions" />} />
            <Route path="/reportes" element={<Placeholder title="Reports" />} />
            <Route path="/soporte" element={<Placeholder title="Support" />} />
            <Route path="/perfil" element={<Placeholder title="My Profile" />} />
          </Route>
          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
