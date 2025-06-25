import React, { useState } from 'react';
import { Plus, Check, Trash2, BarChart2, LineChart } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { format } from 'date-fns';
import ChartCard from './components/ChartCard';

Chart.register();

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false, date: new Date() }]);
      setInput('');
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const chartData = {
    labels: todos.map(todo => format(todo.date, 'PPP')),
    datasets: [{
      label: 'Tasks Completed',
      data: todos.map(todo => todo.completed ? 1 : 0),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-6'>🎯 Todo App</h1>
        <div className='flex gap-2 mb-6'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Add a new task...'
          />
          <button
            onClick={addTodo}
            className='p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
          >
            <Plus />
          </button>
        </div>
        <div className='space-y-3'>
          {todos.map(todo => (
            <div key={todo.id} className='flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow'>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className={`p-1 rounded-full ${todo.completed ? 'bg-green-500' : 'bg-gray-200'} hover:bg-green-500 transition-colors`}
                >
                  <Check className={`${todo.completed ? 'text-white' : 'text-transparent'}`} />
                </button>
                <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{todo.text}</span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className='p-1 text-red-500 hover:text-red-600 transition-colors'
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
        <div className='mt-8'>
          <ChartCard title='Tasks Completion Over Time' icon={<LineChart />}>
            <Line data={chartData} options={{ responsive: true }} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default App;