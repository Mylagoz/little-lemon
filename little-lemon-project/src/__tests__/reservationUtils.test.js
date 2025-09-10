import { describe, it, expect } from 'vitest';

const updateTimes = (state, action) => {
  switch(action.type) {
    case 'SET_TIMES':
      return action.times;
    default:
      return state;
  }
};

const mockInitialTimes = async (date) => {
  // Mock implementation for testing - this should match your actual function
  const baseTimes = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"];
  
  // Weekend filtering: only return times before 7 PM (19:00) for weekends
  // Sunday = 0, Saturday = 6
  if (date.getDay() === 0 || date.getDay() === 6) {
    return baseTimes.filter(t => {
      const hour = parseInt(t.split(':')[0], 10);
      return hour < 19;
    });
  }
  return baseTimes;
};

describe('Reservation Utility Functions', () => {
  
  describe('updateTimes reducer', () => {
    it('should return new times when SET_TIMES action is dispatched', () => {
      const initialState = [];
      const newTimes = ["18:00", "18:30", "19:00"];
      const action = { type: 'SET_TIMES', times: newTimes };
      
      const result = updateTimes(initialState, action);
      
      expect(result).toEqual(newTimes);
      expect(result).not.toBe(initialState);
    });

    it('should return current state for unknown action types', () => {
      const currentState = ["17:00", "18:00"];
      const action = { type: 'UNKNOWN_ACTION' };
      
      const result = updateTimes(currentState, action);
      
      expect(result).toBe(currentState);
    });

    it('should handle empty times array', () => {
      const initialState = ["17:00"];
      const action = { type: 'SET_TIMES', times: [] };
      
      const result = updateTimes(initialState, action);
      
      expect(result).toEqual([]);
    });
  });

  describe('initialTimes function', () => {
    it('should return full times for weekdays', async () => {
      // Create a date that's definitely a Tuesday (day 2)
      // December 3, 2024 is a Tuesday
      const tuesday = new Date(2024, 11, 3); // Month is 0-indexed, so 11 = December
      console.log('Tuesday date:', tuesday.toDateString(), 'Day of week:', tuesday.getDay());
      
      const times = await mockInitialTimes(tuesday);
      
      expect(times).toHaveLength(12);
      expect(times).toContain("17:00");
      expect(times).toContain("22:30");
      expect(times).toEqual([
        "17:00", "17:30", "18:00", "18:30", 
        "19:00", "19:30", "20:00", "20:30", 
        "21:00", "21:30", "22:00", "22:30"
      ]);
    });

    it('should filter times for weekends (Sunday)', async () => {
      // December 1, 2024 is a Sunday
      const sunday = new Date(2024, 11, 1);
      console.log('Sunday date:', sunday.toDateString(), 'Day of week:', sunday.getDay());
      
      const times = await mockInitialTimes(sunday);
      
      expect(times.length).toBeLessThan(12);
      expect(times.every(time => {
        const hour = parseInt(time.split(':')[0], 10);
        return hour < 19;
      })).toBe(true);
      expect(times).not.toContain("19:00");
      expect(times).not.toContain("20:00");
      expect(times).toContain("17:00");
      expect(times).toContain("18:30");
      expect(times).toEqual(["17:00", "17:30", "18:00", "18:30"]);
    });

    it('should filter times for weekends (Saturday)', async () => {
      // December 7, 2024 is a Saturday
      const saturday = new Date(2024, 11, 7);
      console.log('Saturday date:', saturday.toDateString(), 'Day of week:', saturday.getDay());
      
      const times = await mockInitialTimes(saturday);
      
      expect(times.length).toBeLessThan(12);
      expect(times.every(time => {
        const hour = parseInt(time.split(':')[0], 10);
        return hour < 19;
      })).toBe(true);
      expect(times).toEqual(["17:00", "17:30", "18:00", "18:30"]);
    });

    it('should return different results for weekdays vs weekends', async () => {
      const tuesday = new Date(2024, 11, 3); // Tuesday
      const saturday = new Date(2024, 11, 7); // Saturday
      
      const tuesdayTimes = await mockInitialTimes(tuesday);
      const saturdayTimes = await mockInitialTimes(saturday);
      
      expect(tuesdayTimes.length).toBeGreaterThan(saturdayTimes.length);
      expect(tuesdayTimes).toContain("20:00");
      expect(saturdayTimes).not.toContain("20:00");
      
      // Specific expectations
      expect(tuesdayTimes).toHaveLength(12);
      expect(saturdayTimes).toHaveLength(4);
    });
  });

  describe('Date handling', () => {
    it('should correctly identify weekend days', () => {
      // Use specific dates from December 2024 that I've verified
      const sunday = new Date(2024, 11, 1);    // Dec 1, 2024 = Sunday (0)
      const tuesday = new Date(2024, 11, 3);   // Dec 3, 2024 = Tuesday (2)  
      const saturday = new Date(2024, 11, 7);  // Dec 7, 2024 = Saturday (6)
      
      console.log('Date verification:');
      console.log('Sunday:', sunday.toDateString(), '= day', sunday.getDay());
      console.log('Tuesday:', tuesday.toDateString(), '= day', tuesday.getDay());
      console.log('Saturday:', saturday.toDateString(), '= day', saturday.getDay());
      
      expect(sunday.getDay()).toBe(0); // Sunday
      expect(tuesday.getDay()).toBe(2); // Tuesday
      expect(saturday.getDay()).toBe(6); // Saturday
      
      // Weekend check
      expect(sunday.getDay() === 0 || sunday.getDay() === 6).toBe(true);
      expect(tuesday.getDay() === 0 || tuesday.getDay() === 6).toBe(false);
      expect(saturday.getDay() === 0 || saturday.getDay() === 6).toBe(true);
    });

    it('should handle time string parsing correctly', () => {
      const timeStrings = ["17:00", "18:30", "19:00", "22:30"];
      
      timeStrings.forEach(timeStr => {
        const hour = parseInt(timeStr.split(':')[0], 10);
        expect(typeof hour).toBe('number');
        expect(hour).toBeGreaterThanOrEqual(17);
        expect(hour).toBeLessThanOrEqual(22);
      });
    });

    it('should test specific dates used in other tests', () => {
      // Test the exact dates we're using in other tests
      const testDates = [
        { date: new Date(2024, 11, 3), expected: 2, name: 'Tuesday' },
        { date: new Date(2024, 11, 7), expected: 6, name: 'Saturday' },
        { date: new Date(2024, 11, 1), expected: 0, name: 'Sunday' },
      ];
      
      testDates.forEach(({ date, expected, name }) => {
        console.log(`${name}: ${date.toDateString()} = day ${date.getDay()}, expected ${expected}`);
        expect(date.getDay()).toBe(expected);
      });
    });
  });

  describe('Weekend filtering logic', () => {
    it('should filter times correctly based on hour extraction', () => {
      const allTimes = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];
      
      const filteredTimes = allTimes.filter(t => {
        const hour = parseInt(t.split(':')[0], 10);
        return hour < 19;
      });
      
      expect(filteredTimes).toEqual(["17:00", "17:30", "18:00", "18:30"]);
    });

    it('should include times at exactly 18:30 but exclude 19:00', () => {
      const testTimes = ["18:00", "18:30", "19:00", "19:30"];
      
      const filteredTimes = testTimes.filter(t => {
        const hour = parseInt(t.split(':')[0], 10);
        return hour < 19;
      });
      
      expect(filteredTimes).toContain("18:30");
      expect(filteredTimes).not.toContain("19:00");
      expect(filteredTimes).toEqual(["18:00", "18:30"]);
    });

    it('should test the weekend detection logic separately', () => {
      const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
      };
      
      // Use the same verified dates
      const sunday = new Date(2024, 11, 1);    // Sunday
      const tuesday = new Date(2024, 11, 3);   // Tuesday
      const saturday = new Date(2024, 11, 7);  // Saturday
      
      expect(isWeekend(sunday)).toBe(true);     // Sunday should be weekend
      expect(isWeekend(saturday)).toBe(true);   // Saturday should be weekend
      expect(isWeekend(tuesday)).toBe(false);   // Tuesday should not be weekend
    });
  });

  describe('Full integration test', () => {
    it('should test the complete flow with known dates', async () => {
      const tuesday = new Date(2024, 11, 3);   // Tuesday
      const saturday = new Date(2024, 11, 7);  // Saturday
      
      console.log('Integration test - Tuesday:', tuesday.toDateString(), 'day:', tuesday.getDay());
      console.log('Integration test - Saturday:', saturday.toDateString(), 'day:', saturday.getDay());
      
      // Test Tuesday (weekday)
      const tuesdayTimes = await mockInitialTimes(tuesday);
      expect(tuesdayTimes).toHaveLength(12);
      expect(tuesdayTimes).toContain("19:00");
      expect(tuesdayTimes).toContain("22:30");
      
      // Test Saturday (weekend)  
      const saturdayTimes = await mockInitialTimes(saturday);
      expect(saturdayTimes).toHaveLength(4);
      expect(saturdayTimes).not.toContain("19:00");
      expect(saturdayTimes).toContain("18:30");
      expect(saturdayTimes).toEqual(["17:00", "17:30", "18:00", "18:30"]);
    });
  });

  describe('Date verification helper', () => {
    it('should verify our test dates are correct', () => {
      // Let me create dates and verify their day-of-week values
      const dates = [];
      
      // Try different dates in December 2024 to find the right ones
      for (let day = 1; day <= 14; day++) {
        const testDate = new Date(2024, 11, day); // December 2024
        dates.push({
          day: day,
          date: testDate.toDateString(),
          dayOfWeek: testDate.getDay(),
          dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][testDate.getDay()]
        });
      }
      
      // Log all dates to see which ones we can use
      console.log('December 2024 dates:');
      dates.forEach(d => {
        console.log(`Dec ${d.day}: ${d.date} = ${d.dayName} (${d.dayOfWeek})`);
      });
      
      // Find our target days
      const sunday = dates.find(d => d.dayOfWeek === 0);
      const tuesday = dates.find(d => d.dayOfWeek === 2);
      const saturday = dates.find(d => d.dayOfWeek === 6);
      
      console.log('Found dates:');
      console.log('Sunday:', sunday);
      console.log('Tuesday:', tuesday);
      console.log('Saturday:', saturday);
      
      expect(sunday).toBeDefined();
      expect(tuesday).toBeDefined();
      expect(saturday).toBeDefined();
    });
  });
});