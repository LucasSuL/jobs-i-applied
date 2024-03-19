import React, { useState } from "react";
import { CATEGORIES } from "../../data";
import supabase from "../database.js";

export default function Fact({ fact,  setFactList }) {
  // const handleVote = async (type) => {
  //   setIsVoting(true);
  //   const { data: updatedFact, error } = await supabase
  //     .from("facts")
  //     .update({ [type]: fact[type] + 1 })
  //     .eq("id", fact.id)
  //     .select();

  //   if (!error) {
  //     setFactList((factList) =>
  //       factList.map((f) => {
  //         return f.id === fact.id ? updatedFact[0] : f;
  //       })
  //     );
  //   }
  //   setIsVoting(false);
  // };

  const categoryObject = CATEGORIES.find(
    (category) => category.name === fact.category
  );
  const categoryColor = categoryObject ? categoryObject.color : "#000"; // Default color if category not found

  function getNextStatus(currentStatus) {
    const stages = [
      "pending init res",
      "pending interview",
      "pending 2nd interview",
      "on role",
      "rejected",
    ];

    const currentIndex = stages.indexOf(currentStatus);

    if (currentIndex === -1 || currentIndex === stages.length - 1) {
      return stages[0];
    } else {
      return stages[currentIndex + 1];
    }
  }

  const handleClick = async () => {
    const nextStatus = getNextStatus(fact.category);
    // console.log(status, nextStatus);

    const { data, error } = await supabase
      .from("jobList")
      .update({ category: nextStatus })
      .eq("id", fact.id)
      .select();

    if (!error) {
      setFactList((factList) =>
        factList.map((f) => {
          return f.id === fact.id ? data[0] : f;
        })
      );
    }
  };

  return (
    <div className="bg-secondary p-1 m-1 mb-3 d-flex align-items-center justify-content-between rounded row">
      <div className="p-2 col-9  pe-3">
        {fact.fact}, {fact.created_at.slice(0, 10)}
        <a href={fact.source} className="source ms-1" target="_blank">
          (Link)
        </a>
      </div>
      <div
        className=" tag d-flex justify-content-center align-items-center p-1 rounded fw-bold col-3 "
        style={{ backgroundColor: categoryColor }}
        onClick={handleClick}
        type="button"
      >
        {fact.category}
      </div>
      {/* <div className="vote-buttons d-flex justify-content-end p-0 align-items-center col-3 ">
        <button
          className="btn btn-light d-flex align-items-center m-1 p-1"
          onClick={() => handleVote("votesInteresting")}
          disabled={isVoting}
        >
          👍
          <strong className="count">{fact.votesInteresting}</strong>
        </button>
        <button
          className="btn btn-light d-flex align-items-center m-1 p-1"
          onClick={() => handleVote("votesMindblowing")}
          disabled={isVoting}
        >
          🤯
          <strong className="count">{fact.votesMindblowing}</strong>
        </button>
        <button
          className="btn btn-light d-flex align-items-center m-1 p-1"
          onClick={() => handleVote("votesFalse")}
          disabled={isVoting}
        >
          ⛔️
          <strong className="count">{fact.votesFalse}</strong>
        </button>
      </div> */}
    </div>
  );
}
