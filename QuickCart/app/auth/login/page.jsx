import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Iniciar Sesión - SARCO´S',
  description: 'Inicia sesión en tu cuenta de SARCO´S'
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <LoginForm />
    </div>
  );
}