import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Copy, Users, Check } from 'lucide-react';
import { type RSVPRecord } from '../utils/firebaseService';

interface GuestListModalProps {
    isOpen: boolean;
    onClose: () => void;
    rsvps: RSVPRecord[];
}

interface FlatGuest {
    name: string;
    isMain: boolean;
    mainGuestName?: string;
    status: 'attending' | 'declined';
}

export default function GuestListModal({ isOpen, onClose, rsvps }: GuestListModalProps) {
    const [copied, setCopied] = useState(false);

    // Flatten the guest list (focusing only on attending guests usually, but user asked for "full list")
    // Usually "Guest List" implies people coming. Let's filter for attending only for the main list, 
    // but maybe keep structure flexible. The prompt said "get a full list of the гости" (guests). 
    // Usually "guests" means attending. I will default to attending.

    const attendingGuests = useMemo(() => {
        const list: FlatGuest[] = [];

        rsvps.forEach(rsvp => {
            if (rsvp.attending === 'yes') {
                // Add main guest
                list.push({
                    name: rsvp.guestName,
                    isMain: true,
                    status: 'attending'
                });

                // Add additional guests
                if (rsvp.guestNames && rsvp.guestNames.length > 0) {
                    rsvp.guestNames.forEach(name => {
                        if (name.trim()) {
                            list.push({
                                name: name,
                                isMain: false,
                                mainGuestName: rsvp.guestName,
                                status: 'attending'
                            });
                        }
                    });
                }
            }
        });

        // Sort alphabetically by name
        return list.sort((a, b) => a.name.localeCompare(b.name));
    }, [rsvps]);

    const handleCopy = () => {
        const text = attendingGuests.map(g => g.name).join('\n');
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    };

    const handleDownloadCSV = () => {
        // CSV Header
        let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // Add BOM for Excel UTF-8 support
        csvContent += "Име,Тип,Основен Гост\n";

        attendingGuests.forEach(g => {
            const type = g.isMain ? "Основен" : "Придружител";
            const main = g.mainGuestName || "-";
            // Escape quotes if needed
            const name = g.name.includes(',') ? `"${g.name}"` : g.name;
            const mainEscaped = main.includes(',') ? `"${main}"` : main;

            csvContent += `${name},${type},${mainEscaped}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "spisak_gosti.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[85vh] overflow-hidden border border-stone-100"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-stone-50 to-white px-6 py-5 border-b border-stone-100 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
                            <Users size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-serif text-stone-800">Списък с Гости</h2>
                            <p className="text-xs text-stone-500 font-medium">{attendingGuests.length} присъстващи</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-stone-400 hover:text-stone-600 hover:bg-stone-100 p-2 rounded-full transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* List Content */}
                <div className="flex-1 overflow-y-auto p-2">
                    {attendingGuests.length > 0 ? (
                        <div className="space-y-1">
                            {attendingGuests.map((guest, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 hover:bg-stone-50 rounded-xl transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full shrink-0 ${guest.isMain ? 'bg-stone-800' : 'bg-stone-300'}`} />
                                        <div>
                                            <p className="font-medium text-stone-800">{guest.name}</p>
                                            {!guest.isMain && (
                                                <p className="text-xs text-stone-400">Гост на {guest.mainGuestName}</p>
                                            )}
                                        </div>
                                    </div>
                                    {guest.isMain && (
                                        <span className="text-[10px] uppercase font-bold text-stone-300 tracking-wider bg-stone-100 px-2 py-1 rounded border border-stone-200/50">
                                            Основен
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-48 text-stone-400">
                            <Users size={32} className="mb-2 opacity-20" />
                            <p>Няма потвърдени гости</p>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-5 border-t border-stone-100 bg-stone-50/50 flex gap-3 shrink-0">
                    <button
                        onClick={handleCopy}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl font-medium transition-all active:scale-[0.98] shadow-sm ${copied
                            ? 'bg-green-50 border-green-200 text-green-700'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                            }`}
                    >
                        {copied ? (
                            <>
                                <Check size={18} className="text-green-600" />
                                <span>Копирано! Можеш да го поставиш навсякъде с клик + Paste</span>
                            </>
                        ) : (
                            <>
                                <Copy size={18} />
                                <span>Копирай списъка</span>
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleDownloadCSV}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-800 text-white rounded-xl font-medium hover:bg-stone-700 shadow-lg shadow-stone-200 transition-all active:scale-[0.98]"
                    >
                        <Download size={18} />
                        Експорт Excel
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
