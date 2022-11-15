import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";
const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //creating a state waiting while user is choosing options in the form
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  //index in the array of questions
  const [index, setIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  const handleChange = (e) => {
    console.log("value has been changed");
    //name matches the input'sname
    const name = e.target.name;
    const value = e.target.value;
    //ex : name difficulty value hard
    console.log("name", name, "value", value);
    // /i spreas the rest of values and dynamically add new changes
    setQuiz({ ...quiz, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    const { amount, category, difficulty } = quiz;

    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
  };
  //in value passing all of uor needed to pass down and share state value

  //   And then once I click on a button, I check whether the answer that is set in the button is equal to
  // the correct answer.
  // If it is, then in the state I set correct plus one.
  // If not, I don't do anything regardless whether the answer is correct or not.
  const checkAnswer = (value) => {
    if (value) {
      setCorrectAnswer((prevState) => prevState + 1);
    }
    nextQuestion();
  };
  const nextQuestion = () => {
    //oldPage is the old index of the question in the array
    setIndex((oldPage) => {
      const nextPage = oldPage + 1;
      if (nextPage > questions.length - 1) {
        //open modal
        openModal();
        return 0;
      }
      return nextPage;
    });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setWaiting(true);
    setCorrectAnswer(0);
    setIsModalOpen(false);
  };
  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    try {
      const response = await axios(url);
      console.log(response, "R");
      if (response) {
        const data = response.data.results;
        if (data.length > 0) {
          console.log("success");
          setQuestions(data);
          setWaiting(false);
          setError(false);
        } else {
          console.log("sth went bananas...");
          setWaiting(true);
          setError(true);
        }
      } else {
        console.log("sth went wrong");
        setWaiting(true);
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      console.log("ERRor", error);
      setLoading(false);
      setError(true);
    }
  };

  // useEffect(() => {
  //   fetchQuestions(tempUrl);
  // }, []);

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        error,
        questions,
        index,
        correctAnswer,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleSubmit,
        handleChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
