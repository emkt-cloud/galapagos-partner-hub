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
import RecursosHub from "./pages/recursos/RecursosHub";
import Gallery from "./pages/recursos/Gallery";
import ProductsList from "./pages/recursos/ProductsList";
import ProductDetail from "./pages/recursos/ProductDetail";
import ServicesList from "./pages/recursos/ServicesList";
import BestSellers from "./pages/recursos/BestSellers";
import MainlandTours from "./pages/recursos/MainlandTours";
import TourDetail from "./pages/recursos/TourDetail";
import Millas from "./pages/Millas";
import Flota from "./pages/Flota";
import Hotel from "./pages/Hotel";
import Paquetes from "./pages/Paquetes";
import Tarifas from "./pages/Tarifas";
import Reportes from "./pages/Reportes";
import Soporte from "./pages/Soporte";
import Perfil from "./pages/Perfil";
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
            <Route path="/recursos" element={<RecursosHub />} />
            <Route path="/recursos/gallery" element={<Gallery />} />
            <Route path="/recursos/products" element={<ProductsList />} />
            <Route path="/recursos/products/:slug" element={<ProductDetail />} />
            <Route path="/recursos/services" element={<ServicesList />} />
            <Route path="/recursos/services/best-sellers" element={<BestSellers />} />
            <Route path="/recursos/services/mainland" element={<MainlandTours />} />
            <Route path="/recursos/services/:slug" element={<TourDetail />} />
            <Route path="/millas" element={<Millas />} />
            <Route path="/flota" element={<Flota />} />
            <Route path="/hotel" element={<Hotel />} />
            <Route path="/paquetes" element={<Paquetes />} />
            <Route path="/tarifas" element={<Tarifas />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/soporte" element={<Soporte />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>
          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
