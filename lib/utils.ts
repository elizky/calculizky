import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Person {
  who: string;
  howMuch: string;
}

export const emptyPerson = [
  {
    who: '',
    howMuch: '',
  }
];
export interface Debts {
  who: string;
  amount: number;
}

export interface CalculationResults {
  totalExpenses: number;
  averageExpense: number;
  debts: Debts[];
}

export const calculateResults = (totalPeople: number, people: Person[]): CalculationResults => {
  const totalExpenses = people.reduce((total, person) => total + parseFloat(person.howMuch), 0);
  const averageExpense = totalExpenses / totalPeople;

  const debts: Debts[] = [];

  people.forEach((person) => {
    const amountPaid = parseFloat(person.howMuch);
    const amountOwes = amountPaid - averageExpense;
    if (amountOwes !== 0) {
      debts.push({ who: person.who, amount: amountOwes });
    }
  });

  return {
    totalExpenses,
    averageExpense,
    debts,
  };
};

export const validateInput = (people: Person[]): boolean => {
  return people.every((person) => person.who.trim() !== '' && person.howMuch.trim() !== '');
};

export const validateTotalPeople = (totalPeople: number): boolean => {
  return totalPeople >= 2;
};
