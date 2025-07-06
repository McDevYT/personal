import { createContext, useContext, useState, type ReactNode } from 'react';
import React from 'react';
import { RandomIP4 } from './utils/RandomGenerator';

export interface DataContextInterface {
    ip: string;
}

const DataContext = createContext<DataContextInterface | undefined>(undefined);

const DataProvider = ({
    children,
}: {
    children: ReactNode;
}): React.ReactElement => {
    const [ip] = useState(RandomIP4());
    return (
        <DataContext.Provider
            value={{
                ip,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

const useDataContext = (): DataContextInterface => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};

export { DataContext, DataProvider, useDataContext };
