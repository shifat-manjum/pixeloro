import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PageLoader from './components/PageLoader';

const ThankYou = lazy(() => import('./pages/ThankYou'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const AuthWrapper = lazy(() => import('./components/AuthWrapper'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/thank-you" 
          element={
            <Suspense fallback={<PageLoader />}>
              <ThankYou />
            </Suspense>
          } 
        />
        <Route 
          path="/payment-success" 
          element={
            <Suspense fallback={<PageLoader />}>
              <PaymentSuccess />
            </Suspense>
          } 
        />
        <Route 
          element={
            <Suspense fallback={<PageLoader />}>
              <AuthWrapper />
            </Suspense>
          }
        >
          <Route 
            path="/login" 
            element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <Suspense fallback={<PageLoader />}>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </Suspense>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
