

export const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
export const phonePattern = /^[0-9\-+\s()]{7,}$/;

export function validateField(field, value) {
  switch (field) {
    case 'name':
      if (!value?.trim()) return 'Name is required.';
      if (value.trim().length < 2) return 'Name must be at least 2 characters.';
      return '';
    case 'lastName':
      if (!value?.trim()) return 'Last name is required.';
      if (value.trim().length < 2) return 'Last name must be at least 2 characters.';
      return '';
    case 'email':
      if (!value?.trim()) return 'Email is required.';
      if (!emailPattern.test(value)) return 'Invalid email address.';
      return '';
    case 'phone':
      if (!value?.trim()) return 'Phone is required.';
      if (!phonePattern.test(value)) return 'Invalid phone number.';
      return '';
    case 'date':
      if (!value) return 'Date is required.';
      try {
        const today = new Date();
        const picked = new Date(value + 'T00:00:00');
        if (picked < new Date(today.toISOString().split('T')[0] + 'T00:00:00')) {
          return 'Date cannot be in the past.';
        }
  } catch {
        return 'Invalid date.';
      }
      return '';
    case 'guests':
      if (!value) return 'Guests is required.';
      if (Number(value) < 1 || Number(value) > 10) return 'Guests must be between 1 and 10.';
      return '';
    case 'time':
      if (!value) return 'Time is required.';
      return '';
    case 'specialOccasion':
      if (!value) return 'Special occasion is required.';
      return '';
    case 'seatPreference':
      if (!value) return 'Seat preference is required.';
      return '';
    default:
      return '';
  }
}

export function validateAll(form) {
  const fields = [
    'name',
    'lastName',
    'email',
    'phone',
    'date',
    'guests',
    'time',
    'specialOccasion',
    'seatPreference'
  ];
  const errors = {};
  for (const f of fields) {
    const err = validateField(f, form[f]);
    if (err) errors[f] = err;
  }
  return errors;
}
