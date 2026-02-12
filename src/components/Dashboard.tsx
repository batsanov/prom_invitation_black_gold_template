import { useState, useEffect } from 'react';
import { subscribeToRSVPs, type RSVPRecord, getUserProfile } from '../utils/firebaseService';
import { auth, isDevMode } from '../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { Users, CheckCircle, XCircle, LogOut, MessageSquare, Lock, Calendar, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import ChangePasswordModal from './ChangePasswordModal';
import GuestListModal from './GuestListModal';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);
  const [filteredRsvps, setFilteredRsvps] = useState<RSVPRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [forcePasswordChange, setForcePasswordChange] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showGuestList, setShowGuestList] = useState(false);

  // In dev mode, skip authentication entirely
  const isAuthenticated = isDevMode || !!user;

  useEffect(() => {
    if (isDevMode) {
      setAuthLoading(false);
      return;
    }

    if (!auth) {
      setAuthLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Check if force password change is needed
  useEffect(() => {
    const checkUserRequirement = async () => {
      if (user) {
        const profile = await getUserProfile(user);
        if (profile?.requiresPasswordChange) {
          setForcePasswordChange(true);
          setShowPasswordModal(true);
        }
      }
    };

    checkUserRequirement();
  }, [user]);

  // Subscribe to real-time updates when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    setError(null);
    setLoading(true);

    const unsubscribe = subscribeToRSVPs(
      (data) => {
        setRsvps(data);
        setFilteredRsvps(data);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        const errorMsg = (err as any).message || (err as any).code || 'Unknown error';
        console.error('Failed to subscribe to RSVPs:', err);
        setError(`Няма достъп до RSVP данните. Грешка: ${errorMsg}. Проверете конзолата за повече детайли.`);
      }
    );

    return () => unsubscribe();
  }, [isAuthenticated]);

  // Filter logic
  useEffect(() => {
    if (!searchTerm) {
      setFilteredRsvps(rsvps);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredRsvps(
        rsvps.filter(
          (r) =>
            r.guestName.toLowerCase().includes(lower) ||
            r.message?.toLowerCase().includes(lower) ||
            (r.guestNames && r.guestNames.some(g => g.toLowerCase().includes(lower)))
        )
      );
    }
  }, [searchTerm, rsvps]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!auth) {
      setError('Firebase is not configured.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setPassword('');
    } catch (err: any) {
      console.error('Admin sign-in failed:', err);
      setError('Невалиден имейл или парола.');
    }
  };

  const handleLogout = async () => {
    if (auth) await signOut(auth);
    setEmail('');
    setPassword('');
    setRsvps([]);
    setError(null);
  };

  const stats = {
    totalResponses: rsvps.length,
    attending: rsvps.filter(r => r.attending === 'yes').length,
    notAttending: rsvps.filter(r => r.attending === 'no').length,
    totalGuests: rsvps.reduce((acc, curr) => acc + (curr.attending === 'yes' ? curr.guestsCount : 0), 0)
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-stone-300 border-t-stone-800 rounded-full animate-spin"></div>
          <div className="text-stone-500 font-medium">Зареждане...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-900/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-900/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl shadow-stone-200/50 w-full max-w-md border border-white"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-stone-800 mb-2">Административен панел</h1>
            <p className="text-stone-500 text-sm">Влезте, за да управлявате потвържденията</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-stone-600 ml-1">Имейл</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 bg-white/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-transparent outline-none transition-all placeholder:text-stone-400"
                placeholder="admin@email.com"
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-stone-600 ml-1">Парола</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 bg-white/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-transparent outline-none transition-all placeholder:text-stone-400"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border border-red-100 flex items-center gap-2"
              >
                <XCircle size={16} />
                {error}
              </motion.div>
            )}
            <button
              type="submit"
              className="w-full bg-stone-800 text-white py-3.5 rounded-xl hover:bg-stone-700 hover:shadow-lg transition-all transform active:scale-[0.98] font-medium text-base mt-2"
            >
              Вход
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-stone-800 font-sans pb-20">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-100 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center text-white font-serif text-xl shadow-lg shadow-stone-200">
              P
            </div>
            <div>
              <h1 className="text-lg font-bold text-stone-800 leading-tight">Prom Dashboard</h1>
              <p className="text-xs text-stone-500 font-medium">Администрация</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="p-2.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-all hidden md:flex items-center gap-2 text-sm font-medium"
            >
              <Lock size={18} />
              Смяна на парола
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all flex items-center gap-2 text-sm font-medium"
            >
              <LogOut size={18} />
              <span className="hidden md:inline">Изход</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-2xl flex items-start gap-3 shadow-sm"
          >
            <XCircle className="shrink-0 mt-0.5" size={20} />
            <p>{error}</p>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setShowGuestList(true)}
            className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users size={80} className="text-stone-900" />
            </div>
            <p className="text-stone-500 text-sm font-medium mb-1">Общо Гости</p>
            <h3 className="text-4xl font-bold text-stone-800">{stats.totalGuests}</h3>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-800 bg-stone-100 px-3 py-1.5 rounded-lg group-hover:bg-stone-800 group-hover:text-white transition-colors">
                <Users size={14} /> Виж целия списък като натиснеш тук
              </div>
              <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-stone-100 group-hover:text-stone-800 transition-colors">
                <Users size={16} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 relative overflow-hidden group hover:shadow-md transition-all"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <MessageSquare size={80} className="text-blue-600" />
            </div>
            <p className="text-stone-500 text-sm font-medium mb-1">Отговори</p>
            <h3 className="text-4xl font-bold text-stone-800">{stats.totalResponses}</h3>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 w-fit px-2 py-1 rounded-lg">
              <MessageSquare size={14} /> Получени формуляри
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 relative overflow-hidden group hover:shadow-md transition-all"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle size={80} className="text-green-600" />
            </div>
            <p className="text-stone-500 text-sm font-medium mb-1">Присъстващи</p>
            <h3 className="text-4xl font-bold text-green-600">{stats.attending}</h3>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-green-700 bg-green-50 w-fit px-2 py-1 rounded-lg">
              <CheckCircle size={14} /> Потвърдили присъствие
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 relative overflow-hidden group hover:shadow-md transition-all"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <XCircle size={80} className="text-red-600" />
            </div>
            <p className="text-stone-500 text-sm font-medium mb-1">Отказали</p>
            <h3 className="text-4xl font-bold text-red-600">{stats.notAttending}</h3>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-red-700 bg-red-50 w-fit px-2 py-1 rounded-lg">
              <XCircle size={14} /> Няма да присъстват
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden flex flex-col"
        >
          {/* Toolbar */}
          <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-stone-800">Последна активност</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="text"
                placeholder="Търсене на гост..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-stone-800 focus:bg-white focus:border-transparent outline-none transition-all w-full md:w-64"
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-stone-50/50 text-stone-500 text-xs uppercase tracking-wider font-semibold">
                  <th className="px-6 py-4">Име на Гост</th>
                  <th className="px-6 py-4">Статус</th>
                  <th className="px-6 py-4 text-center">Брой</th>
                  <th className="px-6 py-4">Други Гости</th>
                  <th className="px-6 py-4">Съобщение</th>
                  <th className="px-6 py-4 text-right">Дата</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredRsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="transition-colors">
                    <td className="px-6 py-4 font-semibold text-stone-800">{rsvp.guestName}</td>
                    <td className="px-6 py-4">
                      {rsvp.attending === 'yes' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                          Ще присъства
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                          Няма да присъства
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {rsvp.attending === 'yes' ? (
                        <span className="bg-stone-100 text-stone-700 font-bold px-2 py-1 rounded-lg text-sm">{rsvp.guestsCount}</span>
                      ) : (
                        <span className="text-stone-300">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-stone-600 text-sm">
                      {rsvp.guestNames && rsvp.guestNames.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {rsvp.guestNames.map((name, i) => (
                            <span key={i} className="inline-block bg-stone-50 border border-stone-200 px-2 py-0.5 rounded text-xs">
                              {name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-stone-400 italic text-xs">Няма</span>
                      )}
                    </td>
                    <td className="px-6 py-4 min-w-[200px] max-w-md">
                      {rsvp.message ? (
                        <p className="text-stone-600 text-sm whitespace-pre-wrap break-words">
                          {rsvp.message}
                        </p>
                      ) : (
                        <span className="text-stone-300 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-stone-400 text-xs font-medium text-right">
                      {rsvp.createdAt?.seconds ? new Date(rsvp.createdAt.seconds * 1000).toLocaleDateString('bg-BG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Сега'}
                    </td>
                  </tr>
                ))}
                {filteredRsvps.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-stone-50 rounded-full">
                          <Calendar size={24} className="text-stone-300" />
                        </div>
                        <p className="text-stone-500 font-medium">Няма намерени отговори</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-stone-100">
            {filteredRsvps.map((rsvp) => (
              <div key={rsvp.id} className="p-5 space-y-3 hover:bg-stone-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-stone-800 text-lg">{rsvp.guestName}</h3>
                    <p className="text-xs text-stone-400 mt-1">
                      {rsvp.createdAt?.seconds ? new Date(rsvp.createdAt.seconds * 1000).toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Току-що'}
                    </p>
                  </div>
                  {rsvp.attending === 'yes' ? (
                    <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-bold bg-green-100 text-green-700">
                      Ще присъства
                    </span>
                  ) : (
                    <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-700">
                      Няма
                    </span>
                  )}
                </div>

                {rsvp.attending === 'yes' && (
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-stone-500">Брой гости:</span>
                      <span className="font-bold text-stone-800">{rsvp.guestsCount}</span>
                    </div>
                    {rsvp.guestNames && rsvp.guestNames.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-stone-200/50">
                        <span className="text-stone-400 text-xs block mb-1">Придружаващи:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {rsvp.guestNames.map((name, i) => (
                            <span key={i} className="text-xs font-medium bg-white px-2 py-1 rounded border border-stone-200/50 text-stone-600">
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {rsvp.message && (
                  <div className="flex gap-2 items-start text-stone-600 text-sm italic bg-blue-50/50 p-3 rounded-xl">
                    <MessageSquare size={14} className="mt-1 shrink-0 text-blue-400" />
                    <p>{rsvp.message}</p>
                  </div>
                )}
              </div>
            ))}

            {filteredRsvps.length === 0 && !loading && (
              <div className="py-12 text-center text-stone-400 text-sm">
                Няма намерени отговори
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {user && (
        <>
          <ChangePasswordModal
            isOpen={showPasswordModal}
            isForced={forcePasswordChange}
            onClose={() => {
              setShowPasswordModal(false);
              setForcePasswordChange(false);
            }}
            currentUser={user}
          />
          <GuestListModal
            isOpen={showGuestList}
            onClose={() => setShowGuestList(false)}
            rsvps={rsvps}
          />
        </>
      )}
    </div>
  );
}
