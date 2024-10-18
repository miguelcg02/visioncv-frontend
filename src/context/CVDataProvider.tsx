'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PersonalDetails {
  name: string;
  phone: string;
  address: string;
  email: string;
}

interface CVDataContextType {
  experience: string;
  setExperience: React.Dispatch<React.SetStateAction<string>>;
  skills: string;
  setSkills: React.Dispatch<React.SetStateAction<string>>;
  education: string;
  setEducation: React.Dispatch<React.SetStateAction<string>>;
  personalDetails: PersonalDetails;
  setPersonalDetails: React.Dispatch<React.SetStateAction<PersonalDetails>>;
}

const CVDataContext = createContext<CVDataContextType | undefined>(undefined);

export const useCVDataContext = (): CVDataContextType => {
  const context = useContext(CVDataContext);
  if (!context) {
    throw new Error('useCVDataContext must be used within a CVDataProvider');
  }
  return context;
};

export const CVDataProvider = ({ children }: { children: ReactNode }) => {
  const [experience, setExperience] = useState<string>('');
  const [skills, setSkills] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    name: '',
    phone: '',
    address: '',
    email: '',
  });

  return (
    <CVDataContext.Provider
      value={{
        experience,
        setExperience,
        skills,
        setSkills,
        education,
        setEducation,
        personalDetails,
        setPersonalDetails,
      }}
    >
      {children}
    </CVDataContext.Provider>
  );
};
