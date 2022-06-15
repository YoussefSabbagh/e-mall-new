import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/auth';

import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { AdminHome } from './pages/adminHome';
import { InvoiceAdmin } from './pages/adminHome/InvoiceAdmin';
import { PaymentsConfirm } from './pages/adminHome/PaymentsConfirm';
import { ExchangeRates } from './pages/adminHome/ExchangeRates';
import { UsersHome } from './pages/usersHome';
import { UserInvoicesPending } from './pages/usersHome/InvoicesPending';
import { UserBalance } from './pages/usersHome/Balance';

import { Header } from './components/header';
import { Sidebar } from './components/sidebar';
import { Footer } from './components/footer';
import { NoMatch } from './components/NoMatch';

const LazyAbout = React.lazy(() => import('./components/About'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Sidebar>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/invoicetoconfirm" element={<InvoiceAdmin />} />
            <Route path="/admin/payments" element={<PaymentsConfirm />} />
            <Route path="/admin/exchangeRate" element={<ExchangeRates />} />
            <Route path="/user" element={<UsersHome />} />
            <Route
              path="/user/invoicepending"
              element={<UserInvoicesPending />}
            />
            <Route path="/user/balance" element={<UserBalance />} />
            <Route
              path="about"
              element={
                <React.Suspense fallback="Loading...">
                  <LazyAbout />
                </React.Suspense>
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Sidebar>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
