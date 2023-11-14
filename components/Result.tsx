import { Debts } from '@/lib/utils';
import { Button } from './ui/button';

interface ResultProps {
  totalExpenses: number;
  averageExpense: number;
  debts: Debts[];
  handleReset: () => void;
}

const Result: React.FC<ResultProps> = ({ totalExpenses, averageExpense, debts, handleReset }) => {
  console.log('debts', debts);

  return (
    <div className='flex flex-col gap-6'>
      <div className='space-y-2 text-center'>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          Total Expenses: <span className='font-bold'>${totalExpenses}</span>
        </h3>
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
          Each person has to pay: <span className='font-bold'>${Math.round(averageExpense)}</span>
        </h4>
      </div>
      <div className='flex flex-col items-center gap-2'>
        {debts.map((person, index) => (
          <div key={index} className='mb-2 flex gap-1'>
            <p className='font-bold'>{person.who}</p>
            {person.amount >= 0 ? (
              <p>
                owes{' '}
                <span className='text-green-500 font-semibold'>${Math.round(person.amount)}</span>
              </p>
            ) : (
              <p>
                is owed{' '}
                <span className='text-red-500 font-semibold'>${Math.round(-person.amount)}</span>
              </p>
            )}
          </div>
        ))}
      </div>
      <Button
        variant='outline'
        onClick={handleReset}
        className='w-full md:w-2/3 m-auto text-green-500 border-green-500 hover:bg-green-500 '
      >
        Recalculate
      </Button>
    </div>
  );
};

export default Result;
