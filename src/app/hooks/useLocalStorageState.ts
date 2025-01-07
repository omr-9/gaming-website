'use client'

import React, { useEffect, useState } from 'react'

export const useLocalStorageState = <T>(key: string, initialValue: T):[T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState<T>( function ()  {
        const storedValue = global?.window?.localStorage?.getItem(key)

        return storedValue ? JSON.parse(storedValue) : initialValue
    })

    useEffect(() => {
        global.window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}