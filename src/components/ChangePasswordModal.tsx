import { useState } from 'react';
import { type User, updatePassword } from 'firebase/auth';
import { updateUserProfile } from '../utils/firebaseService';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Save, Check, AlertCircle } from 'lucide-react';

interface ChangePasswordModalProps {
    isOpen: boolean;
    isForced: boolean;
    onClose: () => void;
    currentUser: User;
}

export default function ChangePasswordModal({ isOpen: show, isForced, onClose, currentUser }: ChangePasswordModalProps) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // If not showing, render nothing
    if (!show) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (newPassword.length < 6) {
            setError('Паролата трябва да бъде поне 6 символа.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Паролите не съвпадат.');
            return;
        }

        setLoading(true);

        try {
            // 1. Update Password in Firebase Auth
            await updatePassword(currentUser, newPassword);

            // 2. Update Firestore profile to remove forced change flag
            if (isForced) {
                await updateUserProfile(currentUser.uid, { requiresPasswordChange: false });
            }

            setSuccess(true);
            setNewPassword('');
            setConfirmPassword('');

            // Close after a brief delay
            setTimeout(() => {
                if (onClose) onClose();
                setSuccess(false);
            }, 1500);

        } catch (err: any) {
            console.error('Error in password change flow:', err);
            let errorMessage = 'Възникна неочаквана грешка.';
            if (err.code === 'auth/requires-recent-login') {
                errorMessage = 'Моля, излезте и влезте отново, за да смените паролата си.';
            } else if (err.code === 'auth/weak-password') {
                errorMessage = 'Паролата трябва да бъде поне 6 символа.';
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-stone-100"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-stone-50 to-white px-8 py-6 border-b border-stone-100 flex justify-between items-center">
                    <h2 className="text-2xl font-serif text-stone-800 flex items-center gap-3">
                        <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
                            <Lock size={20} />
                        </div>
                        {isForced ? 'Задаване на парола' : 'Смяна на парола'}
                    </h2>
                    {!isForced && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-stone-400 hover:text-stone-600 hover:bg-stone-100 p-2 rounded-full transition-all"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <AnimatePresence mode="wait">
                        {isForced && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm border border-amber-100 flex gap-3"
                            >
                                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                <p>Моля, задайте нова сигурна парола за вашия акаунт, за да продължите.</p>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-50 text-red-700 p-4 rounded-xl text-sm border border-red-100 flex gap-3"
                            >
                                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                <p>{error}</p>
                            </motion.div>
                        )}

                        {success && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-green-50 text-green-700 p-4 rounded-xl text-sm border border-green-100 flex items-center gap-3"
                            >
                                <div className="p-1 bg-green-100 rounded-full">
                                    <Check size={14} />
                                </div>
                                <span className="font-medium">Паролата е обновена успешно!</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-stone-600 ml-1">Нова Парола</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-5 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-stone-400"
                                placeholder="Минимум 6 символа"
                                required
                                disabled={loading || success}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-stone-600 ml-1">Потвърди Парола</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-5 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-stone-400"
                                placeholder="Въведете паролата отново"
                                required
                                disabled={loading || success}
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        {!isForced && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-stone-600 hover:bg-stone-50 border border-transparent hover:border-stone-200 rounded-xl transition-all font-medium"
                                disabled={loading || success}
                            >
                                Отказ
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={loading || success}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-medium shadow-lg shadow-stone-200 transition-all transform active:scale-95 ${loading || success
                                ? 'bg-stone-400 cursor-not-allowed shadow-none'
                                : 'bg-stone-800 hover:bg-stone-700 hover:shadow-stone-300'
                                }`}
                        >
                            {loading ? 'Запазване...' : success ? 'Запазено' : 'Запази'}
                            {!loading && !success && <Save size={18} />}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
