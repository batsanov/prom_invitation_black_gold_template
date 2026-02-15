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
    <section id="rsvp" className="py-24 bg-ivory relative overflow-hidden">
      {/* Soft decorative gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-fuchsia/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-blush/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-dusty-rose tracking-[0.3em] uppercase text-sm font-bold">
            {promConfig.rsvp.sectionTitle}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-deep-rose mt-4 mb-6">
            {promConfig.rsvp.mainTitle}
          </h2>
          <div className="w-24 h-px bg-fuchsia/30 mx-auto mb-8" />
          <p className="font-body text-muted-rose mt-6 max-w-lg mx-auto leading-relaxed">
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-dusty-rose/20"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Check className="text-green-600" size={32} />
              </div>
              <h3 className="font-display text-3xl text-deep-rose mb-4">
                {promConfig.rsvp.form.successTitle}
              </h3>
              <p className="font-body text-muted-rose mb-8">
                {promConfig.rsvp.form.successMessage}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-fuchsia hover:text-deep-rose font-body underline underline-offset-4 decoration-1 transition-colors"
              >
                {promConfig.rsvp.form.successButton}
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-dusty-rose/10 p-8 md:p-12 border border-white/50 relative overflow-hidden"
            >
              {/* Subtle texture or highlight on the form card */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia via-dusty-rose to-blush" />

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                  <div className="flex-1">
                    <p className="font-body text-red-800 text-sm font-semibold mb-1">
                      {promConfig.rsvp.form.errorMessage}
                    </p>
                    {errorMessage && (
                      <p className="font-body text-red-600/80 text-xs">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="guestName"
                    className="block font-body text-deep-rose text-sm font-semibold mb-2 uppercase tracking-wide"
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
                    className="w-full px-4 py-3 bg-ivory/50 border border-dusty-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia/20 focus:border-fuchsia/40 font-body text-deep-rose placeholder:text-muted-rose/40 transition-all duration-300"
                    placeholder={promConfig.rsvp.form.namePlaceholder}
                  />
                </div>

                {/* Attending */}
                <div>
                  <label
                    htmlFor="attending"
                    className="block font-body text-deep-rose text-sm font-semibold mb-2 uppercase tracking-wide"
                  >
                    {promConfig.rsvp.form.attendingLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="attending"
                      name="attending"
                      value={formData.attending}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-ivory/50 border border-dusty-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia/20 focus:border-fuchsia/40 font-body text-deep-rose appearance-none cursor-pointer transition-all duration-300"
                    >
                      <option value="yes">{promConfig.rsvp.form.attendingOptionYes}</option>
                      <option value="no">{promConfig.rsvp.form.attendingOptionNo}</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                       <svg className="w-4 h-4 text-dusty-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* Guests Count */}
                <div>
                  <label
                    htmlFor="guestsCount"
                    className="block font-body text-deep-rose text-sm font-semibold mb-2 uppercase tracking-wide"
                  >
                    {promConfig.rsvp.form.guestsCountLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="guestsCount"
                      name="guestsCount"
                      value={formData.guestsCount}
                      onChange={handleChange}
                      disabled={formData.attending === 'no'}
                      className="w-full px-4 py-3 bg-ivory/50 border border-dusty-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia/20 focus:border-fuchsia/40 font-body text-deep-rose disabled:opacity-50 appearance-none cursor-pointer transition-all duration-300"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                       <svg className="w-4 h-4 text-dusty-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* Guest Names */}
                {formData.attending === 'yes' && formData.guestsCount > 1 && (
                  <div className="md:col-span-2">
                    <label className="block font-body text-deep-rose text-sm font-semibold mb-2 uppercase tracking-wide">
                      {promConfig.rsvp.form.additionalGuestsLabel}
                    </label>
                    <div className="space-y-3">
                      {formData.guestNames.map((name, index) => (
                        <motion.input
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          key={index}
                          type="text"
                          value={name}
                          onChange={(e) => handleGuestNameChange(index, e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-ivory/50 border border-dusty-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia/20 focus:border-fuchsia/40 font-body text-deep-rose placeholder:text-muted-rose/40 transition-all duration-300"
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
                    className="block font-body text-deep-rose text-sm font-semibold mb-2 uppercase tracking-wide"
                  >
                    {promConfig.rsvp.form.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-ivory/50 border border-dusty-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia/20 focus:border-fuchsia/40 font-body text-deep-rose placeholder:text-muted-rose/40 resize-none transition-all duration-300"
                    placeholder={promConfig.rsvp.form.messagePlaceholder}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="mt-10 w-full bg-gradient-to-r from-fuchsia to-dusty-rose hover:from-deep-rose hover:to-muted-rose text-white font-body font-semibold tracking-wide py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-fuchsia/20"
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

              <p className="text-center font-body text-muted-rose text-sm mt-6">
                {promConfig.rsvp.form.deadlineText}
              </p>

              {/* Design Credit */}
              <div className="mt-8 -mb-4 text-right">
                <a
                  href="https://vibeinvite.bg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-body text-xs text-dusty-rose/60 hover:text-fuchsia transition-colors duration-300"
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
