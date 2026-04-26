'use client';

import { ChangeEvent, type FormEvent, JSX, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeOff, Eye, ShoppingCart, Store } from 'lucide-react';
import { login } from '@/app/services/auth';

export default function LoginPage(): JSX.Element {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await login({ username, password });

            document.cookie = data.access_token;
            document.cookie = JSON.stringify(data.user);

            if (data.user.role === 'SUPER_ADMIN') {
                router.push('/admin');
            } else {
                router.push('/cashier');
            }
        } catch (err: Error | unknown) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#1D4ED8]"></div>
            <div className="relative z-10 w-full max-w-105 p-6">
                <div className="bg-white rounded-2xl p-10 shadow-[0_24px_64px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center gap-3 mb-7">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                            <Store size={32} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[18px] font-bold text-gray-900">
                                TuPos
                            </span>
                            <span className="text-[11px] text-gray-500">
                                Sistema de Gestión ERP
                            </span>
                        </div>
                    </div>

                    <h2 className="text-[20px] font-bold text-gray-900 mb-1">
                        Iniciar Sesión
                    </h2>
                    <p className="text-[13px] text-gray-500 mb-6">
                        Ingresa tus credenciales para continuar
                    </p>

                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-1.25">
                            <label
                                htmlFor="usuario"
                                className="text-[12px] font-semibold text-gray-700"
                            >
                                Usuario
                            </label>
                            <input
                                id="usuario"
                                className="px-3 py-2 border border-gray-200 rounded-md text-[13px] text-gray-800 bg-white outline-none transition-all duration-150 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
                                type="text"
                                value={username}
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>,
                                ): void => setUsername(e.target.value)}
                                placeholder="Usuario"
                                autoComplete="username"
                            />
                        </div>

                        <div className="flex flex-col gap-1.25">
                            <label
                                htmlFor="password"
                                className="text-[12px] font-semibold text-gray-700"
                            >
                                Contraseña
                            </label>
                            <div className="relative flex">
                                <input
                                    id="password"
                                    className="w-full pr-9 px-3 py-2 border border-gray-200 rounded-md text-[13px] text-gray-800 bg-white outline-none transition-all duration-150 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ): void => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 p-1 rounded hover:text-gray-600"
                                    onClick={(): void =>
                                        setShowPassword(!showPassword)
                                    }
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="px-3 py-2.5 bg-red-50 border border-red-200 rounded-md text-red-600 text-[13px]">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!username || !password}
                            className="w-full cursor-pointer inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-blue-600 text-white rounded-md text-[14px] font-semibold transition-all duration-150 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Ingresando...
                                </span>
                            ) : (
                                <>
                                    <ShoppingCart size={16} />
                                    Ingresar
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-[11px] text-gray-400 mt-6">
                        Sistema autorizado por el SII · Chile
                    </p>
                </div>
            </div>
        </div>
    );
}
