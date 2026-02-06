"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface DashboardContextProps {
  articles: any | null;
  projects: any | null;
  data: any;
  isAllowed: boolean;
  setData: (value: any) => void;
  setIsAllowed: (value: any) => void;
  role: string;
  setRole: (value: any) => void;
  token: any | null;
  setToken: (value: any) => void;
  valueDecoded: any | null;
  setValueDecoded: (value: any) => void;
  email: string;
  setEmails: (value: any) => void;
  articleFound: any | null;
  setArticleFound: (value: any) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined
);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [articles, setArticleData] = useState<any | null>(null);
  const [projects, setProjectData] = useState<any | null>(null);
  const [data, setData] = useState<any>(null);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [token, setToken] = useState<any | null>(null);
  const [valueDecoded, setValueDecoded] = useState<any | null>(null);
  const [email, setEmails] = useState<any | null>(null);
  const [articleFound, setArticleFound] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProjects = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/content/project`
        );
        // console.log(responseProjects);
        setProjectData(responseProjects.data.data);

        const responseArticles = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/content/article`
        );
        setArticleData(responseArticles.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [projects]);

  return (
    <DashboardContext.Provider
      value={{
        articles,
        projects,
        data,
        setData,
        isAllowed,
        setIsAllowed,
        role,
        setRole,
        token,
        setToken,
        valueDecoded,
        setValueDecoded,
        email,
        setEmails,
        articleFound,
        setArticleFound,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboard doit être utilisé à l'intérieur de DashboardProvider"
    );
  }
  return context;
};
