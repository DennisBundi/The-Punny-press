import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';

import PublicLayout from '@/components/layout/PublicLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import AuthGuard from '@/components/layout/AuthGuard';
import Spinner from '@/components/ui/Spinner';
import PWAInstallBanner from '@/components/shared/PWAInstallBanner';

// Lazy-load all routes for code splitting
const Home = lazy(() => import('@/routes/Home'));
const Products = lazy(() => import('@/routes/Products'));
const ProductDetail = lazy(() => import('@/routes/ProductDetail'));
const About = lazy(() => import('@/routes/About'));
const Contact = lazy(() => import('@/routes/Contact'));
const Terms = lazy(() => import('@/routes/Terms'));
const Privacy = lazy(() => import('@/routes/Privacy'));
const NotFound = lazy(() => import('@/routes/NotFound'));

const Login = lazy(() => import('@/routes/admin/Login'));
const Dashboard = lazy(() => import('@/routes/admin/Dashboard'));
const ProductList = lazy(() => import('@/routes/admin/ProductList'));
const ProductForm = lazy(() => import('@/routes/admin/ProductForm'));
const CategoryList = lazy(() => import('@/routes/admin/CategoryList'));
const CategoryForm = lazy(() => import('@/routes/admin/CategoryForm'));
const Settings = lazy(() => import('@/routes/admin/Settings'));

function RouteFallback() {
  return <Spinner className="py-20" />;
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <SettingsProvider>
          <BrowserRouter>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                {/* Public routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:slug" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                </Route>

                {/* Admin routes */}
                <Route path="/admin/login" element={<Login />} />
                <Route element={<AuthGuard><AdminLayout /></AuthGuard>}>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/products" element={<ProductList />} />
                  <Route path="/admin/products/new" element={<ProductForm />} />
                  <Route path="/admin/products/:id" element={<ProductForm />} />
                  <Route path="/admin/categories" element={<CategoryList />} />
                  <Route path="/admin/categories/new" element={<CategoryForm />} />
                  <Route path="/admin/categories/:id" element={<CategoryForm />} />
                  <Route path="/admin/settings" element={<Settings />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster position="top-right" richColors />
          <PWAInstallBanner />
        </SettingsProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
