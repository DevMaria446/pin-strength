import { PinRule } from "../types";

// Common keypad patterns on a phone/ATM keypad:
// 1 2 3
// 4 5 6
// 7 8 9
//   0

const KEYPAD_PATTERNS = [
  // Vertical columns
  "147", "1470", "258", "2580", "369", "3690",
  // Reverse vertical
  "741", "0741", "852", "0852", "963", "0963",
  // Diagonals
  "159", "1590", "357", "3570", "951", "0951", "753", "0753",
  // Corners
  "1379", "7931", "3197", "9713",
  // Middle cross
  "2580", "0852",
  // Common visual patterns
  "1234", "4567", "7890", "0987", "7654", "4321",
  // L-shapes and other patterns
  "1478", "1236", "3698", "7412", "9874", "3216",
];

export const keypadRule: PinRule = {
  name: "keypad-pattern",
  penalty: 35,
  reason: "Common keypad pattern detected",
  check(pin: string): boolean {
    // Check if PIN matches any known keypad pattern
    if (KEYPAD_PATTERNS.includes(pin)) {
      return true;
    }

    // Check if PIN contains a keypad pattern as substring (for longer PINs)
    if (pin.length > 4) {
      for (const pattern of KEYPAD_PATTERNS) {
        if (pattern.length >= 4 && pin.includes(pattern)) {
          return true;
        }
      }
    }

    return false;
  },
};