import React, { useEffect, useState } from 'react';

export default function Todos() {
  const [todos, setTodos] = useState([]); // initializer variable

  const [isLoading, setIsLoading] = useState(true);

  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/todos`)
      .then((response) => response.json())
      .then((data) => {
        // set loading palsu pke setTimeout
        setTimeout(() => {
          setIsLoading(false);
          setTodos(data);
        }, 2000);
      });
  }, []);
  // dependency biasanya digunakan untuk memerhatikan variable apa yang kirakira di dalam si page tadi itu bakal ada perubahan, sehingga harus di render ulang si pagenya
  console.log(todos, isLoading);

  if (isLoading)
    return (
      <>
        <h1>Lagi loading nich...</h1>
      </>
    );

  return (
    <>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
      <div>
        <h3>todos</h3>
        {todos.map((e, index) => {
          return (
            <div key={index}>
              <h4>{e.id}</h4>
              <h4>{e.name}</h4>
              <h4>{e.title}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
}
