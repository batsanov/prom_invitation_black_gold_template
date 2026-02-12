export interface RSVPFormData {
  guestName: string;
  attending: 'yes' | 'no';
  guestsCount: number;
  guestNames: string[];
  message: string;
}
