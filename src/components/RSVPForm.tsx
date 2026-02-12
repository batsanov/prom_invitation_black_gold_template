import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';
import { saveRSVPToFirebase } from '../utils/firebaseService';
import type { RSVPFormData } from '../types';
import { promConfig } from '../config/promConfig';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';



const RSVPForm = () => {
  const [formData, setFormData] = useState<RSVPFormData>({
    guestName: '',
    attending: 'yes',
    guestsCount: 1,
    guestNames: [],
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      console.log('Submitting RSVP form...', formData);
      const result = await saveRSVPToFirebase(formData);
      
      if (result.success) {
        console.log('RSVP submitted successfully!');
        setStatus('success');
        setFormData({
          guestName: '',
          attending: 'yes',
          guestsCount: 1,
          guestNames: [],
          message: '',
        });
      } else {
        console.error('RSVP submission failed:', result.error);
        setStatus('error');
        setErrorMessage(result.error || 'Възникна грешка при изпращане на RSVP.');
      }
    } catch (error) {
      console.error('Unexpected error during RSVP submission:', error);
      setStatus('error');
      setErrorMessage('Неочаквана грешка. Моля, опитайте отново.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'guestsCount') {
      const count = parseInt(value) || 1;
      const additionalGuests = Math.max(0, count - 1);
      setFormData((prev) => ({
        ...prev,
        guestsCount: count,
        guestNames: Array(additionalGuests).fill('').map((_, i) => prev.guestNames[i] || ''),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleGuestNameChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      guestNames: prev.guestNames.map((name, i) => (i === index ? value : name)),
    }));
  };

  return (
    <section id="rsvp" className="py-20 bg-gradient-to-b from-[#161616] via-[#0e0e0e] to-[#121212] relative overflow-hidden">
      {/* Enhanced decorative elements with gradients */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-gold/20 to-charcoal/40 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gold/15 to-charcoal/35 rounded-full translate-x-1/2 translate-y-1/2 opacity-30 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/3" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-gold/80 tracking-[0.3em] uppercase text-sm drop-shadow-md">
            {promConfig.rsvp.sectionTitle}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-4 drop-shadow-lg">
            {promConfig.rsvp.mainTitle}
          </h2>
          <div className="w-24 h-px bg-gold/40 mx-auto mt-6 shadow-sm" />
          <p className="font-body text-white/70 mt-6 max-w-lg mx-auto">
            {promConfig.rsvp.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-[#1f1f1f] to-[#151515] rounded-2xl shadow-2xl p-12 text-center border border-gold/15"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-green-600" size={40} />
              </div>
              <h3 className="font-display text-2xl text-white mb-4">
                {promConfig.rsvp.form.successTitle}
              </h3>
              <p className="font-body text-white/70">
                {promConfig.rsvp.form.successMessage}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-gold/80 hover:text-gold font-body underline"
              >
                {promConfig.rsvp.form.successButton}
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-[#1f1f1f] to-[#151515] rounded-2xl shadow-2xl p-8 md:p-12 border border-gold/15"
            >
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                  <div className="flex-1">
                    <p className="font-body text-red-700 text-sm font-semibold mb-1">
                      {promConfig.rsvp.form.errorMessage}
                    </p>
                    {errorMessage && (
                      <p className="font-body text-red-600 text-xs">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="guestName"
                    className="block font-body text-white/80 mb-2"
                  >
                    {promConfig.rsvp.form.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="guestName"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 font-body bg-[#0a0a0a] text-white placeholder:text-white/40"
                    placeholder={promConfig.rsvp.form.namePlaceholder}
                  />
                </div>

                {/* Attending */}
                <div>
                  <label
                    htmlFor="attending"
                    className="block font-body text-white/80 mb-2"
                  >
                    {promConfig.rsvp.form.attendingLabel}
                  </label>
                  <select
                    id="attending"
                    name="attending"
                    value={formData.attending}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 font-body bg-[#0a0a0a] text-white"
                  >
                    <option value="yes">{promConfig.rsvp.form.attendingOptionYes}</option>
                    <option value="no">{promConfig.rsvp.form.attendingOptionNo}</option>
                  </select>
                </div>

                {/* Guests Count */}
                <div>
                  <label
                    htmlFor="guestsCount"
                    className="block font-body text-white/80 mb-2"
                  >
                    {promConfig.rsvp.form.guestsCountLabel}
                  </label>
                  <select
                    id="guestsCount"
                    name="guestsCount"
                    value={formData.guestsCount}
                    onChange={handleChange}
                    disabled={formData.attending === 'no'}
                    className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 font-body bg-[#0a0a0a] text-white disabled:opacity-50"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guest Names */}
                {formData.attending === 'yes' && formData.guestsCount > 1 && (
                  <div className="md:col-span-2">
                    <label className="block font-body text-white/80 mb-2">
                      {promConfig.rsvp.form.additionalGuestsLabel}
                    </label>
                    <div className="space-y-3">
                      {formData.guestNames.map((name, index) => (
                        <input
                          key={index}
                          type="text"
                          value={name}
                          onChange={(e) => handleGuestNameChange(index, e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 font-body bg-[#0a0a0a] text-white placeholder:text-white/40"
                          placeholder={`${promConfig.rsvp.form.additionalGuestPlaceholderPrefix} ${index + 2} - име`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Message */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="block font-body text-white/80 mb-2"
                  >
                    {promConfig.rsvp.form.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 font-body bg-[#0a0a0a] text-white placeholder:text-white/40 resize-none"
                    placeholder={promConfig.rsvp.form.messagePlaceholder}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full bg-gradient-to-r from-gold/90 to-gold/80 hover:from-gold hover:to-gold/90 text-white font-body py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {promConfig.rsvp.form.submitButtonLoading}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {promConfig.rsvp.form.submitButton}
                  </>
                )}
              </motion.button>

              <p className="text-center font-body text-white/60 text-sm mt-4">
                {promConfig.rsvp.form.deadlineText}
              </p>
              {/* Design Credit */}
              <div className="mt-8 -mb-4 text-right">
                <a
                  href="https://vibeinvite.bg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-body text-xs text-chocolate/50 hover:text-caramel transition-colors duration-300"
                >
                  Designed by <span className="font-semibold">vibeinvite.bg</span>
                </a>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPForm;
