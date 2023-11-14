import { MinusIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import React, { useState, ChangeEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Person, validateInput, validateTotalPeople } from '@/lib/utils';

interface CalculatorProps {
  totalPeople: number;
  people: Person[];
  setTotalPeople: React.Dispatch<React.SetStateAction<number>>;
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  calculate: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({
  totalPeople,
  people,
  setTotalPeople,
  setPeople,
  calculate,
}) => {
  const [errors, setErrors] = useState<string[]>([]);

  const addPerson = () => {
    const newErrors: string[] = [];
    if (people.every((person) => person.who.trim() !== '' && person.howMuch.trim() !== '')) {
      setPeople([...people, { who: '', howMuch: '' }]);
      setTotalPeople(people.length + 1);
    } else {
      newErrors.push('Please complete both "Who" and "How Much" before adding a person.');
      setErrors(newErrors);
    }
  };

  const deletePerson = (index: number) => {
    if (people.length > 1) {
      const newPeople = [...people];
      newPeople.splice(index, 1);
      setPeople(newPeople);
      setTotalPeople(newPeople.length);
    }
  };

  const handleInputChange = (index: number, key: keyof Person, value: string) => {
    const newPeople = [...people];
    newPeople[index][key] = value;
    setPeople(newPeople);
    setErrors([]);
  };

  const handleCalculate = () => {
    if (validateInput(people) && validateTotalPeople(totalPeople)) {
      calculate();
      setErrors([]);
    } else {
      setErrors([
        'Please make sure there is at least one person who has paid and a total of at least two people.',
      ]);
    }
  };

  return (
    <div className='flex flex-col justify-center gap-8'>
      <p className='leading-7 [&:not(:first-child)]:mt-6 text-center font-mono'>
        Add who paid and how many people there are in total to know how much each one has to pay.
      </p>
      {people.map((person, index) => (
        <div key={index} className='flex items-center justify-between'>
          <div className='flex flex-col gap-4 w-4/5'>
            <Input
              type='text'
              placeholder='Who'
              value={person.who}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, 'who', e.target.value)
              }
            />
            <Input
              type='number'
              placeholder='How Much'
              value={person.howMuch}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, 'howMuch', e.target.value)
              }
            />
          </div>

          <Button
            variant='destructive'
            disabled={people.length < 1}
            size='icon'
            onClick={() => deletePerson(index)}
            className={`ml-4 ${people.length <= 1 ? 'invisible' : ''} `}
          >
            <TrashIcon />
          </Button>
        </div>
      ))}
      {errors.map((error, i) => (
        <span key={i} className='text-red-500 text-xs px-1'>
          {error}
        </span>
      ))}
      <Button variant='secondary' className='w-full md:w-2/3 m-auto' onClick={addPerson}>
        <PlusIcon className='mr-2 h-4 w-4' /> Add Person
      </Button>

      <div className='flex items-center justify-center gap-12'>
        <p>Total People: </p>

        <div className='flex items-center gap-8 '>
          <Button
            variant='outline'
            size='icon'
            disabled={totalPeople <= 1 || totalPeople === people.length}
            onClick={() => setTotalPeople(totalPeople - 1)}
            className='text-red-700 hover:bg-red-700'
          >
            <MinusIcon />
          </Button>

          <p>{totalPeople}</p>
          <Button
            variant='outline'
            size='icon'
            onClick={() => setTotalPeople(totalPeople + 1)}
            className='text-green-500 hover:bg-green-500'
          >
            <PlusIcon />
          </Button>
        </div>
      </div>

      <Button
        variant='outline'
        onClick={handleCalculate}
        disabled={!validateInput(people) || !validateTotalPeople(totalPeople)}
        className='w-full md:w-2/3 m-auto text-green-500 border-green-500 hover:bg-green-500 '
      >
        Calculate
      </Button>
    </div>
  );
};

export default Calculator;
