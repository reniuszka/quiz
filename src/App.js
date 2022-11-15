import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correctAnswer,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  console.log(questions[0]);
  const { correct_answer, incorrect_answers, question } = questions[index];
  //with this approach the correct answet is always at the end
  // const answers = [...incorrect_answers, correct_answer];
  let answers = [...incorrect_answers];
  //4 bo mamy 4 lacznie odpowiedzi, ma byc od 0 do 3 indeks
  const temporaryIndexForCorrectAnswner = Math.floor(Math.random() * 4);
  console.log(temporaryIndexForCorrectAnswner, "temp index");
  //add when 3
  if (temporaryIndexForCorrectAnswner === 3) {
    answers.push(correct_answer);
  } else {
    //duplicates ath the end the answer that the coorect answet would take place
    // answers.push(answers[temporaryIndexForCorrectAnswner]);
    // answers[temporaryIndexForCorrectAnswner] = correct_answer;
    // inserts at index temporaryIndexForCorrectAnswner (for ex 1), nothing deletes, correct_answer addds, the rest it moves
    answers.splice(temporaryIndexForCorrectAnswner, 0, correct_answer);
  }
  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correctAnswer}/{index}
        </p>
        <article className="container">
          {/* //it is not a string it is a html so need to add it as html  */}
          {/* <h2>{question}</h2> */}
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button onClick={nextQuestion} className="next-question">
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
