import React, { useEffect, useState, useCallback } from "react";
import "./app.css";
import { Memory } from "./Memory";

export const Buttons =() => {
    //Setting all the variables
    const numbers = [".","0","1","2","3","","5","6","7","8","9"];
    const operators = ["+","-","*","/","%"];
    const [firstNumber, setFirstNumber] = useState("");
    const [secondNumber, setSecondNumber] = useState("");
    const [operation, setOperation] = useState("");
    const [result, setResult] = useState("");
    const [answer, setAnswer] = useState("false");
    const [value, setValue] = useState("");
    const [memory, setMemory] = useState([]);
    const [showData, setShowData] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [showMemory, setShowMemory] = useState(false);


    const handleUserInput = useCallback((event)=>{
        const {key, keyCode} = event;
        //creating clear key
        if(key === 'c' || key === 'C'){
            clear();
        }
        //creating backspace key
        else if(keyCode === 8){
            backSpace();
        }
        // Creating equal key
        else if (keyCode === 13){
            solveIt();
        }
        //All numbers
        else if(numbers.includes(key)){
            chooseNumber(key.toString());
        }
        //All operations
        else if (operators.includes(key)){
            chooseOperation(key.toString())
        }

    });

    useEffect(() => {
        if (answer) {
            let val =value + " = " + result;
            console.log("Result", result);
            setMemory([...memory, { id: memory.length + 1, Memory: val }]);
            setShowData(true);
            setFirstNumber(result.toString());
            setSecondNumber("");
            setOperation("");
            setResult("");
            setAnswer(false);
        }
        console.log("first", firstNumber)
        setValue(firstNumber + " "+operation + " " + secondNumber);
    },
    [firstNumber, operation, secondNumber, result]);


    useEffect(() => {
        window.addEventListener("keydown", handleUserInput);
  
        return () => {
          window.removeEventListener("keydown", handleUserInput);
        };
      }, [handleUserInput]);


      function chooseOperation(val) {
        setResult("");
        setOperation(val);
      }

      

      function chooseNumber(val) {
        if (operation === "") {
          setResult("");
          console.log(val)
          setFirstNumber(firstNumber + val);
        } else {
          setSecondNumber(secondNumber + val);
        }
      }


      function numFunc(e) {
        e.preventDefault();
        const val = e.target.innerText;
        chooseNumber(val);
      }


      function handleFunc(e) {
        e.preventDefault();
        const val = e.target.innerText;
        chooseOperation(val);
      }


      function solveIt() {
          //contingency incase someone tries to put two decimal points
        if (firstNumber.includes("..") || secondNumber.includes("..")) {
          setValue("Error. Press C for Reset or CE for Backspace");
          return;
        }
        if (firstNumber !== "" && secondNumber !== "") {
            setAnswer(true);
            //The part that makes the calculator a calculator
          switch (operation) {
            case "+":
              setResult(Number(firstNumber) + Number(secondNumber));
              break;
            case "-":
              setResult(Number(firstNumber) - Number(secondNumber));
              
              break;
            case "*":
              setResult(Number(firstNumber) * Number(secondNumber));
              
              break;
            case "/":
              setResult(Number(firstNumber) / Number(secondNumber));
              
              break;
            case "%":
              setResult(Number(firstNumber) % Number(secondNumber));
              break;
          }
        } else {
          setValue("Two values needed for calculation.");
        }
      }
    
      function backSpace() {
        let result1 = result.toString();
        if (operation === "") {
            //Reduces the length of string by 1
          setFirstNumber(firstNumber.substr(0, firstNumber.length - 1));
          setResult(result1.substr(0, result1.length - 1));
        } else {
          if (secondNumber !== "") {
            setSecondNumber(secondNumber.substr(0, secondNumber.length - 1));
          } else {
            setOperation(operation.substr(0, operation.length - 1));
          }
        }
      }

      function clear() {
          //Clears everthing.
        setFirstNumber("");
        setSecondNumber("");
        setOperation("");
        setValue("");
        setResult("");
      }

      function toggleHistory() {
        //Here we are creating functionality within the history button
        setShowButton(!showButton);
        setShowMemory(!showMemory);
      }


      return (
        <div className="Container">
          <div className="calculator">
            <form name="form">
              <div className="history" onClick={toggleHistory}>
                {showMemory ? "Keypad" : "History"}
              </div>
              <div className="display">
                <div className="input">{answer ? result : value ? value : 0}</div>
              </div>
              {showButton ? (
                <div className="buttons">
                  <div className="row">
                    <div onClick={backSpace} className="upperKey">
                      CE
                    </div>
                    <div onClick={clear} className="upperKey">
                      C
                    </div>
                    <div onClick={handleFunc} className="upperKey">
                      %
                    </div>
                    <div onClick={handleFunc} className="operator">
                      /
                    </div>
                  </div>
                  <div className="row">
                    <div onClick={numFunc} className="keypad">
                      7
                    </div>
                    <div onClick={numFunc} className="keypad">
                      8
                    </div>
                    <div onClick={numFunc} className="keypad">
                      9
                    </div>
                    <div onClick={handleFunc} className="operator">
                      *
                    </div>
                  </div>
    
                  <div className="row">
                    <div onClick={numFunc} className="keypad">
                      4
                    </div>
                    <div onClick={numFunc} className="keypad">
                      5
                    </div>
                    <div onClick={numFunc} className="keypad">
                      6
                    </div>
                    <div onClick={handleFunc} className="operator">
                      -
                    </div>
                  </div>
    
                  <div className="row">
                    <div onClick={numFunc} className="keypad">
                      1
                    </div>
                    <div onClick={numFunc} className="keypad">
                      2
                    </div>
                    <div onClick={numFunc} className="keypad">
                      3
                    </div>
                    <div onClick={handleFunc} className="operator">
                      +
                    </div>
                  </div>
    
                  <div className="row">
                    <div onClick={numFunc} className="zero">
                      0
                    </div>
                    <div onClick={numFunc} className="keypad">
                      .
                    </div>
                    <div onClick={solveIt} className="operator">
                      =
                    </div>
                  </div>
                </div>
              ) : (
                <Memory memory={memory} showData={showData} />
              )}
            </form>
          </div>
          
        </div>
      );

};
