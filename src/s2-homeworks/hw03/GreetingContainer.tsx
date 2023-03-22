import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'
import {log} from "util";

type GreetingContainerPropsType = {
    users: UserType[], // +++ need to fix any
    addUserCallback: (name: string) => void // +++ need to fix any
}

export const pureAddUser = (name: string, setError: (error:string) => void, setName: (name:string) => void, addUserCallback: (name: string) => void) => {
    // ++ если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
    if(name.trim() === '') {
        setError('Ошибка! Введите имя!')
        setName('')
    } else {
        addUserCallback(name)
        setName('')
        setError('')
    }
}

export const pureOnBlur = (name: string, setError: (error:string) => void) => { // ++ если имя пустое - показать ошибку
    if (name.trim() === '') {
        setError('Ошибка! Введите имя!')
    } else {
        setError('');
    }
}

export const pureOnEnter = (e: KeyboardEvent, addUser: () => void) => { // ++ если нажата кнопка Enter - добавить
    if(e.key === 'Enter') {
        addUser()
    }
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // +- need to fix any
    const [error, setError] = useState<string>('') // +-  need to fix any

    const setNameCallback = (e: React.ChangeEvent<HTMLInputElement>) => { // need to fix any
        setName(e.currentTarget.value) // ++ need to fix

        error && setError('') //Changed to string from figma

    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length // ++ need to fix
    const lastUserName = users.length === 0 ? '' : users[users.length - 1].name; // ++ need to fix


    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer