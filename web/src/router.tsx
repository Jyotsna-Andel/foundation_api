import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { NotFound } from './components/NotFound';
import { AuthorsPage } from './features/authors/AuthorsPage';
import { BooksPage } from './features/books/BooksPage';
import { CategoriesPage } from './features/categories/CategoriesPage';
import { LoansPage } from './features/loans/LoansPage';
import { MembersPage } from './features/members/MembersPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/books" replace /> },
      { path: 'books', element: <BooksPage /> },
      { path: 'loans', element: <LoansPage /> },
      { path: 'members', element: <MembersPage /> },
      { path: 'authors', element: <AuthorsPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
