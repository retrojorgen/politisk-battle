'use client';

import { motion } from 'framer-motion';

import { useState } from 'react';
import rightImage from '../images/right.png';
import leftImage from '../images/left.png';
import SMSBattleLogoImage from '../images/SMSBattle.png';

type Message = {
  role: string;
  name: string;
  date: Date;
  content: string;
};

export default function Home() {
  const [leftMessages, setLeftMessages] = useState([
    {
      role: 'computer',
      name: 'Marie Sneve Martinussen',
      date: new Date(),
      content:
        'Hei! Jeg er Marie Sneve Martinussen leder i Rødt. Send meg en melding hvis lurer på noe om Rødt eller politikk generelt.',
    } as Message,
  ] as Message[]);
  const [rightMessages, setRightMessages] = useState([
    {
      role: 'computer',
      name: 'Sylvi Listhaug',
      date: new Date(),
      content:
        'Hei! Jeg er Sylvi Listhaug leder i Fremskrittspartiet. Send meg en melding hvis lurer på noe om FrP eller politikk generelt.',
    } as Message,
  ] as Message[]);
  const [message, setMessage] = useState('');

  const handleLeftMessage = async () => {
    const response = await fetch('/api/left', {
      method: 'POST',
      body: JSON.stringify({ content: message }),
    });
    const data = await response.json();
    setLeftMessages((prev) => [
      ...prev,
      {
        role: 'computer',
        name: 'Rødt Marie Sneve Martinussen',
        date: new Date(),
        content: data.choices[0].message.content,
      } as Message,
    ]);
  };
  const handleRightMessage = async () => {
    const response = await fetch('/api/right', {
      method: 'POST',
      body: JSON.stringify({ content: message }),
    });
    const data = await response.json();
    setRightMessages((prev) => [
      ...prev,
      {
        role: 'computer',
        name: 'Sylvi Listhaug',
        date: new Date(),
        content: data.choices[0].message.content,
      } as Message,
    ]);
  };

  const handleMessages = async () => {
    setLeftMessages([
      ...leftMessages,
      {
        role: 'user',
        name: 'Deg',
        date: new Date(),
        content: message,
      },
    ]);
    setRightMessages([
      ...rightMessages,
      {
        role: 'user',
        name: 'Deg',
        date: new Date(),
        content: message,
      },
    ]);
    handleLeftMessage();
    handleRightMessage();
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)] absolute top-0 left-0 w-full h-full bg-slate-800 flex flex-col">
      <div className="h-[calc(100%-5rem)] w-full flex">
        <motion.div
          className="absolute w-full flex justify-center z-10 items-center"
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div>
            <img
              src={SMSBattleLogoImage.src}
              alt="SMSBattle"
              className="h-60"
            />
            <div className="w-full text-center text-slate-100 font-bold bg-slate-900 rounded-lg p-2">
              Send samme melding til to polikere!
            </div>
          </div>
        </motion.div>
        <div className="relative flex bg-gradient-to-r from-red-900 to-red-600 h-full w-1/2 overflow-hidden shadow-inner shadow-black align-bottom justify-end">
          <div>
            <motion.img
              src={leftImage.src}
              alt="left"
              className="h-full mix-blend-luminosity opacity-30 max-h-full absolute left-0 top-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.2 }}
            />
          </div>
          <div className="relative w-4/6 flex align-bottom items-end p-8 flex-col gap-4 justify-end overflow-auto">
            {leftMessages.reverse().map((message, index) => (
              <div
                className={`container flex flex-col w-full ${
                  message.role === 'computer'
                    ? 'items-end'
                    : 'items-start'
                }`}
                key={index}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`${
                    message.role === 'computer'
                      ? 'bg-slate-200 text-slate-800'
                      : 'text-white'
                  } ${
                    message.role === 'user'
                      ? 'bg-red-900 text-slate-100'
                      : 'text-white'
                  }
                  ${
                    message.role === 'computer'
                      ? 'flex-start'
                      : 'flex-end'
                  }
                    p-4 w-80 rounded-lg`}
                >
                  <div>{message.content}</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`pt-2 text-xs text-slate-100 `}
                >
                  {message.name}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex bg-gradient-to-r from-blue-900 to-blue-600 h-full w-1/2 shadow-inner shadow-black align-bottom items-end">
          <motion.img
            src={rightImage.src}
            alt="left"
            className="h-full mix-blend-luminosity opacity-30 max-h-full absolute left-0 top-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
          />
          <div className="relative w-4/6 flex align-bottom items-start p-8 flex-col gap-4 justify-start overflow-auto">
            {rightMessages.reverse().map((message, index) => (
              <div
                className={`container flex flex-col w-full ${
                  message.role === 'computer'
                    ? 'items-start'
                    : 'items-end'
                }`}
                key={index}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`${
                    message.role === 'computer'
                      ? 'bg-slate-200 text-slate-800'
                      : 'text-white'
                  } ${
                    message.role === 'user'
                      ? 'bg-blue-900 text-slate-100'
                      : 'text-white'
                  }
                  ${
                    message.role === 'computer'
                      ? 'flex-start'
                      : 'flex-end'
                  }
                    p-4 w-80 rounded-lg`}
                >
                  <div>{message.content}</div>
                </motion.div>
                <motion.div
                  className={`pt-2 text-xs text-slate-100 `}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {message.name}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-slate-900 h-20 border-top border-slate-800 flex gap-4 p-4 items-center justify-between">
        <div className="text-slate-200 whitespace-nowrap">
          Skriv melding:
        </div>
        <form
          className="w-full flex gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleMessages();
          }}
        >
          <input
            className="border border-slate-800 rounded-md px-4 py-2 w-full bg-slate-900 text-slate-200 focus:outline-none focus:ring focus:border-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-slate-800 text-white px-4 py-2 rounded-md"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
