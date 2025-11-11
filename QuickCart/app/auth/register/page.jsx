import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Crear Cuenta - SARCO´S',
  description: 'Crea tu cuenta en SARCO´S'
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 px-4 py-12">
      <RegisterForm />
    </div>
  );
}