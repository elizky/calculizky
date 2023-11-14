'use client';
import { useState } from 'react';
import Calculator from '../components/Calculator';
import Result from '../components/Result';
import {
  CalculationResults,
  calculateResults,
  emptyPerson,
  validateInput,
  validateTotalPeople,
} from '../lib/utils';

const Home: React.FC = () => {
  const [people, setPeople] = useState(emptyPerson);
  const [totalPeople, setTotalPeople] = useState<number>(1);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [results, setResults] = useState<CalculationResults>({
    totalExpenses: 0,
    averageExpense: 0,
    debts: [],
  });

  const handleCalculate = () => {
    if (validateInput(people) && validateTotalPeople(totalPeople)) {
      const calculationResults = calculateResults(totalPeople, people);
      setResults(calculationResults);
      setShowResult(true);
    } else {
      setResults({
        totalExpenses: 0,
        averageExpense: 0,
        debts: [],
      });
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setShowResult(false);
    setResults({
      totalExpenses: 0,
      averageExpense: 0,
      debts: [],
    });
    setTotalPeople(1);
    setPeople([{ who: '', howMuch: '' }]);
  };

  return (
    <div className='container m-auto p-4 '>
      <div className='flex flex-col gap-4 my-4 text-center'>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          Calculizky
        </h1>
      </div>
      <div className='md:w-2/3 m-auto'>
        {!showResult ? (
          <Calculator
            people={people}
            setPeople={setPeople}
            totalPeople={totalPeople}
            setTotalPeople={setTotalPeople}
            calculate={handleCalculate}
          />
        ) : (
          <Result {...results} handleReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default Home;
