import React, { useEffect } from 'react';

const SecurityLayer: React.FC = () => {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
            return false;
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
                (e.ctrlKey && e.key === 'u') ||
                (e.ctrlKey && e.key === 'U')
            ) {
                e.preventDefault();
                return false;
            }

            // Prevent Print (Ctrl+P)
            if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
                e.preventDefault();
                return false;
            }

            // Prevent Save (Ctrl+S)
            if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
                e.preventDefault();
                return false;
            }
        };

        const handleSelectStart = (e: Event) => {
            e.preventDefault();
            return false;
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('dragstart', handleDragStart);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('selectstart', handleSelectStart as any);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('dragstart', handleDragStart);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('selectstart', handleSelectStart as any);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none">
            {/* Repeater Watermark Pattern */}
            <div className="absolute inset-0 flex flex-wrap content-center justify-center opacity-[0.03] pointer-events-none rotate-[-45deg] scale-150">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="m-8 text-4xl font-black text-black whitespace-nowrap">
                        DEMO
                    </div>
                ))}
            </div>

            {/* Floating Warning (Optional, subtly visible) */}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm opacity-50">
                Protected Demo Version
            </div>
        </div>
    );
};

export default SecurityLayer;
