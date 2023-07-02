import { useState } from 'react'

import { Button, Alert } from 'antd';
import { useEffect } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    // sempre que "contador" receber um novo valor
    console.log('Novo contador: ' + contador);
    return () => {
      // sempre "contador" deixar de ter o valor
      console.log('Contador antigo: ' + contador);
    }
  }, [contador]);

  useEffect(() => {
    // mountagem
    const interval = setInterval(() => {
      console.log('Incrementou')
      setContador(cont => cont + 1);
    }, 5000);

    return () => {
      // desmontagem
      clearInterval(interval);
    }
  }, []);

  return (
    <div>
      Contador: {contador}
    </div>
  );
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Button onClick={() => setCount((count) => count + 1)}>
        Incrementar: {count}
      </Button>

      <Contador />

      <Alert message="Success Text" type="success" />
      <Alert message="Info Text" type="info" />
      <Alert message="Warning Text" type="warning" />
      <Alert message="Error Text" type="error" />
    </div>
  )
}

export default App
