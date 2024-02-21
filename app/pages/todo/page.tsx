'use client';

import React, { useState, useEffect } from 'react';
import { ToDoItem } from '@/app/types';

const Todo = () => {
    const [value, setValue] = useState('');
    const [list, setList] = useState<Array<ToDoItem>>([]);

    useEffect(() => {
        if (!localStorage.list) return;
        const storedNames = JSON.parse(localStorage.list);
        setList(storedNames);
    }, []);

    const updateLocalStorage = (tmp: ToDoItem[]) => {
        console.log(tmp);
        localStorage.setItem('list', JSON.stringify(tmp));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(typeof e);
        e.preventDefault;
        setValue(e.target.value);
    };

    const addToDo = () => {
        if (value == '') return;
        const new_value: ToDoItem = {
            id: Math.floor(Math.random() * 10000),
            value: value,
            done: false,
        };

        const tmp = [...list];

        tmp.unshift(new_value);

        setList(tmp);
        setValue('');
        updateLocalStorage(tmp);
    };

    const removeItem = (id: number) => {
        const tmp = [...list];
        const to_del = tmp.findIndex(e => e.id === id);

        if (to_del > -1) {
            tmp.splice(to_del, 1);
        }

        setList(tmp);
        updateLocalStorage(tmp);
    };

    const moveItem = (id: number) => {
        if (list.length < 1) {
            return;
        }

        const tmp = [...list];
        const to_move = tmp.findIndex(e => e.id === id);

        if (to_move === 0) {
            return;
        }

        [tmp[to_move], tmp[to_move - 1]] = [tmp[to_move - 1], tmp[to_move]];
        setList(tmp);
        updateLocalStorage(tmp);
    };

    const updateShow = (id: number) => {
        const tmp = [...list];
        const to_edit = tmp.findIndex(e => e.id === id);

        tmp[to_edit].done = !tmp[to_edit].done;
        setList(tmp);
    };

    return (
        <div className="mx-auto rounded-xl rounded-b-xl bg-slate-200 bg-opacity-40 p-5 shadow-xl lg:w-1/2 lg:overflow-auto">
            <div>
                <input
                    className="m-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    type="text"
                    onChange={handleChange}
                    value={value}></input>
                <button
                    className="m-2 rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700"
                    onClick={() => addToDo()}>
                    Lisää
                </button>
            </div>
            <ul>
                {list ? (
                    list.map(e => (
                        <li key={e.id} className={`my-2 select-none`}>
                            <button
                                className="py-1/2 mr-2 rounded bg-red-500 px-2 text-lg font-bold text-white hover:bg-red-700"
                                onClick={() => removeItem(e.id)}>
                                X
                            </button>
                            <button
                                className="py-1/2 rounded bg-blue-500 px-2 text-lg font-bold text-white hover:bg-blue-700"
                                onClick={() => moveItem(e.id)}>
                                ^
                            </button>
                            &nbsp;
                            <span
                                className={`text-xl text-gray-900 ${
                                    e.done ? 'line-through decoration-4' : ''
                                }`}
                                onClick={() => updateShow(e.id)}>
                                {e.value}
                            </span>
                        </li>
                    ))
                ) : (
                    <></>
                )}
            </ul>
        </div>
    );
};

export default function Page() {
    return (
        <Todo />
    );
}